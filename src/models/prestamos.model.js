const sql = require('mssql')
const config = require('../helpers/config.helper')
const db = {}

db.getPrestamos = async (prestamo) => {
    let pool = null
    try {
        
        pool = await sql.connect(config)
        let result1 = await pool.request()
            .input('id_persona', sql.VarChar(50),              prestamo.id_persona)
            .input('tarjeta_debito', sql.VarChar(50),          prestamo.tarjeta_debito)
            .input('caducidad_tarjeta', sql.VarChar(50),       prestamo.caducidad_tarjeta)
            .input('constancia_trabajo', sql.VarChar(50),      prestamo.constancia_trabajo)
            .input('resibo_bancario', sql.VarChar(50),         prestamo.resibo_bancario)
            .input('prestamo', sql.VarChar(50),                prestamo.prestamo)
            .input('interes', sql.VarChar(50),                 prestamo.interes)
            .input('IVA_sobre_interes', sql.VarChar(50),       prestamo.IVA_sobre_interes)
            .input('manejo_prestamo', sql.VarChar(50),         prestamo.manejo_prestamo)
            .input('IVA_manejo_prestamo', sql.VarChar(50),     prestamo.IVA_manejo_prestamo)
            .input('gran_total', sql.VarChar(50),              prestamo.gran_total)
            .input('fecha_vencimiento', sql.VarChar(50),       prestamo.fecha_vencimiento)
            .input('fecha_creacion_prestamo', sql.VarChar(50), prestamo.fecha_creacion_prestamo)
            .input('estado', sql.VarChar(50),                  prestamo.estado)
            .query(`insert into prestamos values(@id_persona,@tarjeta_debito,@caducidad_tarjeta,
                                                @constancia_trabajo,@resibo_bancario,
                                                @prestamo,@interes,@IVA_sobre_interes,
                                                @manejo_prestamo,@IVA_manejo_prestamo,
                                                @gran_total,@fecha_vencimiento,@fecha_creacion_prestamo,
                                                @estado)`)
        console.log(result1);
        await sql.close()
    } catch (error) {
        if(pool){
            try {
                await pool.close()
                console.log(`close database ${error.message}`);
                
            } catch (error) {
                console.log(`Utimo ${error.message}`);
            }
        }
    }
}


module.exports = db

