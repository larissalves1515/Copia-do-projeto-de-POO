//Variaveis e arrays importantes para o jogo

let velocidadeMundo = 5;
let abelha, florInimigo, apicultor, homem, sol, arvore;
let imgBel, imgFlor, imgApi, imgHomem, imgSol, imgPlat, imgGameOver, imgTelaInicial, imgArvore, imgParabens, imgNuvem;
let larguraPlat = 1536;
let alturaPlat = 198;
let plataformas = [];
let npcs = [];
let nuvens = [];
let vidas = 3;
let maxVidas = 3;
let invencivel = false;
let tempoInvencivel = 0;
let estadoJogo = "inicial";
let jogoGanho = false;

//Para controle de colisão
let colFlor = false, colApicultor = false, colHomem = false, abelhaCaiu = false;

// Para animação da abelha na tela inicial, usamos:
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
  inicializarJogo(); //Configura os objetos do jogo
}

function inicializarJogo() {
  let topoPlat = height - imgPlat.height;
  jogoGanho = false;
// Delimitamos valores fixos para a altura dos personagens porque quando o jogo recarrega, evitamos alguns problemas de mudança de altura
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
  
  // Criamos nuvens com posições diferentes:
  
  nuvens = [];
  
  nuvens.push(new Nuvem(700, 40, 0.15, imgNuvem, 0.8)); 
  nuvens.push(new Nuvem(900, 90, 0.18, imgNuvem, 0.7)); 
  nuvens.push(new Nuvem(1300, 60, 0.16, imgNuvem, 1.0)); 
  nuvens.push(new Nuvem(1600, 30, 0.12, imgNuvem, 1.2)); 
  nuvens.push(new Nuvem(1900, 20, 0.10, imgNuvem, 1.1)); 

  //Criação dos NPCs com posições diferentes no mundo

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

  // Verificação do estado atual do jogo e redirecionamento para tela correspondente
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

  // Com o jogo em andamento, temos:
  // Colocamos um efeito onde o sol se move mais devagar que o mundo
  sol.x -= velocidadeMundo * 0.2;
  sol.mostrar();
  
  // Desenho das nuvens:
  for (let i = nuvens.length - 1; i >= 0; i--) {
    let nuvem = nuvens[i];
    nuvem.x -= nuvem.velocidade; //Movimentação conforme velocidade
    nuvem.mostrar();

    //Caso a nuvem saia da tela pela esquerda, a nuvem é reposicionada na direita
    if (nuvem.x + nuvem.largura < -100) {
      
      nuvem.x = width + random(300, 800);
      
      // Altura aleatoria
      if (random() > 0.5) {
        nuvem.y = random(20, 50); 
      } else {
        nuvem.y = random(60, 100); 
      }
      
      // Tamanho aleatorio e atualização da largura e altura
      nuvem.tamanho = random(0.10, 0.25); 
      nuvem.largura = imgNuvem.width * nuvem.tamanho;
      nuvem.altura = imgNuvem.height * nuvem.tamanho;
    }
  }


//Gravidade e movimento vertical
  abelha.moverVertical();
  abelhaCaiu = abelha.caiu();

  if (abelhaCaiu && !jogoGanho) {
    vidas = 0;
  }



  //Movimentação e desenho de plataformas
  for (let plat of plataformas) {
    plat.x -= velocidadeMundo; //para esquerda
    if (plat.x + plat.largura < 0) {
      plat.x += larguraPlat * plataformas.length;
    } //reposicionamento
    plat.mostrar();
  }

  //Movimentação e desenho dos NPCs
  for (let i = npcs.length - 1; i >= 0; i--) {
    let npc = npcs[i];
    npc.x -= velocidadeMundo; //movimentação para esquerda
    npc.mostrar();

    //Se tiver colisão com a arvore, o jogador venceu o jogo 
    if (npc === arvore && abelha.colidiu(npc)) {
      jogoGanho = true;
      estadoJogo = "vitoria";
      return;
    }
    
    //Verificação da colisão da abelha com os inimigos:
    
    if (!jogoGanho && abelha.colidiu(npc) && !invencivel && npc !== arvore) {
      vidas--; //remoção de uma vida
      invencivel = true; //abelha tem a invencibilidade porque o jogo continua
      tempoInvencivel = frameCount;
      npcs.splice(i, 1); //remoção do npc
    }
  }


  //Desativação da invencibilidade
  if (invencivel && frameCount - tempoInvencivel > 60) {
    invencivel = false;
  }

  abelha.mostrar();
  
  //Desenho dos corações que equivalem as vidas da abelha
  for (let i = 0; i < maxVidas; i++) {
    let cheio = i < vidas; //se a vida está cheia ou vazia
    desenharCoracao(40, 50 + i * 50, 0.6, cheio);
  }
  
  //Verificação de derrota (se as vidas acabaram)
  if (vidas <= 0 && !jogoGanho) {
    estadoJogo = "gameover";
  }
}


