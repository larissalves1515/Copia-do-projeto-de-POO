let velocidadeMundo = 3;
let abelha, florInimigo, apicultor, homem, sol;
let imgBel, imgFlor, imgApi, imgHomem, imgSol, imgPlat, imgGameOver, imgTelaInicial; // ADICIONE imgTelaInicial
let plataformas = [];
let larguraPlat = 1536;
let alturaPlat = 198;
let cameraX = 0;
let npcs = [];
let vidas = 3;
let maxVidas = 3;
let invencivel = false;
let tempoInvencivel = 0;
let estadoJogo = "inicial"; // MUDE DE "jogando" PARA "inicial"

let colFlor = false, colApicultor = false, colHomem = false, abelhaCaiu = false;


function preload() {
  imgBel = loadImage("img/bel-sm.png");
  imgFlor = loadImage("img/flor.png");
  imgApi = loadImage("img/apicultor.png");
  imgHomem = loadImage("img/homi.png");
  imgSol = loadImage("img/sol.png");
  imgPlat = loadImage("img/plataforma.png");
  imgGameOver = loadImage("img/gameoverorigin.png");
  imgTelaInicial = loadImage("img/belbee.png"); // ADICIONE ESTA LINHA
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Inicializa o jogo, mas não começa ainda
  inicializarJogo();
}

function inicializarJogo() {
  let topoPlat = height - imgPlat.height;

  let alturaFlor = imgFlor.height * 0.18;
  florInimigo = new Flor(700, topoPlat - alturaFlor, alturaFlor, 100, imgFlor, 2);

  let alturaApi = imgApi.height * 0.6;
  apicultor = new Apicultor(1000, topoPlat - alturaApi, 800, 60, 70, 2, imgApi);

  let alturaHomem = imgHomem.height * 0.6;
  homem = new Homem(1500, topoPlat - alturaHomem, 500, 60, 70, 2, imgHomem);

  sol = new Sol(1100, 50, 300, 150, 150, imgSol);
  abelha = new Abelha(120, 100, 0.5, 0, 10, imgBel, topoPlat);

  npcs = [
    florInimigo,
    apicultor,
    homem,
    new Flor(2000, topoPlat - alturaFlor, alturaFlor, 100, imgFlor, 2)
  ];

  let x = -800;
  while (x < windowWidth * 10) {
    plataformas.push(
      new Plataforma(x, topoPlat, 1, imgPlat.height, larguraPlat, imgPlat)
    );
    x += larguraPlat;
  }
}

function draw() {
  background("rgba(123, 204, 255, 1)");

  // CONTROLE DAS TELAS
  if (estadoJogo === "inicial") {
    telaInicial();
    return;
  } else if (estadoJogo === "gameover") {
    telaGameOver();
    return;
  }

  // JOGO EM ANDAMENTO
  sol.x -= velocidadeMundo * 0.2;
  sol.mostrar();

  abelha.moverVertical();
  abelhaCaiu = abelha.caiu();

  // plataformas
  for (let plat of plataformas) {
    plat.x -= velocidadeMundo;

    if (plat.x + plat.largura < 0) {
      plat.x += larguraPlat * plataformas.length;
    }
    plat.mostrar();
  }

  for (let i = npcs.length - 1; i >= 0; i--) {
    let npc = npcs[i];
    npc.x -= velocidadeMundo;
    npc.mostrar();

    if (abelha.colidiu(npc) && !invencivel) {
      vidas--;
      invencivel = true;
      tempoInvencivel = frameCount;

      if (npc instanceof Flor) colFlor = true;
      if (npc instanceof Apicultor) colApicultor = true;
      if (npc instanceof Homem) colHomem = true;

      npcs.splice(i, 1);
    }
  }

  if (invencivel && frameCount - tempoInvencivel > 60) {
    invencivel = false;
  }

  abelha.mostrar();
  
  //aqui é os ajustes da posição dos corações
  for (let i = 0; i < maxVidas; i++) {
    let cheio = i < vidas;
    desenharCoracao(40 + i * 50, 50, 0.6, cheio);
  }
  
  if (vidas <= 0) {
    estadoJogo = "gameover";
  }
}

// ==================== TELA INICIAL ====================
function telaInicial() {
  // Fundo azul igual ao do jogo
  background("rgba(123, 204, 255, 1)");
  
  // Centraliza a imagem
  imageMode(CENTER);
  
  // Ajusta o tamanho da imagem (pode ajustar os valores)
  let imgWidth = imgTelaInicial.width * 0.6; // 60% do tamanho original
  let imgHeight = imgTelaInicial.height * 0.6;
  
  // Ajusta se for muito grande para a tela
  if (imgWidth > width * 0.5) {
    let ratio = (width * 0.5) / imgWidth;
    imgWidth *= ratio;
    imgHeight *= ratio;
  }
  
  // Desenha a imagem centralizada um pouco mais para cima
  image(imgTelaInicial, width / 2, height / 2 - 60, imgWidth, imgHeight);
  
  // Botão para começar o jogo
  drawBotaoIniciar();
  
  // Instruções
  drawInstrucoes();
  
  // Volta ao modo normal
  imageMode(CORNER);
}

