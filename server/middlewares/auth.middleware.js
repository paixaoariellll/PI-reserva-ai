const jwt = require("jsonwebtoken");

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
