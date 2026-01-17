let velocidadeMundo = 5;
let abelha, florInimigo, apicultor, homem, sol;
let imgBel, imgFlor, imgApi, imgHomem, imgSol, imgPlat, imgGameOver, imgTelaInicial;
let plataformas = [];
let larguraPlat = 1536;
let alturaPlat = 198;
let cameraX = 0;
let npcs = [];
let vidas = 3;
let maxVidas = 3;
let invencivel = false;
let tempoInvencivel = 0;
let estadoJogo = "inicial";

let colFlor = false, colApicultor = false, colHomem = false, abelhaCaiu = false;

// VARIÁVEIS PARA ANIMAÇÃO DA ABELHA NA TELA INICIAL
let abelhaOffsetY = 0;
let abelhaAngle = 0;


function preload() {
  imgBel = loadImage("img/bel-sm.png");
  imgFlor = loadImage("img/flor.png");
  imgApi = loadImage("img/apicultor.png");
  imgHomem = loadImage("img/homi.png");
  imgSol = loadImage("img/sol.png");
  imgPlat = loadImage("img/plataforma.png");
  imgGameOver = loadImage("img/gameoverorigin.png");
  imgTelaInicial = loadImage("img/belbee.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Inicializa o jogo, mas não começa ainda
  inicializarJogo();
}

function inicializarJogo() {
  let topoPlat = height - imgPlat.height;

  // ========== TAMANHOS FIXOS PARA OS NPCS ==========
  // Alturas em pixels (valores fixos, não porcentagens!)
  let alturaFlor = 250; // 120 pixels de altura
  let alturaApi = 220;  // 150 pixels de altura
  let alturaHomem = 220; // 150 pixels de altura
  
  // Larguras proporcionais mantendo a proporção original
  let larguraFlor = alturaFlor * (imgFlor.width / imgFlor.height);
  let larguraApi = alturaApi * (imgApi.width / imgApi.height);
  let larguraHomem = alturaHomem * (imgHomem.width / imgHomem.height);
  // =================================================

  // Criação dos NPCs com tamanhos consistentes
  florInimigo = new Flor(700, topoPlat - alturaFlor, alturaFlor, larguraFlor, imgFlor, 2);
  apicultor = new Apicultor(1000, topoPlat - alturaApi, 800, alturaApi, larguraApi, 2, imgApi);
  homem = new Homem(1500, topoPlat - alturaHomem, 500, alturaHomem, larguraHomem, 2, imgHomem);

  sol = new Sol(1100, 50, 300, 150, 150, imgSol);
  abelha = new Abelha(120, 100, 0.5, 0, 10, imgBel, topoPlat);

  npcs = [
    florInimigo,
    apicultor,
    homem,
    new Flor(2000, topoPlat - alturaFlor, alturaFlor, larguraFlor, imgFlor, 2)
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
  
  // Centraliza as imagens
  imageMode(CENTER);
  
  // ========== ANIMAÇÃO DA ABELHA ==========
  abelhaOffsetY = sin(abelhaAngle) * 8; // Movimento reduzido
  abelhaAngle += 0.05;
  
  // ========== IMAGEM PRINCIPAL (belbee.png) NO CENTRO - PEQUENA ==========
  let imgWidth = imgTelaInicial.width * 0.35; // 35% do tamanho original (AJUSTE AQUI)
  let imgHeight = imgTelaInicial.height * 0.35;
  
  // Ajusta se for muito grande para a tela
  if (imgWidth > width * 0.5) {
    let ratio = (width * 0.5) / imgWidth;
    imgWidth *= ratio;
    imgHeight *= ratio;
  }
  
  // POSIÇÃO CENTRAL DA TELA - MAIS PARA CIMA
  let imgPrincipalX = width / 2;
  let imgPrincipalY = height / 2 - 80; // MAIS PARA CIMA PARA DAR ESPAÇO
  
  // Desenha a imagem principal (belbee.png com título)
  image(imgTelaInicial, imgPrincipalX, imgPrincipalY, imgWidth, imgHeight);
  
  // ========== ABELHA ANIMADA À ESQUERDA ==========
  let abelhaSize = 0.35; // Abelha proporcionalmente menor
  let abelhaWidth = imgBel.width * abelhaSize;
  let abelhaHeight = imgBel.height * abelhaSize;
  
  // Posição da abelha à ESQUERDA da imagem central
  let abelhaX = imgPrincipalX - imgWidth/2 - abelhaWidth/2 - 25;
  let abelhaY = imgPrincipalY + abelhaOffsetY;
  
  // Rotação sutil da abelha
  push();
  translate(abelhaX + abelhaWidth/2, abelhaY + abelhaHeight/2);
  rotate(sin(abelhaAngle * 0.5) * 0.08);
  image(imgBel, -abelhaWidth/2, -abelhaHeight/2, abelhaWidth, abelhaHeight);
  pop();
  
  // ========== BOTÃO E INSTRUÇÕES ==========
  // Botão para começar o jogo (MAIS PARA BAIXO)
  drawBotaoIniciarPequeno();
  
  // Instruções (MAIS PARA BAIXO)
  drawInstrucoesPequeno();
  
  // Volta ao modo normal
  imageMode(CORNER);
}

function drawBotaoIniciarPequeno() {
  let btnX = width / 2;
  let btnY = height * 0.75; // POSIÇÃO MAIS BAIXA
  let btnWidth = 220; // Botão um pouco menor
  let btnHeight = 55;
  
  // Verifica se o mouse está sobre o botão
  let mouseOver = mouseX > btnX - btnWidth/2 && 
                  mouseX < btnX + btnWidth/2 && 
                  mouseY > btnY - btnHeight/2 && 
                  mouseY < btnY + btnHeight/2;
  
  // Desenha o botão
  fill(mouseOver ? color(50, 205, 50) : color(34, 139, 34));
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  rect(btnX, btnY, btnWidth, btnHeight, 12);
  
  // Texto do botão
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24); // Texto um pouco menor
  text("INICIAR JOGO", btnX, btnY);
  
  rectMode(CORNER);
}

function drawInstrucoesPequeno() {
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18); // Texto menor
  
  // Instruções de controle (MAIS PARA BAIXO)
  text("CONTROLES:", width / 2, height * 0.85);
  textSize(16);
  text("SETA PARA CIMA: Voar/Pular", width / 2, height * 0.89);
  text("Desvie dos obstáculos e sobreviva!", width / 2, height * 0.93);
}

