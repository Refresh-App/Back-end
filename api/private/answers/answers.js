const router = require("express").Router();
const dbModel = require("./answersModel");
const answerScrubber = require("./answerScrubber");

router.get("/", (req, res) => {
    const id = req.user.user_id;
    return dbModel
        .findAllByUserId(id)
        .then(answers => {
            res.status(200).json({ message: `Success`, ...answers });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

//Expects {"startDate":"2019-11-20", "endDate":"2019-11-21"}
router.get("/datefilter", (req, res) => {
    
    const id = req.user.user_id;
    const { startDate, endDate } = req.query;
   
    return dbModel
        .findByDateRange(id, startDate, endDate)
        .then(answers => {
            res.status(200).json({ message: `Success`, ...answers });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    
    return dbModel
        .findByAnswerId(req.user.user_id, id)
        .then(answers => {
            res.status(200).json({ message: `Success`, ...answers });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});



router.post("/", answerScrubber, (req, res) => {
    const { body } = req;
    const {query} = req; //Used for Timezoning
    return dbModel
        .add(body,query)
        .then(answers => {
            res.status(201).json({ message: `Success`, ...answers });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e, ...body });
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { user_id } = req.user;
    const { body } = req;

    return dbModel
        .editById(user_id, id, body)
        .then(answers => {
            res.status(200).json({ message: `Success`, ...answers });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    return dbModel
        .remove(id)
        .then(answers => {
            res.status(201).json({ message: `Success`, ...answers });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

router.routes = [{
        route: "/answers",
        method: "GET",
        expects: { headers: "Authorization: Token" },
        returns: {}
    },
    {
        route: "/answers/:id",
        method: "GET",
        expects: { headers: "Authorization: Token" },
        returns: {}
    },
    {
        route: "/answers",
        method: "POST",
        expects: { answer: "answer", question_id: "2" },
        returns: {}
    },
    {
        route: "/answers/:id",
        method: "PUT",
        expects: {
            answer: "updated string here",
            user_id: 7
        },
        returns: {}
    },
    { route: "/answers/:id", method: "DELETE", expects: {}, returns: {} }
];
module.exports = router;