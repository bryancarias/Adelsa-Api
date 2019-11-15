const jwt = require('jsonwebtoken')
const ctrl = {}

const seed ='este-es-el-seed-de-mi-app-sercreto'
const caducidad = '30d'

ctrl.token = (payload) => {
    return jwt.sign({ 
        usuario: payload
    },seed, { expiresIn: caducidad })
}

ctrl.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
    
        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided' });
        }
        
        const decoded = await jwt.verify(token, seed);
    
        req.usuario = decoded
    
        next();
        
    } catch (error) {
        res.json({
            ok: false,
            message:'Token invalid',
        })
    }
}

module.exports = ctrl