// ==================== TELA GAME OVER ====================
function telaGameOver() {
  // Fundo azul igual ao do jogo
  background("rgba(123, 204, 255, 1)");
  
  // Centraliza a imagem
  imageMode(CENTER);
  
  // Tamanho da imagem (ajuste conforme necessário)
  let imgWidth = imgGameOver.width * 0.4;
  let imgHeight = imgGameOver.height * 0.4;
  
  // Ajusta se for muito grande para a tela
  if (imgWidth > width * 0.8) {
    let ratio = (width * 0.8) / imgWidth;
    imgWidth *= ratio;
    imgHeight *= ratio;
  }
  
  // Desenha a imagem
  image(imgGameOver, width / 2, height / 2 - 50, imgWidth, imgHeight);
  
  // Botão de reiniciar (MAIS PARA BAIXO - 0.85)
  drawBotaoReiniciar();
  
  // Volta ao modo normal
  imageMode(CORNER);
}


function drawBotaoReiniciar() {
  let btnX = width / 2;
  let btnY = height * 0.85; // MAIS PARA BAIXO (era 0.75)
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
  textSize(18);
  text("JOGAR NOVAMENTE", btnX, btnY);
  
  rectMode(CORNER);
}


// ==================== CONTROLE DE CLIQUE DO MOUSE ====================
function mousePressed() {
  if (estadoJogo === "inicial") {
    let btnX = width / 2;
    let btnY = height * 0.75; // Botão INICIAR
    let btnWidth = 220;
    let btnHeight = 55;
    
    if (mouseX > btnX - btnWidth/2 && 
        mouseX < btnX + btnWidth/2 && 
        mouseY > btnY - btnHeight/2 && 
        mouseY < btnY + btnHeight/2) {
      estadoJogo = "jogando";
    }
  } else if (estadoJogo === "gameover") {
    let btnX = width / 2;
    let btnY = height * 0.85; // Botão JOGAR NOVAMENTE (CORRIGIDO!)
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