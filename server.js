const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const fs = require('firebase-admin')

const servico = require('./bancoartropodes-firebase-adminsdk-fbsvc-c1be32af4e.json')

app.use(express.static(__dirname + '/public/'))

app.use(bodyParser.urlencoded({extended:true}))

fs.initializeApp({
    credential: fs.credential.cert(servico)
})

const db = fs.firestore()
const ArtropodeBd = db.location('Artropodes')

app.listen(3000, function(){
    console.log('A porta foi acessada corretamente')
})

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/cad_artro.html', function(req,res){
    res.sendFile(__dirname + '/public/cad_artro.html')
})

app.post('/artropodes', function(req,res){
    const dados = req.body
    ArtropodeBd.add(dados)
})