const sql = require('mssql')
const config = require('../helpers/config.helper')
const db = {}

db.verificarUser = async email => {
    let pool = null
    try {
        pool = await sql.connect(config)
        let result1 = await pool.request()
            .input('email', sql.VarChar(50), email)
            .query(`select u.correo_electronico,u.password,r.rol from usuarios as u
            inner join rol_usuario as ru on u.id_usuario = ru.id_usuario 
            inner join rol as r on r.id_rol = ru.id_rol
            where correo_electronico = @email`)
        await sql.close();
        return result1.recordset[0]
    } catch (error) {
        if(pool){
            try {
                await pool.close()
                console.log(`close database ${err}`);
                
            } catch (error) {
                console.log(`Utimo ${error.message}`);
            }
        }
    }
}

db.register = async (persona) => {
    let pool = null
    try {
        pool = await sql.connect(config)
        let result2 = await pool.request()  
            .input('I_ROL', sql.VarChar(50), persona.I_ROL)  
            .input('I_CORREO_ELECTRONICO',sql.VarChar(50),     persona.I_CORREO_ELECTRONICO)         
            .input('I_CONTRASENA', sql.VarChar(50),   persona.I_CONTRASENA)               
            .input('I_PRIMER_NOMBRE', sql.VarChar(50), persona.I_PRIMER_NOMBRE)
            .input('I_SEGUNDO_NOMBRE', sql.VarChar(50),persona.I_SEGUNDO_NOMBRE)           
            .input('I_TERCER_NOMBRE', sql.VarChar(50), persona.I_TERCER_NOMBRE)    
            .input('I_PRIMER_APELLIDO', sql.VarChar(50),persona.I_PRIMER_APELLIDO)             
            .input('I_SEGUNDO_APELLIDO', sql.VarChar(50),persona.I_SEGUNDO_APELLIDO)           
            .input('I_APELLDO_CASADA', sql.VarChar(50),persona.I_APELLDO_CASADA)
            .input('I_NACIONALDAD', sql.VarChar(50),persona.I_NACIONALDAD)   
            .input('I_FECHA_NACIMIENTO', sql.VarChar(50),persona.I_FECHA_NACIMIENTO)        
            .input('I_PASAPORTE', sql.VarChar(50),persona.I_PASAPORTE)  
            .input('I_FECHA_EMICION_PASAPORTE', sql.VarChar(50),persona.I_FECHA_EMICION_PASAPORTE)
            .input('I_FECHA_CADUCIDAD_PASAPORTE', sql.VarChar(50),persona.I_FECHA_CADUCIDAD_PASAPORTE)
            .input('I_NIT', sql.VarChar(50),persona.I_NIT)
            .input('I_GENERO', sql.VarChar(50),persona.I_GENERO)                
            .input('I_ESTADO_CIVIL', sql.VarChar(50),persona.I_ESTADO_CIVIL)               
            .input('I_NUMERO_CUENTA_BANCARIA', sql.VarChar(50),persona.I_NUMERO_CUENTA_BANCARIA)        
            .input('I_DPI', sql.VarChar(50),persona.I_DPI)
            .output('ErrorMessage',sql.VarChar(50))
            .output('ErrorSeverity',sql.Int)
            .output('ErrorState',sql.Int)
            .execute('PERSONA')
        
        await pool.close()
        return result2.output;
    } catch (err) {
        if(pool){
            try {
                await pool.close()
                console.log(`close database ${err}`);
                
            } catch (error) {
                console.log(`Utimo ${error.message}`);
            }
        }
    }
}


module.exports = db
