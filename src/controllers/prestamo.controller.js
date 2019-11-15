const ctrl = {}
const {getPrestamos} = require('../models/prestamos.model')

ctrl.createPrestamo = async (req,res) => {
    try {
        const {id_persona,tarjeta_debito,caducidad_tarjeta,constancia_trabajo,resibo_bancario,
            prestamo,fecha_vencimiento,fecha_creacion_prestamo,estado} = req.body

        let interess =  parseInt(prestamo) * 0.12
        let iva_interes = interess * 0.12
        let manejo = parseInt(prestamo) * 0.005
        let iva_manejo = manejo * 0.12
        let total = parseInt(prestamo) + iva_interes + manejo + iva_manejo + interess
        const data = {
            id_persona,
            tarjeta_debito,
            caducidad_tarjeta,
            constancia_trabajo,
            resibo_bancario,
            prestamo,
            interes: interess,
            IVA_sobre_interes: iva_interes,
            manejo_prestamo: manejo,
            IVA_manejo_prestamo: iva_manejo,
            gran_total: total,
            fecha_vencimiento,
            fecha_creacion_prestamo,
            estado
        }
        console.log('hola');
        await getPrestamos(data)

        res.json({
            ok:true,
            message:'Guardo correctamente'
        })
    } catch (error) {
        res.json({
            ok:false,
            message:error.message,
        })
    }
}

module.exports = ctrl