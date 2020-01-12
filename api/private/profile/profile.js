const router = require("express").Router();
const dbModel = require("./profileModle");

router.get("/", (req, res) => {
    const id = req.user.user_id;
    return dbModel
        .findByUserId(id)
        .then(profile => {
            res.status(200).json({ message: `Success`, profile: {...profile } });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e });
        });
});

// Not sure if we need a .post with profileScrubber?

router.put("/", (req, res) => {
    const { body } = req;
    return dbModel
        .editByUserId(req.user.user_id, body)
        .then(profile => {
            res.status(200).json({ message: `Success`,user_profile:profile });
        })
        .catch(e => {
            res.status(200).json({ message: "Something has gone wrong", ...e,request:{...req.body} });
        });
});

router.routes = [{
        route: "/profile",
        method: "GET",
        expects: { headers: "Authorization: Token" },
        returns: {}
    },
    {
        route: "/profile",
        method: "PUT",
        expects: {
            display_name: "update",
            avatar: "update",
            fname: "update",
            lname: "update",
            bio: "update",
            cohort: "update",
            section_lead: "update",
            user_id: 7
        },
        returns: {}
    }
];

module.exports = router;