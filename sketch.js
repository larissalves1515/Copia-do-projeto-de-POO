let velocidadeMundo = 5;
let abelha, florInimigo, apicultor, homem, sol, arvore;
let imgBel, imgFlor, imgApi, imgHomem, imgSol, imgPlat, imgGameOver, imgTelaInicial, imgArvore, imgParabens, imgNuvem;
let plataformas = [];
let larguraPlat = 1536;
let alturaPlat = 198;
let cameraX = 0;
let npcs = [];
let nuvens = [];
let vidas = 3;
let maxVidas = 3;
let invencivel = false;
let tempoInvencivel = 0;
let estadoJogo = "inicial";
let jogoGanho = false;

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
  imgArvore = loadImage("img/arvore.png");
  imgParabens = loadImage("img/parabens.png");
  imgNuvem = loadImage("img/nuvem.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  inicializarJogo();
}

function inicializarJogo() {
  let topoPlat = height - imgPlat.height;
  jogoGanho = false;

  let alturaFlor = 250;
  let alturaApi = 220;
  let alturaHomem = 220;
  let alturaArvore = 450;
  
  let larguraFlor = alturaFlor * (imgFlor.width / imgFlor.height);
  let larguraApi = alturaApi * (imgApi.width / imgApi.height);
  let larguraHomem = alturaHomem * (imgHomem.width / imgHomem.height);
  let larguraArvore = alturaArvore * (imgArvore.width / imgArvore.height);

  florInimigo = new Flor(700, topoPlat - alturaFlor, alturaFlor, larguraFlor, imgFlor, 2);
  apicultor = new Apicultor(1000, topoPlat - alturaApi, 800, alturaApi, larguraApi, 2, imgApi);
  homem = new Homem(1500, topoPlat - alturaHomem, 500, alturaHomem, larguraHomem, 2, imgHomem);
  arvore = new Arvore(5000, topoPlat - alturaArvore + 50, 1, alturaArvore, larguraArvore, imgArvore);

  sol = new Sol(1100, 50, 300, 150, 150, imgSol);
  abelha = new Abelha(120, 100, 0.5, 0, 10, imgBel, topoPlat);
  
  // CRIANDO NUVENS PARA O JOGO - MAIORES E EM POSIÇÕES DIFERENTES
  nuvens = [];
  
  // 4 nuvens em posições e tamanhos variados - TAMANHOS AUMENTADOS
  // NUVEM 1: Antes do sol, alta e média
  nuvens.push(new Nuvem(700, 40, 0.15, imgNuvem, 0.8)); // Aumentado de 0.07 para 0.15
  
  // NUVEM 2: Perto do sol, baixa e grande
  nuvens.push(new Nuvem(900, 90, 0.18, imgNuvem, 0.7)); // Aumentado de 0.09 para 0.18
  
  // NUVEM 3: Depois do sol, média e média
  nuvens.push(new Nuvem(1300, 60, 0.16, imgNuvem, 1.0)); // Aumentado de 0.08 para 0.16
  
  // NUVEM 4: Longe do sol, alta e pequena
  nuvens.push(new Nuvem(1600, 30, 0.12, imgNuvem, 1.2)); // Aumentado de 0.06 para 0.12
  
  // NUVEM 5: Muito alta e pequena
  nuvens.push(new Nuvem(1900, 20, 0.10, imgNuvem, 1.1)); // Aumentado de 0.05 para 0.10

  npcs = [
    florInimigo,
    apicultor,
    homem,
    new Flor(2000, topoPlat - alturaFlor, alturaFlor, larguraFlor, imgFlor, 2),
    new Apicultor(2500, topoPlat - alturaApi, 800, alturaApi, larguraApi, 2, imgApi),
    new Homem(3000, topoPlat - alturaHomem, 500, alturaHomem, larguraHomem, 2, imgHomem),
    new Flor(3200, topoPlat - alturaFlor, alturaFlor, larguraFlor, imgFlor, 2),
    new Apicultor(3400, topoPlat - alturaApi, 800, alturaApi, larguraApi, 2, imgApi),
    new Homem(3800, topoPlat - alturaHomem, 500, alturaHomem, larguraHomem, 2, imgHomem),
    new Flor(4200, topoPlat - alturaFlor, alturaFlor, larguraFlor, imgFlor, 2),
    new Apicultor(4400, topoPlat - alturaApi, 800, alturaApi, larguraApi, 2, imgApi),
    new Homem(4600, topoPlat - alturaHomem, 500, alturaHomem, larguraHomem, 2, imgHomem),
    new Flor(4800, topoPlat - alturaFlor, alturaFlor, larguraFlor, imgFlor, 2),
    arvore
  ];

  let x = -800;
  while (x < windowWidth * 10) {
    plataformas.push(new Plataforma(x, topoPlat, 1, imgPlat.height, larguraPlat, imgPlat));
    x += larguraPlat;
  }
}

