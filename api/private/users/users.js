const router = require("express").Router();
const dbModel = require("./userModel");
const usersScrubber = require("./usersScrubber");

router.get("/", (req, res) => {
    return dbModel
        .findAll()
        .then(users => {
            users.forEach(user=>{
                delete user.password
                delete user.id})
            res.status(200).json({ message: `Success`, users: [...users] });
        })
        .catch(e => {
            res.status(404).json({ message: "Something has gone wrong", ...e });
        });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    return dbModel
        .findById(id)
        .then(users => {
            delete users.password
            res.status(200).json({ message: `Success`, ...users });
        })
        .catch(e => {
            res.status(404).json({ message: "Something has gone wrong", ...e });
        });
});

router.post("/", usersScrubber, (req, res) => {
    const { body } = req;
    return dbModel
        .add(body)
        .then(users => {
            res.status(201).json({ message: `Success`, ...users });
        })
        .catch(e => {
            res.status(404).json({ message: "Something has gone wrong", ...e });
        });
});
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { body } = req;

    return dbModel
        .editById(id,body)
        .then(users => {
            res.status(200).json({ message: `Success`, ...users });
        })
        .catch(e => {
            res.status(404).json({ message: "Something has gone wrong", ...e });
        });
});

router.delete("/", (req, res) => {
    const id = req.user.user_id;
    console.log(id, "here");
    return dbModel
        .remove(id)
        .then(p => {
            res.status(200).json({ message: `Success`, ...p });
        })
        .catch(e => {
            res.status(401).json({ message: "Something has gone wrong", ...e });
        });
});

router.routes = [
    { route: "/users", method: "GET", expects: {}, returns: {} },
    { route: "/users/:id", method: "GET", expects: {}, returns: {} },
    { route: "/users", method: "POST", expects: {}, returns: {} },
    { route: "/users/:id", method: "PUT", expects: {}, returns: {} },
    { route: "/users/", method: "DELETE", expects: {}, returns: {} }
];
module.exports = router;

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    return dbModel
        .remove(id)
        .then(users => {
            res.status(201).json({ message: `Success`, ...users });
        })
        .catch(e => {
            res.status(404).json({ message: "Something has gone wrong", ...e });
        });
});

router.routes = [
    { route: "/users", method: "GET", expects: { headers: "Authorization: Token" }, returns: {} },
    { route: "/users/:id", method: "GET", expects: { headers: "Authorization: Token" }, returns: {} },
    { route: "/users", method: "POST", expects: {}, returns: {} },
    { route: "/users/:id", method: "PUT", expects: {}, returns: {} },
    { route: "/users/:id", method: "DELETE", expects: {}, returns: {} }
];
module.exports = router;