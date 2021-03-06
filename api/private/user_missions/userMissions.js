const router = require("express").Router();
const dbModel = require("./userMissionsModel");
const userMissionsScrubber = require("./userMissionsScrubber");

router.get("/", (req, res) => {
    const {query} = req
    const id = req.user.user_id;
    return dbModel
        .findAll(id,query)
        .then(userMissions => {
            res.status(200).json({ message: `Success`, ...userMissions});
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e ,...req.query });
        });
});
router.get("/:id", (req, res) => {
    const { id } = req.params;
    return dbModel
        .findById(id)
        .then(userMissions => {
            res.status(200).json({ message: `Success`, ...userMissions });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

router.post("/", userMissionsScrubber, (req, res) => {
    const { body } = req;
    return dbModel
        .add(body)
        .then(userMissions => {
            res.status(201).json({ message: `Success`, ...userMissions });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { body } = req;

    return dbModel
        .editById(id,body)
        .then(userMissions => {
            res.status(200).json({ message: `Success`, ...userMissions });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    return dbModel
        .remove(id)
        .then(userMissions => {
            res.status(201).json({ message: `Success`, ...userMissions });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

router.routes = [
    { route: "/usermissions", method: "GET", expects: { headers: "Authorization: Token" }, returns: {} },
    { route: "/usermissions/:id", method: "GET", expects: { headers: "Authorization: Token" }, returns: {} },
    { route: "/usermissions", method: "POST", expects: {}, returns: {} },
    { route: "/usermissions", method: "PUT", expects: {}, returns: {} },
    { route: "/usermissions/:id", method: "DELETE", expects: {}, returns: {} }
];
module.exports = router;