function draw() {
  background("rgba(123, 204, 255, 1)");

  if (estadoJogo === "inicial") {
    telaInicial();
    return;
  } else if (estadoJogo === "gameover") {
    telaGameOver();
    return;
  } else if (estadoJogo === "vitoria") {
    telaVitoria();
    return;
  }

  // JOGO EM ANDAMENTO
  sol.x -= velocidadeMundo * 0.2;
  sol.mostrar();
  
  // DESENHAR E MOVER NUVENS
  for (let i = nuvens.length - 1; i >= 0; i--) {
    let nuvem = nuvens[i];
    nuvem.x -= nuvem.velocidade;
    nuvem.mostrar();
    
    if (nuvem.x + nuvem.largura < -100) {
      // Reposiciona à direita com posições variadas
      nuvem.x = width + random(300, 800);
      
      // Alturas variadas: algumas altas, algumas baixas
      if (random() > 0.5) {
        nuvem.y = random(20, 50); // Nuvens altas
      } else {
        nuvem.y = random(60, 100); // Nuvens baixas
      }
      
      // Tamanhos variados: AUMENTADO (0.10 a 0.25)
      nuvem.tamanho = random(0.10, 0.25); // Aumentado de (0.05, 0.10) para (0.10, 0.25)
      
      // IMPORTANTE: Atualizar largura e altura com o novo tamanho
      nuvem.largura = imgNuvem.width * nuvem.tamanho;
      nuvem.altura = imgNuvem.height * nuvem.tamanho;
    }
  }

  abelha.moverVertical();
  abelhaCaiu = abelha.caiu();

  if (abelhaCaiu && !jogoGanho) {
    vidas = 0;
  }

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

    if (npc === arvore && abelha.colidiu(npc)) {
      jogoGanho = true;
      estadoJogo = "vitoria";
      return;
    }
    
    if (!jogoGanho && abelha.colidiu(npc) && !invencivel && npc !== arvore) {
      vidas--;
      invencivel = true;
      tempoInvencivel = frameCount;
      npcs.splice(i, 1);
    }
  }

  if (invencivel && frameCount - tempoInvencivel > 60) {
    invencivel = false;
  }

  abelha.mostrar();
  
  for (let i = 0; i < maxVidas; i++) {
    let cheio = i < vidas;
    desenharCoracao(40, 50 + i * 50, 0.6, cheio);
  }
  
  if (vidas <= 0 && !jogoGanho) {
    estadoJogo = "gameover";
  }
}

// ==================== TELA DE VITÓRIA ATUALIZADA ====================
function telaVitoria() {
  background("rgba(123, 204, 255, 1)");
  desenharNuvensVitoria();
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  
  let abelhaWidth = imgBel.width * 0.2;
  let abelhaHeight = imgBel.height * 0.2;
  let arvoreWidth = imgArvore.width * 0.22;
  let arvoreHeight = imgArvore.height * 0.22;
  
  let centroX = width / 2;
  let arvoreY = height / 2 - 130;
  
  let espacamento = 20;
  let abelhaX = centroX - arvoreWidth/2 - abelhaWidth/2 - espacamento;
  let abelhaY = arvoreY + sin(frameCount * 0.05) * 8 + 15;
  
  image(imgBel, abelhaX, abelhaY, abelhaWidth, abelhaHeight);
  image(imgArvore, centroX, arvoreY, arvoreWidth, arvoreHeight);
  
  if (imgParabens) {
    let parabensWidth = imgParabens.width * 0.25;
    let parabensHeight = imgParabens.height * 0.25;
    let parabensY = arvoreY + arvoreHeight/2 + 50;
    
    image(imgParabens, centroX, parabensY, parabensWidth, parabensHeight);
    
    noStroke();
    fill(255);
    textSize(22);
    let textoY = parabensY + parabensHeight/2 - 15;
    text("A abelha chegou no seu lar!", centroX, textoY);
  } else {
    noStroke();
    fill(255);
    textSize(24);
    let textoY = arvoreY + arvoreHeight/2 + 80;
    text("A abelha chegou no seu lar!", centroX, textoY);
  }
  
  drawBotaoJogarNovamente();
  imageMode(CORNER);
}

