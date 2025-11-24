
const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const admin = require('firebase-admin')

// Firebase
const serviceAccount = require('./bancoartropodes-firebase-adminsdk-fbsvc-c1be32af4e.json') 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore()
const artropode_bd = db.collection('artropodes')

// Servidor 

app.use(express.static(__dirname + '/public/'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

// POST
app.post('/artropodes', async (req, res) => {
    
    try {
        const dados_artro = req.body;
        const nome = dados_artro.nome?.trim();

        if (!nome || !/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome)) {
            return res.status(400).send('O nome inserido está inválido');
        }

        const registro_artro = await artropode_bd.add(dados_artro);
        return res.status(201).send('Criado com sucesso: ' + registro_artro.id + registro_artro.nome);

    } catch (error) {
        console.error(error);
        
    }
});


// GET - listar insetos
app.get('/artropodes', async function(req, res) {

    try{
        const artro_data = db.collection('artropodes')
        const query = artro_data.get()

        if(typeof query === 'object'){
            query.then(listagem =>{
            res.render('index.ejs', {artropodes: listagem.docs})

            return console.log('Listagem feita com sucesso!')
            })
        }
    }

    catch (error){
        console.error(error);
    }
    

})

// UPDATE

app.post('/artropodes/update/:id', async (req, res) => {
    try {
        await artropode_bd.doc(req.params.id).update({
            nome: req.body.nome,
            nome_cien: req.body.nome_cien,
            habitat: req.body.habitat,
            tempo_vida: req.body.tempo_vida
        });

        res.redirect('/artropodes');
    } catch (error) {
        console.error(error);
    }
});



// DELETE 

app.post('/artropodes/delete/:id', async (req, res) => {
    try {
        await artropode_bd.doc(req.params.id).delete();
        res.redirect('/artropodes');
    } catch (error) {
        console.error(error);
    }
});

// Iniciar servidor
app.listen(3000, () => console.log('Servidor Rodando Normalmente'))





