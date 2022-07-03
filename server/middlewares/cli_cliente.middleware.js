const db = require("../models");
const Cliente = db.cliente;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Login sem criptografia

exports.login = (req, res) => {
    const {cli_email, cli_senha} = req.body;
    Cliente.findOne({
        where: {
            cli_email, cli_senha
        },
        attributes: ["cli_email", "cli_senha"]
    })
    .then((data) => {
        if (cli_email == data.cli_email && cli_senha == data.cli_senha) {
            const token = jwt.sign({cli_email, cli_senha}, "mysecrets", {
                expiresIn: 60
            });
            return res.json({ auth: true, token: token });
        } else {
            res.status(500).json({ message: "Login inválido!" });
        }
        
    })
    .catch(() => {
        res.json("Ocorreu um erro");
    });
}

// Logout

exports.logout = (req, res) => {
    res.json({ auth: false, token: null });
}

// Validação de token

exports.validate = (req, res) => {
    var readtoken = req.headers["cli"];
    if (!readtoken) {
        res.json("Nenhum token recebido");
    }
    jwt.verify(readtoken, "mysecrets", (err, data) => {
        if (data) {
            res.json(data);
        } else if (err) {
            res.json("Ocorreu um erro");
        }
    });
}

// Autenticação

exports.jwtbasic = (req, res, next) => {
    var readtoken = req.headers["cli"];
    if (!readtoken) {
        return res.json({ auth: false });
    }
    jwt.verify(readtoken, "mysecrets", (err, decod) => {
        if (decod) {
            next();
            return;
        } else {
            res.json({ message: `Ocorreu um erro: ${err.message}` });
        }
    });
}

exports.testelogin = (req, res) => {
    const {cli_email, cli_senha} = req.body;
    Cliente.findOne({
        where: {
            cli_email, cli_senha
        },
        attributes: ["cli_email", "cli_senha"]
    })
    .then((data) => {
        if (cli_email == data.cli_email) {
            const validPassword = bcrypt.compare(cli_senha,data.cli_senha);
            if (validPassword){
                const token = jwt.sign({ cli_email, cli_senha }, "mysecrets", {
                    expiresIn: 60
                })
                // res.json({ auth: true, token: token, message: "Acesso válido" });
                return res.json({ auth: true, token: token });
            } else {
                res.status(400).json({ error: "Senha inválida" });
            }
        } else {
            res.json("O usuário não existe!");
        }
    })
    .catch(err => {
        res.json({ err: "Ocorreu um erro" });
    });
}