function drawBotaoIniciar() {
  let btnX = width / 2;
  let btnY = height * 0.7;
  let btnWidth = 250;
  let btnHeight = 60;
  
  // Verifica se o mouse está sobre o botão
  let mouseOver = mouseX > btnX - btnWidth/2 && 
                  mouseX < btnX + btnWidth/2 && 
                  mouseY > btnY - btnHeight/2 && 
                  mouseY < btnY + btnHeight/2;
  
  // Desenha o botão
  fill(mouseOver ? color(50, 205, 50) : color(34, 139, 34)); // Verde mais escuro quando mouse over
  stroke(255);
  strokeWeight(3);
  rectMode(CENTER);
  rect(btnX, btnY, btnWidth, btnHeight, 15);
  
  // Texto do botão
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(28);
  text("INICIAR JOGO", btnX, btnY);
  
  rectMode(CORNER);
}

function drawInstrucoes() {
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  
  // Instruções de controle
  text("CONTROLES:", width / 2, height * 0.8);
  textSize(18);
  text("SETA PARA CIMA: Voar/Pular", width / 2, height * 0.84);
  text("Desvie dos obstáculos e colete flores!", width / 2, height * 0.88);
}

// ==================== TELA GAME OVER ====================
function telaGameOver() {
  // Fundo azul igual ao do jogo
  background("rgba(123, 204, 255, 1)");
  
  // Centraliza a imagem
  imageMode(CENTER);
  
  // Tamanho da imagem (ajuste conforme necessário)
  let imgWidth = imgGameOver.width * 0.3;
  let imgHeight = imgGameOver.height * 0.3;
  
  // Ajusta se for muito grande para a tela
  if (imgWidth > width * 0.9) {
    let ratio = (width * 0.9) / imgWidth;
    imgWidth *= ratio;
    imgHeight *= ratio;
  }
  
  // Desenha a imagem
  image(imgGameOver, width / 2, height / 2 - 50, imgWidth, imgHeight);
  
  // Botão de reiniciar
  drawBotaoReiniciar();
  
  // Volta ao modo normal
  imageMode(CORNER);
}

function drawBotaoReiniciar() {
  let btnX = width / 2;
  let btnY = height * 0.75;
  let btnWidth = 200;
  let btnHeight = 50;
  
  // Verifica se o mouse está sobre o botão
  let mouseOver = mouseX > btnX - btnWidth/2 && 
                  mouseX < btnX + btnWidth/2 && 
                  mouseY > btnY - btnHeight/2 && 
                  mouseY < btnY + btnHeight/2;
  
  // Desenha o botão
  fill(mouseOver ? color(255, 200, 0) : color(255, 165, 0));
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  rect(btnX, btnY, btnWidth, btnHeight, 10);
  
  // Texto do botão
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Voltar ao início", btnX, btnY);
  
  rectMode(CORNER);
}

// ==================== CONTROLE DE CLIQUE DO MOUSE ====================
function mousePressed() {
  if (estadoJogo === "inicial") {
    let btnX = width / 2;
    let btnY = height * 0.7;
    let btnWidth = 250;
    let btnHeight = 60;
    
    if (mouseX > btnX - btnWidth/2 && 
        mouseX < btnX + btnWidth/2 && 
        mouseY > btnY - btnHeight/2 && 
        mouseY < btnY + btnHeight/2) {
      estadoJogo = "jogando";
    }
  } else if (estadoJogo === "gameover") {
    let btnX = width / 2;
    let btnY = height * 0.75;
    let btnWidth = 200;
    let btnHeight = 50;
    
    if (mouseX > btnX - btnWidth/2 && 
        mouseX < btnX + btnWidth/2 && 
        mouseY > btnY - btnHeight/2 && 
        mouseY < btnY + btnHeight/2) {
      reiniciarJogo();
    }
  }
}

function reiniciarJogo() {
  // Reinicia todas as variáveis do jogo
  vidas = 3;
  estadoJogo = "jogando";
  invencivel = false;
  colFlor = false;
  colApicultor = false;
  colHomem = false;
  
  // Reinicia o jogo
  inicializarJogo();
}

function desenharCoracao(x, y, tamanho, cheio) {
  push();
  translate(x, y);
  scale(tamanho);
  noStroke();

  if (cheio) {
    fill(255, 0, 0);
  } else {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(3);
  }

  beginShape();
  vertex(0, 0);
  bezierVertex(-20, -20, -40, 10, 0, 40);
  bezierVertex(40, 10, 20, -20, 0, 0);
  endShape(CLOSE);

  pop();
}

function keyPressed() {
  if (estadoJogo === "jogando" && keyCode === UP_ARROW) {
    abelha.pular();
  }
}