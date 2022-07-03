const db = require("../models");
const Cliente = db.cliente;

exports.create = (req, res) => {
    if(!req.body.cli_id){
        res.status(400).send({ message: "O conteúdo não pode ser vazio!" });
        return;
    }

    const cliente = {
        cli_id: req.body.cli_id,
        cli_nome: req.body.cli_nome,
        cli_dt_nasc: req.body.cli_dt_nasc,
        cli_cpf: req.body.cli_cpf,
        cli_email: req.body.cli_email,
        cli_senha: req.body.cli_senha,
        aceite_novidades: req.body.aceite_novidades
    }

    Cliente.create(cliente)
    .then(() => {
        res.status(200).send({ message: "Cliente cadastrado com sucesso!" });
    })
    .catch(err => {
        res.status(500).send({ message: `Ocorreu um erro: ${err.message}` });
    });
}

exports.findAll = (req, res) => {
    Cliente.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: `Ocorreu um erro: ${err.message}` });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id, {
        attributes: ["cli_id", "cli_nome"]
    })
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send(`Não foi possível encontrar um cliente com o ID ${id}`);;
        }
    })
    .catch(err => {
        res.status(500).send({ message: `Ocorreu um erro: ${err.message}` });
    });
}
