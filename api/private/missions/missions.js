const router = require('express').Router()
const dbModel = require('./missionsModel')
const missionScrubber = require('./missionScrubber')

router
    .get('/', (req, res) => {
        return dbModel.findAll()
            .then(missions => {
                res.status(200).json({ message: `SUCCESS`, ...missions })
            })
            .catch(e => { res.status(404).json({ message: 'SOMEMESSAGE', ...e }) })
    })

router
    .get('/:id', (req, res) => {
        const { id } = req.params
        return dbModel.findAllById(id)
            .then(missions => { res.status(200).json({ message: `SUCCESS`, ...missions }) })
            .catch(e => { res.status(404).json({ message: 'SOMEMESSAGE', ...e }) })
    })

router
    .post('/', missionScrubber, (req, res) => {
        const { body } = req
        return dbModel.add(body)
            .then(missions => { res.status(201).json({ message: `SUCCESS`, ...missions }) })
            .catch(e => { res.status(404).json({ message: 'SOMEMESSAGE', ...e }) })
    })
router
    .put('/:id', (req, res) => {
        const { id } = req.params
        const { body } = req

        return dbModel.editById(id)
            .then(missions => { res.status(200).json({ message: `SUCCESS`, ...missions }) })
            .catch(e => { res.status(404).json({ message: 'SOMEMESSAGE', ...e }) })
    })
router
    .delete('/:id', (req, res) => {
        const { id } = req.params

        return dbModel.remove(id)
            .then(missions => { res.status(201).json({ message: `SUCCESS`, ...missions }) })
            .catch(e => { res.status(404).json({ message: 'SOMEMESSAGE', ...e }) })
    })

router.routes = [{
        route: "/missions",
        method: "GET",
        expects: { headers: "Authorization: Token" }
    },
    {
        route: "/missions/:id",
        method: "GET",
        expects: { headers: "Authorization: Token" }
    },
    {
        route: "/missions",
        method: "POST",
        expects: {
            vertical: "string",
            description: "string",
            goal: "6",
            question: 11,
            point_value: 20,
            input_type: 1,
            icon: 797,
            color: "rgb(21, 117, 255)"
        }
    },
    {
        route: "/missions",
        method: "PUT",
        expects: {
            vertical: "string",
            description: "string",
            goal: "6",
            question: 11,
            point_value: 20,
            input_type: 1,
            icon: 797,
            color: "rgb(21, 117, 255)"
        }
    },
    { route: "/missions/:id", method: "DELETE", expects: {} }
];
module.exports = router;