import User from "../models/User.js"

export const findAll = (req, res) => {
    User.getAll((err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).send({msg: "Exist some error"})
        }
        res.send(data)
    })
}

export const findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if(err) {
            if(err.type === 'not_found'){
                res.status(404).send({
                    message: `Not found user with id : ${req.params.id}`
                })
            } else {
                res.status(500).send({msg: "Exist some error"})
            }
        } else {
            res.send(data)
        }
    })
}

export const update = (req, res) => {
    const studentData = new Student(req.body)
    User.update(req.params.id, studentData, (err, data) => {
        if(err) {
            if(err.type === 'not_found'){
                res.status(404).send({
                    message: `Not found student with id : ${req.params.id}`
                })
            } else {
                res.status(500).send({msg: "Exist some error"})
            }
        } else {
            res.send(data)
        }
    })
}

export const destroy = (req, res) => {
    User.delete(req.params.id, (err, data) => {
        if(err) {
            if(err.type === 'not_found'){
                res.status(404).send({
                    message: `Not found student with id : ${req.params.id}`
                })
            } else {
                res.status(500).send({msg: "Exist some error"})
            }
        } else {
            res.send({msg: "Success delete student"})
        }
    })
}