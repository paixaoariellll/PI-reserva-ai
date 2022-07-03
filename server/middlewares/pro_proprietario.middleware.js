const db = require("../models");
const Proprietario = db.proprietario;
const jwt = require("jsonwebtoken");

// Login sem criptografia

exports.login = (req, res) => {
    const {pro_email, pro_senha} = req.body;
    Proprietario.findOne({
        where: {
            pro_email, pro_senha
        },
        attributes: ["pro_email", "pro_senha"]
    })
    .then((data) => {
        if (pro_email == data.pro_email && pro_senha == data.pro_senha) {
            const token = jwt.sign({pro_email, pro_senha}, "mysecrets", {
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
    var readtoken = req.headers["pro"];
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
    var readtoken = req.headers["pro"];
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
