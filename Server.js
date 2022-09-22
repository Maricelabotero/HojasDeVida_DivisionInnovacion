const express = require('express');
const bodyParser = require( 'body-parser');
const router = require( './Network/routes');
const cors = require( 'cors');
const path = require( 'path');


var app = express();
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

router(app);

app.use(cors())
app.use(express.static(path.join(__dirname,'Public')))

app.get("", (req, res) => {
res.sendFile(path.join(__dirname, "Public/InicioSesion.html"))
})


app.listen(4000);
console.log('La app está corriendo en http://localhost:4000');

