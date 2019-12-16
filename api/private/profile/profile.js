const router = require("express").Router();
const dbModel = require("./profileModle");

router.get("/", (req, res) => {
    const id = req.user.user_id;
    return dbModel
        .findByUserId(id)
        .then(profile => {
            res.status(200).json({ message: `SUCCESS`, profile: {...profile } });
        })
        .catch(e => {
            res.status(404).json({ message: "SOMEMESSAGE", ...e });
        });
});

// Not sure if we need a .post with profileScrubber?

router.put("/", (req, res) => {
    const { body } = req;
    return dbModel
        .editByUserId(req.user.user_id, body)
        .then(profile => {
            res.status(200).json({ message: `SUCCESS`, ...profile });
        })
        .catch(e => {
            res.status(404).json({ message: "SOMEMESSAGE", ...e });
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