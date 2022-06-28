class NewController {
    // [GET] /new
    index(req, res, next) {
        res.render("new");
    }
}

module.exports = new NewController();
