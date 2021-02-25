// exportação de modulos 
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const Sequelize = require ('Sequelize')
const bodyParser = require('body-parser')

//Alteração teste Git

//Config
    //TEMPLATE ENGINE (Para utilizar o main.handlebars como view principal)
    app.engine('handlebars', handlebars({defaultLayout:'main'}))
    app.set('view engine','handlebars')
//Body Parser (Para fazer o tratamento dos dados via formulário)
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
//Conexão com o banco de dados
const sequelize =  new Sequelize('hotel','root','password',{
    host:'localhost',
    dialect:'mysql'
})
//Autentica a conexão com o banco de dados
sequelize.authenticate().then(function(){
    console.log("Connection with Database Sucessful!.")
}).catch(function(erro){
    console.log("[ERROR]The connection was no realize error"+erro)
})

//Rotas
app.get('/', function(req,res){
    res.send("Welcome")
})
//Puxa o HTML do registerUser
app.get('/registerNewGuest',function(req,res){
    res.render('registerUser')
})
app.post('/add_new_guest',function(req,res){
    res.send('Informations recorded.')
})
//Models
//'guests' é o nome da tabela
const Guest = sequelize.define('guests',{
    name_client:{
        type:Sequelize.STRING
    },
    id_number:{
        type:Sequelize.INTEGER, unique:true,
    },
    adress:{
        type:Sequelize.TEXT
    },
    phone_number:{
        type:Sequelize.INTEGER
    },
    email:{
        type:Sequelize.STRING
    },
    checkin:{
        type:Sequelize.STRING
    },
    checkout:{
        type:Sequelize.STRING
    },
    credit_card:{
        type:Sequelize.INTEGER
    },
    room_number:{
        type:Sequelize.INTEGER
    }
})
//Insere os dados na tabela
Guest.create({
    name_client:"Filipe",
    id_number:76766054,
    adress:"kdkfs",
    phone_number:8765,
    email:"kn~kdfg",
    checkin:"20/01/2021",
    checkout:"21/01/2001",
    credit_card:76096907,
    room_number:3
}).then(function(){
    console.log("Guest Registred")
}).catch(function(){
    console.log("[ERROR]" +console.error())
})

//Comando para gerar tabela MySql, usar somente uma vez!
//Guest.sync({force:true})

// Abertura do Servidor
app.listen(3031,function(){
    console.log("Host Online")
})