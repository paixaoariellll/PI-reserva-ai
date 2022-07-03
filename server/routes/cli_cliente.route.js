module.exports = app => {
    const clientes = require("../controllers/cli_cliente.controller");
    const router = require("express").Router();
    const mid_cli = require("../middlewares/cli_cliente.middleware");

    router.post("/add", clientes.create);
    router.get("/see", mid_cli.jwtbasic, clientes.findAll);
    router.get("/see/:id", mid_cli.jwtbasic, clientes.findOne);
    router.post("/login", mid_cli.login);
    router.post("/logout", mid_cli.logout);
    router.get("/validate", mid_cli.validate);

    app.use("/cli", router);
}