function drawBotaoJogarNovamente() {
  let btnX = width / 2;
  let btnY = height * 0.88;
  let btnWidth = 220;
  let btnHeight = 50;
  
  let mouseOver = mouseX > btnX - btnWidth/2 && 
                  mouseX < btnX + btnWidth/2 && 
                  mouseY > btnY - btnHeight/2 && 
                  mouseY < btnY + btnHeight/2;
  
  fill(mouseOver ? color(255, 215, 0) : color(255, 165, 0));
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  rect(btnX, btnY, btnWidth, btnHeight, 12);
  
  fill(255);
  noStroke();
  textSize(18);
  text("JOGAR NOVAMENTE", btnX, btnY);
  
  rectMode(CORNER);
}

// ==================== TELA INICIAL ====================
function telaInicial() {
  background("rgba(123, 204, 255, 1)");
  desenharNuvensInicio();
  imageMode(CENTER);
  
  abelhaOffsetY = sin(abelhaAngle) * 8;
  abelhaAngle += 0.05;
  
  let imgWidth = imgTelaInicial.width * 0.35;
  let imgHeight = imgTelaInicial.height * 0.35;
  
  if (imgWidth > width * 0.5) {
    let ratio = (width * 0.5) / imgWidth;
    imgWidth *= ratio;
    imgHeight *= ratio;
  }
  
  let imgPrincipalX = width / 2;
  let imgPrincipalY = height / 2 - 80;
  
  image(imgTelaInicial, imgPrincipalX, imgPrincipalY, imgWidth, imgHeight);
  
  let abelhaSize = 0.35;
  let abelhaWidth = imgBel.width * abelhaSize;
  let abelhaHeight = imgBel.height * abelhaSize;
  
  let abelhaX = imgPrincipalX - imgWidth/2 - abelhaWidth/2 - 25;
  let abelhaY = imgPrincipalY + abelhaOffsetY;
  
  push();
  translate(abelhaX + abelhaWidth/2, abelhaY + abelhaHeight/2);
  rotate(sin(abelhaAngle * 0.5) * 0.08);
  image(imgBel, -abelhaWidth/2, -abelhaHeight/2, abelhaWidth, abelhaHeight);
  pop();
  
  drawBotaoIniciarPequeno();
  drawInstrucoesPequeno();
  imageMode(CORNER);
}

function drawBotaoIniciarPequeno() {
  let btnX = width / 2;
  let btnY = height * 0.75;
  let btnWidth = 220;
  let btnHeight = 55;
  
  let mouseOver = mouseX > btnX - btnWidth/2 && 
                  mouseX < btnX + btnWidth/2 && 
                  mouseY > btnY - btnHeight/2 && 
                  mouseY < btnY + btnHeight/2;
  
  fill(mouseOver ? color(50, 205, 50) : color(34, 139, 34));
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  rect(btnX, btnY, btnWidth, btnHeight, 12);
  
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24);
  text("INICIAR JOGO", btnX, btnY);
  
  rectMode(CORNER);
}

function drawInstrucoesPequeno() {
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  
  text("CONTROLES:", width / 2, height * 0.85);
  textSize(16);
  text("SETA PARA CIMA: Voar/Pular", width / 2, height * 0.89);
  text("Desvie dos obstáculos e sobreviva!", width / 2, height * 0.93);
}

// ==================== TELA GAME OVER ====================
function telaGameOver() {
  background("rgba(123, 204, 255, 1)");
  desenharNuvensGameOver();
  imageMode(CENTER);
  
  let imgWidth = imgGameOver.width * 0.4;
  let imgHeight = imgGameOver.height * 0.4;
  
  if (imgWidth > width * 0.8) {
    let ratio = (width * 0.8) / imgWidth;
    imgWidth *= ratio;
    imgHeight *= ratio;
  }
  
  image(imgGameOver, width / 2, height / 2 - 50, imgWidth, imgHeight);
  drawBotaoReiniciar();
  imageMode(CORNER);
}

function drawBotaoReiniciar() {
  let btnX = width / 2;
  let btnY = height * 0.85;
  let btnWidth = 200;
  let btnHeight = 50;
  
  let mouseOver = mouseX > btnX - btnWidth/2 && 
                  mouseX < btnX + btnWidth/2 && 
                  mouseY > btnY - btnHeight/2 && 
                  mouseY < btnY + btnHeight/2;
  
  fill(mouseOver ? color(255, 200, 0) : color(255, 165, 0));
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  rect(btnX, btnY, btnWidth, btnHeight, 10);
  
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text("JOGAR NOVAMENTE", btnX, btnY);
  
  rectMode(CORNER);
}