function telaVitoria() {
  background("rgba(123, 204, 255, 1)");
  desenharNuvensVitoria();
  imageMode(CENTER);
  textAlign(CENTER, CENTER);

  //Calculos do tamanho das imagens:
  let abelhaWidth = imgBel.width * 0.2;
  let abelhaHeight = imgBel.height * 0.2;
  let arvoreWidth = imgArvore.width * 0.22;
  let arvoreHeight = imgArvore.height * 0.22;
  
  //Posicionamentos:
  let centroX = width / 2;
  let arvoreY = height / 2 - 130;
  
  let espacamento = 20;
  let abelhaX = centroX - arvoreWidth/2 - abelhaWidth/2 - espacamento;
  let abelhaY = arvoreY + sin(frameCount * 0.05) * 8 + 15; /*esse efeito de voo é feito de acordo com o seno 
  (retornando entre -1 e 1) dos frames vezes a velocidade de oscilação, e depois multiplicado pela amplitude 
  do movimento, e somando com um deslocamento fixo.
  */

  image(imgBel, abelhaX, abelhaY, abelhaWidth, abelhaHeight);
  image(imgArvore, centroX, arvoreY, arvoreWidth, arvoreHeight);

  //Desenho da imagem de parabéns e o textinho debaixo (2 opções, com imagem ou sem)
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
  let btnX = width / 2; //btn --> button
  let btnY = height * 0.88;
  let btnWidth = 220;
  let btnHeight = 50;
  
  //Verificação de o mouse está sobre o botão
  let mouseOver = mouseX > btnX - btnWidth/2 && 
                  mouseX < btnX + btnWidth/2 && 
                  mouseY > btnY - btnHeight/2 && 
                  mouseY < btnY + btnHeight/2;
  //Botão e o efeito
  fill(mouseOver ? color(255, 215, 0) : color(255, 165, 0));
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  rect(btnX, btnY, btnWidth, btnHeight, 12);
  //Texto do botão
  fill(255);
  noStroke();
  textSize(18);
  text("JOGAR NOVAMENTE", btnX, btnY);
  
  rectMode(CORNER);
}


