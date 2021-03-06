const router = require("express").Router();
const dbModel = require("./questionsGroupsModel");
const questionGroupsScrubber = require("./questionsGroupsScrubber");

router.get("/", (req, res) => {
    return dbModel
        .findAll()
        .then(questionGroup => {
            res.status(200).json({ message: `Success`, forms: [...questionGroup] });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    return dbModel
        .findById(id)
        .then(questionGroup => {
            res.status(200).json({ message: `Success`, ...questionGroup });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

router.post("/", questionGroupsScrubber, (req, res) => {
    const { body } = req;
    return dbModel
        .createQuestionGroup(body)
        .then(questionGroup => {
            res.status(201).json({ message: `Success`, ...questionGroup,posted_body:body });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { body } = req;

    return dbModel
        .editById(id, body)
        .then(questionGroup => {
            res.status(200).json({ message: `Success`, ...questionGroup });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    return dbModel
        .remove(id)
        .then(questionGroup => {
            res.status(201).json({ message: `Success`, ...questionGroup });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

router.routes = [{
        route: "/questiongroups",
        method: "GET",
        expects: { headers: "Authorization: Token" },
        returns: {}
    },
    {
        route: "/questiongroups/:id",
        method: "GET",
        expects: { headers: "Authorization: Token" },
        returns: {}
    },
    {
        route: "/questiongroups",
        method: "POST",
        expects: {
            group: "string",
            question_ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        returns: {}
    },
    {
        route: "/questiongroups",
        method: "PUT",
        expects: {
            group: "string",
            question_ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        returns: {}
    },
    { route: "/questiongroups/:id", method: "DELETE", expects: {}, returns: {} }
];

module.exports = router;