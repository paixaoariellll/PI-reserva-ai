const db = require("../models");
const Reserva = db.reserva;

exports.create = (req, res) => {
    if(!req.body.aco_id){
        res.status(400).send({ message: "O conteúdo não pode ser vazio!" });
    }

    const reserva = {
        res_id: req.body.res_id,
        res_status: req.body.res_status,
        res_dt_checkin: req.body.res_dt_checkin,
        res_dt_checkout: req.body.res_dt_checkout,
        cli_id: req.body.cli_id,
        aco_id: req.body.aco_id
    }

    Reserva.create(reserva)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: `Ocorreu um erro: ${err.message}` });
    });
}

exports.findAll = (req, res) => {
    Reserva.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: `Ocorreu um erro: ${err.message}` });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Reserva.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send(`Não foi possível encontrar um cliente com o ID ${id}`);
        }
    })
    .catch(err => {
        res.status(500).send({ message: `Ocorreu um erro: ${err.message}` });
    });
}
