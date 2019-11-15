const expres = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const app = expres();

app.set('port',process.env.PORT || 3000)

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public', 'archivos'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname( file.originalname ) )
    }
})

app.use(cors())
app.use( multer({storage}).any('images') )
app.use( expres.json())
app.use( expres.urlencoded({extended:false}))


app.use('/api', require('./routes/main.routes') )

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})