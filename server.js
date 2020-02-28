//configurando o servidor
//primeiro criar 2 variaveis
const express = require("express");
const server = express();


// configurando o server pra apresentar arquivos extras
server.use(express.static('public'))


//conectando com o pg
const Pool = require('pg').Pool
const db = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5434,
  database: 'manutencaoarquivos'
})



// habilitar body do form
server.use(express.urlencoded({ extended: true }))

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
  express: server,
  noCache:true,
})


// configurar a apresentação da página
server.get("/", function(req, res) {

  db.query('select * from tipi', function(err, result){
    if (err) return res.send("Erro no db")

    
    return res.render("index.html")
  })

})

server.post("/", function(req, res) {
  //pegar dados do formulario

  const codigo_ncm = req.body.codigo_ncm
  const desc_ncm = req.body.desc_ncm
  
  if (codigo_ncm == "" || desc_ncm == "") {
    return res.send("Todos os campos são obrigatórios.")
  
  }

  //push - coloca valor dentro do db
  const query = 
  `  INSERT INTO ibpt (ncm,ex,tipo,uf,descricao,federalnac,federalimp,estadual,municipal,iniciovigencia,fimvigencia,chave,versao,fonte,datacriacao,dataatualizacao,novo) 
  VALUES ($1,0,0,'AC', $2,4.2,9.34,7,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'AL',$2,4.2,8.16,0,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'AM',$2,4.2,8.77,0,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'AP',$2,4.2,9.72,18,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'BA',$2,4.2,9.24,18,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'CE',$2,4.2,11.65,0,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'DF',$2,4.2,9.37,18,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'ES',$2,4.2,8.96,17,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'GO',$2,4.2,8.71,17,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'MA',$2,4.2,9.18,18,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'MG',$2,4.2,13.22,18,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'MS',$2,4.2,10.21,17,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'MT',$2,4.2,9.31,0,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'PA',$2,4.2,8.84,17,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'PB',$2,4.2,9.16,0,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'PE',$2,4.2,9.2,18,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'PI',$2,4.2,11.59,12,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'PR',$2,4.2,8.15,0,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'RJ',$2,4.2,9.48,0,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'RN',$2,4.2,9.41,18,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'RO',$2,4.2,10.5,0,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'RR',$2,4.2,9.4,0,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'RS',$2,4.2,9.29,7,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'SC',$2,4.2,15.29,17,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'SE',$2,4.2,9.38,0,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'SP',$2,4.2,15.29,7,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false),
          ($1,0,0,'TO',$2,4.2,8.72,0,0,'2020-02-01','2020-04-30','6A098E','20.1.A','IBPT/empresometro.com.br','2020-02-03',NULL,false)`

 

  const values = [codigo_ncm, desc_ncm]

  db.query(query, values, function(err) {
    //fluxo de erro
    if (err) return res.send("Erro no db")

    //fluxo ideal
    return res.redirect("/")
  })


})

//ligar o servidor
server.listen(3001, function() {
  console.log("Server started")
})