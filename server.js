//configurando o servidor
//primeiro criar 2 variaveis
const express = require("express");
const server = express();

//ligar o servidor
server.listen(3000, function() {
  console.log("Server started")
})

//