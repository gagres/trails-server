module.exports = server => {
    server.get('/', (req, res) => res.json({ "message": "Bem-vindo a API Trail Makers "}));
}