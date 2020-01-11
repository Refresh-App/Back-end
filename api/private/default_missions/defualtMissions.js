const router = require("express").Router();
const dbModel = require("./defaultMissionsModel");
const defaultMissionsScrubber = require("./defaultMissionsScrubber");

router.get("/", (req, res) => {
  return dbModel
    .findAll()
    .then(defaultMissions => {
      res.status(200).json({ message: `Success`, ...defaultMissions });
    })
    .catch(e => {
      res.status(200).json({ message: "Something has gone wrong", ...e });
    });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  return dbModel
    .findById(id)
    .then(defaultMissions => {
      res.status(200).json({ message: `Success`, ...defaultMissions });
    })
    .catch(e => {
      res.status(200).json({ message: "Something has gone wrong", ...e });
    });
});

router.post("/", defaultMissionsScrubber, (req, res) => {
  const { body } = req;
  return dbModel
    .add(body)
    .then(defaultMissions => {
      res.status(201).json({ message: `Success`, ...defaultMissions });
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
    .then(defaultMissions => {
      res.status(200).json({ message: `Success`, ...defaultMissions });
    })
    .catch(e => {
      res.status(200).json({ message: "Something has gone wrong", ...e });
    });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  return dbModel
    .remove(id)
    .then(defaultMissions => {
      res.status(201).json({ message: `Success`, ...defaultMissions });
    })
    .catch(e => {
      res.status(200).json({ message: "Something has gone wrong", ...e });
    });
});
module.exports = router;