function telaInicial() {
  background("rgba(123, 204, 255, 1)");
  desenharNuvensInicio();
  imageMode(CENTER);
  
  //Cálculo de deslocamento da abelha (oscilação de 8 pixels pra cima e 8 pixels pra baixo)
  abelhaOffsetY = sin(abelhaAngle) * 8;
  abelhaAngle += 0.05; //rapidez da oscilação
  
  //Tamanho da imagem principal
  let imgWidth = imgTelaInicial.width * 0.35;
  let imgHeight = imgTelaInicial.height * 0.35;
  
  //Redimensionamento da imagem para a proporção da tela
  if (imgWidth > width * 0.5) {
    let ratio = (width * 0.5) / imgWidth;
    imgWidth *= ratio;
    imgHeight *= ratio;
  }
  
  let imgPrincipalX = width / 2;
  let imgPrincipalY = height / 2 - 80;
  image(imgTelaInicial, imgPrincipalX, imgPrincipalY, imgWidth, imgHeight);
  
  //Animação e posicionamento da abelha
  let abelhaSize = 0.35;
  let abelhaWidth = imgBel.width * abelhaSize;
  let abelhaHeight = imgBel.height * abelhaSize;
  
  let abelhaX = imgPrincipalX - imgWidth/2 - abelhaWidth/2 - 25;
  let abelhaY = imgPrincipalY + abelhaOffsetY;

  //Adicionamos essa rotação oscilante para a abelha
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
  //Verificação do mouse
  let mouseOver = mouseX > btnX - btnWidth/2 && 
                  mouseX < btnX + btnWidth/2 && 
                  mouseY > btnY - btnHeight/2 && 
                  mouseY < btnY + btnHeight/2;
  //Desenho do botão e do texto
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

function drawInstrucoesPequeno() {  //instruções:
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
 
  text("CONTROLES:", width / 2, height * 0.85);
  textSize(16);
  text("SETA PARA CIMA: Voar/Pular", width / 2, height * 0.89);
  text("Desvie dos obstáculos e sobreviva!", width / 2, height * 0.93);
}

function telaGameOver() {
  background("rgba(123, 204, 255, 1)");
  desenharNuvensGameOver();
  imageMode(CENTER);
  //Tamanho da imagem
  let imgWidth = imgGameOver.width * 0.4;
  let imgHeight = imgGameOver.height * 0.4;
  //Redimensionamento
  if (imgWidth > width * 0.8) {
    let ratio = (width * 0.8) / imgWidth;
    imgWidth *= ratio;
    imgHeight *= ratio;
  }
  
  image(imgGameOver, width / 2, height / 2 - 50, imgWidth, imgHeight);
  drawBotaoReiniciar();
  imageMode(CORNER);
}

function drawBotaoReiniciar() { //calculos também como nos outros botões
  let btnX = width / 2;
  let btnY = height * 0.85;
  let btnWidth = 200;
  let btnHeight = 50;
  
  let mouseOver = mouseX > btnX - btnWidth/2 && 
                  mouseX < btnX + btnWidth/2 && 
                  mouseY > btnY - btnHeight/2 && 
                  mouseY < btnY + btnHeight/2;
  //Botão
  fill(mouseOver ? color(255, 200, 0) : color(255, 165, 0));
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  rect(btnX, btnY, btnWidth, btnHeight, 10);
  //Texto
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text("JOGAR NOVAMENTE", btnX, btnY);
  
  rectMode(CORNER);
}

function desenharNuvensInicio() {
  if (!imgNuvem) return; //verifica o carregamento da imagem
  
  imageMode(CORNER);
  
  //Como temos um numero delimitado de nuvens, optamos por delimitar tambem os tamanhos
  let nuvemSize1 = 0.15;
  let nuvemSize2 = 0.2;
  let nuvemSize3 = 0.18;
  let nuvemSize4 = 0.12;
  let nuvemSize5 = 0.16; 
  
  //Desenho em posições diferentes
  image(imgNuvem, width * 0.05, height * 0.1, 
        imgNuvem.width * nuvemSize1, imgNuvem.height * nuvemSize1);
  
  image(imgNuvem, width * 0.3, height * 0.15, 
        imgNuvem.width * nuvemSize2, imgNuvem.height * nuvemSize2);

  image(imgNuvem, width * 0.7, height * 0.2, 
        imgNuvem.width * nuvemSize3, imgNuvem.height * nuvemSize3);
  
  image(imgNuvem, width * 0.15, height * 0.6, 
        imgNuvem.width * nuvemSize4, imgNuvem.height * nuvemSize4);
  
  image(imgNuvem, width * 0.85,  height * 0.8, 
        imgNuvem.width * nuvemSize5, imgNuvem.height * nuvemSize5);
}

function desenharNuvensVitoria() {
  if (!imgNuvem) return; //verifica o carregamento
  
  imageMode(CORNER);
  //Optamos por seguir o mesmo modelo das nuvens da tela inicial, só mudando alguns valores
  let nuvemSize1 = 0.18;
  let nuvemSize2 = 0.15;
  let nuvemSize3 = 0.22;
  let nuvemSize4 = 0.14;
  
  image(imgNuvem, width * 0.02, height * 0.05, 
        imgNuvem.width * nuvemSize1, imgNuvem.height * nuvemSize1);
  
  image(imgNuvem, width * 0.75, height * 0.08, 
        imgNuvem.width * nuvemSize2, imgNuvem.height * nuvemSize2);
  
  image(imgNuvem, width * 0.82, height * 0.7, 
        imgNuvem.width * nuvemSize3, imgNuvem.height * nuvemSize3);
  
  image(imgNuvem, width * 0.05, height * 0.75, 
        imgNuvem.width * nuvemSize4, imgNuvem.height * nuvemSize4);
}

function desenharNuvensGameOver() {
  if (!imgNuvem) return; //Verificação de carregamento
  
  imageMode(CORNER);
  
  let nuvemSize1 = 0.2;
  let nuvemSize2 = 0.16;
  let nuvemSize3 = 0.18;
  let nuvemSize4 = 0.14;
  
  //Também optamos pelo mesmo modelo
  image(imgNuvem, width * 0.08, height * 0.1, 
        imgNuvem.width * nuvemSize1, imgNuvem.height * nuvemSize1);
  
  image(imgNuvem, width * 0.35, height * 0.05, 
        imgNuvem.width * nuvemSize2, imgNuvem.height * nuvemSize2);
  
  image(imgNuvem, width * 0.78, height * 0.15, 
        imgNuvem.width * nuvemSize3, imgNuvem.height * nuvemSize3);
  
  image(imgNuvem, width * 0.1, height * 0.7, 
        imgNuvem.width * nuvemSize4, imgNuvem.height * nuvemSize4);
}


function mousePressed() { //controle dos cliques do mouse
  if (estadoJogo === "inicial") {
    let btnX = width / 2;
    let btnY = height * 0.75;
    let btnWidth = 220;
    let btnHeight = 55;
    
    //Verificação se o clique foi no botão "Iniciar Jogo"
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

    //Verificação se o clique foi no botão "Jogar novamente"
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
    
    //Verificação se o clique foi no botão "Jogar novamente"
    if (mouseX > btnX - btnWidth/2 && 
        mouseX < btnX + btnWidth/2 && 
        mouseY > btnY - btnHeight/2 && 
        mouseY < btnY + btnHeight/2) {
      reiniciarJogo();
    }
  }
}

function reiniciarJogo() { //basicamente reseta todas as variáveis do jogo
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
  //Desenha o coração de acordo com posição, escala e sem contorno.
  //E também define a aparencia de acordo com o estado (cheio ou vazio)
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

  beginShape(); //inicia o desenho personalizado do coração
  vertex(0, 0);
  bezierVertex(-20, -20, -40, 10, 0, 40);
  bezierVertex(40, 10, 20, -20, 0, 0);
  endShape(CLOSE);

  pop();
}

function keyPressed() { //controla o movimento de pulo da abelha com a tecla de seta pra cima
  if (estadoJogo === "jogando" && keyCode === UP_ARROW) {
    abelha.pular();
  }
}