const {register,verificarUser} = require('../models/persona.model')
const {encrypt,compare1} = require('../helpers/encrypt')
const {verifyToken,token} = require('../helpers/token')
const ctrl = {}


ctrl.registerPost = async (req, res, next) => {
    
    try {
        const {
            I_ROL,
            I_CORREO_ELECTRONICO,
            I_CONTRASENA,
            I_PRIMER_NOMBRE,
            I_SEGUNDO_NOMBRE,
            I_TERCER_NOMBRE,
            I_PRIMER_APELLIDO,
            I_SEGUNDO_APELLIDO,
            I_APELLDO_CASADA,
            I_NACIONALDAD,
            I_FECHA_NACIMIENTO,
            I_PASAPORTE,
            I_FECHA_EMICION_PASAPORTE,
            I_FECHA_CADUCIDAD_PASAPORTE,
            I_NIT,
            I_GENERO,
            I_ESTADO_CIVIL,
            I_NUMERO_CUENTA_BANCARIA,
            I_DPI
            } = req.body
        
        const persona = {
            I_ROL,
            I_CORREO_ELECTRONICO,
            I_CONTRASENA : await encrypt(I_CONTRASENA),
            I_PRIMER_NOMBRE,
            I_SEGUNDO_NOMBRE,
            I_TERCER_NOMBRE,
            I_PRIMER_APELLIDO,
            I_SEGUNDO_APELLIDO,
            I_APELLDO_CASADA,
            I_NACIONALDAD,
            I_FECHA_NACIMIENTO,
            I_PASAPORTE,
            I_FECHA_EMICION_PASAPORTE,
            I_FECHA_CADUCIDAD_PASAPORTE,
            I_NIT,
            I_GENERO,
            I_ESTADO_CIVIL,
            I_NUMERO_CUENTA_BANCARIA,
            I_DPI,
        }
        
        const usuario = await verificarUser(I_CORREO_ELECTRONICO)
      
        if(usuario){
            return res.json({
                ok:false,
                message: 'Correo ya existe',
                token1:null

            }) 
        }
        const result = await register(persona)

        const token1 = await token({
            email: I_CORREO_ELECTRONICO,
            rol: I_ROL
        })

        res.json({
            ok:true,
            message:result.ErrorMessage,
            token1
        })   
    } catch (error) {
        res.json({
            ok:false,
            message:error.message,
            token1:null
        })
    }
}


ctrl.verUser = async(req, res)=> {
 try {
    const result= await verificarUser('bcarias84@gmail.com')
    res.json({
        ok:true,
        message:result
    })
 } catch (error) {
     console.log(error);
 }
}


ctrl.login = async (req, res) => {
    try {
        
        const {email,password} = req.body
        
        const user = await  verificarUser(email)
        if(!user) {
            return res.json({
                ok:false,
                message:'Email/Password incorrecto m',
                token1:null
            })
        }

        
        if(await compare1(password, user.password)) {
            return res.json({
                ok:false,
                message:'Email/Password incorrecto n',
                token1:null
            })
        }

        const token1 = await token({
            email: user.correo_electronico,
            rol: user.rol
        })
    
        res.json({
            ok:true,
            message:'Todo bien',
            token1
        })

    } catch (error) {
        res.json({
            ok:false,
            message:error.message,
            token1:null
        })
    }
} 
module.exports = ctrl