const Router = require('express').Router()
const {registerPost,verUser,login} = require('../controllers/persona.controller')
const { createPrestamo } = require('../controllers/prestamo.controller')

Router.route('/register')
    .get(verUser)
    .post(registerPost)

Router.route('/login')
    .post(login)

Router.route('/prestamos')
    .post(createPrestamo)


module.exports = Router