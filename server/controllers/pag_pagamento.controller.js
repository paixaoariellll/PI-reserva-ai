const db = require("../models");
const Pagamento = db.pagamento;

exports.create = (req, res) => {
    if(!req.body.pag_id){
        res.status(400).send({ message: "O conteúdo não pode ser vazio!" });
    }

    const pagamento = {
        pag_id: req.body.pag_id,
        pag_valor: req.body.pag_valor,
        pag_tipo_pagamento: req.body.pag_tipo_pagamento,
        pag_dt_pagamento: req.body.pag_dt_pagamento,
        res_id: req.body.res_id
    }

    Pagamento.create(pagamento)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: `Ocorreu um erro: ${err.message}` });
    });
}

exports.findAll = (req, res) => {
    Pagamento.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: `Ocorreu um erro: ${err.message}` });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Pagamento.findByPk(id)
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