// ==================== FUNÇÕES PARA NUVENS NAS TELAS ====================
function desenharNuvensInicio() {
  if (!imgNuvem) return;
  
  imageMode(CORNER);
  
  // Nuvens nas telas mantêm o tamanho ORIGINAL
  let nuvemSize1 = 0.15;
  let nuvemSize2 = 0.2;
  let nuvemSize3 = 0.18;
  let nuvemSize4 = 0.12;
  
  // Nuvem 1 - Canto superior esquerdo
  image(imgNuvem, width * 0.05, height * 0.1, 
        imgNuvem.width * nuvemSize1, imgNuvem.height * nuvemSize1);
  
  // Nuvem 2 - Meio superior
  image(imgNuvem, width * 0.3, height * 0.15, 
        imgNuvem.width * nuvemSize2, imgNuvem.height * nuvemSize2);
  
  // Nuvem 3 - Canto superior direito
  image(imgNuvem, width * 0.7, height * 0.2, 
        imgNuvem.width * nuvemSize3, imgNuvem.height * nuvemSize3);
  
  // Nuvem 4 - Lado esquerdo, abaixo da área principal
  image(imgNuvem, width * 0.15, height * 0.6, 
        imgNuvem.width * nuvemSize4, imgNuvem.height * nuvemSize4);
}

function desenharNuvensVitoria() {
  if (!imgNuvem) return;
  
  imageMode(CORNER);
  
  let nuvemSize1 = 0.18;
  let nuvemSize2 = 0.15;
  let nuvemSize3 = 0.22;
  let nuvemSize4 = 0.14;
  
  // Nuvem 1 - Canto superior esquerdo (longe da abelha)
  image(imgNuvem, width * 0.02, height * 0.05, 
        imgNuvem.width * nuvemSize1, imgNuvem.height * nuvemSize1);
  
  // Nuvem 2 - Meio superior direito (acima da árvore)
  image(imgNuvem, width * 0.75, height * 0.08, 
        imgNuvem.width * nuvemSize2, imgNuvem.height * nuvemSize2);
  
  // Nuvem 3 - Lado direito (abaixo do botão)
  image(imgNuvem, width * 0.82, height * 0.7, 
        imgNuvem.width * nuvemSize3, imgNuvem.height * nuvemSize3);
  
  // Nuvem 4 - Canto inferior esquerdo (abaixo do texto)
  image(imgNuvem, width * 0.05, height * 0.75, 
        imgNuvem.width * nuvemSize4, imgNuvem.height * nuvemSize4);
}

function desenharNuvensGameOver() {
  if (!imgNuvem) return;
  
  imageMode(CORNER);
  
  let nuvemSize1 = 0.2;
  let nuvemSize2 = 0.16;
  let nuvemSize3 = 0.18;
  let nuvemSize4 = 0.14;
  
  // Nuvem 1 - Canto superior esquerdo
  image(imgNuvem, width * 0.08, height * 0.1, 
        imgNuvem.width * nuvemSize1, imgNuvem.height * nuvemSize1);
  
  // Nuvem 2 - Acima da imagem de game over
  image(imgNuvem, width * 0.35, height * 0.05, 
        imgNuvem.width * nuvemSize2, imgNuvem.height * nuvemSize2);
  
  // Nuvem 3 - Canto superior direito
  image(imgNuvem, width * 0.78, height * 0.15, 
        imgNuvem.width * nuvemSize3, imgNuvem.height * nuvemSize3);
  
  // Nuvem 4 - Lado esquerdo (abaixo do botão)
  image(imgNuvem, width * 0.1, height * 0.7, 
        imgNuvem.width * nuvemSize4, imgNuvem.height * nuvemSize4);
}

// ==================== CONTROLE DE CLIQUE DO MOUSE ====================
function mousePressed() {
  if (estadoJogo === "inicial") {
    let btnX = width / 2;
    let btnY = height * 0.75;
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
    let btnY = height * 0.85;
    let btnWidth = 200;
    let btnHeight = 50;
    
    if (mouseX > btnX - btnWidth/2 && 
        mouseX < btnX + btnWidth/2 && 
        mouseY > btnY - btnHeight/2 && 
        mouseY < btnY + btnHeight/2) {
      reiniciarJogo();
    }
  } else if (estadoJogo === "vitoria") {
    let btnX = width / 2;
    let btnY = height * 0.88;
    let btnWidth = 220;
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
  vidas = 3;
  estadoJogo = "jogando";
  invencivel = false;
  colFlor = false;
  colApicultor = false;
  colHomem = false;
  jogoGanho = false;
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