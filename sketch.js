let velocidadeMundo = 3;
let abelha, florInimigo, apicultor, homem, sol;
let imgBel, imgFlor, imgApi, imgHomem, imgSol, imgPlat;
let plataformas = [];
let larguraPlat = 1536;
let alturaPlat = 198;
let npcs = [];

// variáveis para debug
let colFlor = false, colApicultor = false, colHomem = false, abelhaCaiu = false;

function preload() {
  imgBel = loadImage("img/bel-sm.png");
  imgFlor = loadImage("img/flor.png");
  imgApi = loadImage("img/apicultor.png");
  imgHomem = loadImage("img/homi.png");
  imgSol = loadImage("img/sol.png");
  imgPlat = loadImage("img/plataforma.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let topoPlat = height - imgPlat.height;
  
  // Abelha - posição FIXA na tela (30% da largura)
  abelha = new Abelha(width * 0.3, 100, 0.5, 0, 10, imgBel, topoPlat);

  // NPCs - posições iniciais no mundo
  let alturaFlor = imgFlor.height * 0.18;
  florInimigo = new Flor(700, topoPlat - alturaFlor, alturaFlor, 100, imgFlor, 2);

  let alturaApi = imgApi.height * 0.6;
  apicultor = new Apicultor(1000, topoPlat - alturaApi, 800, 60, 70, 2, imgApi);

  let alturaHomem = imgHomem.height * 0.6;
  homem = new Homem(1500, topoPlat - alturaHomem, 500, 60, 70, 2, imgHomem);

  sol = new Sol(1100, 50, 300, 150, 100, imgSol);

  // Array de NPCs
  npcs = [florInimigo, apicultor, homem, new Flor(2000, topoPlat - alturaFlor, alturaFlor, 100, imgFlor, 2)];
 
  // Cria plataformas
  let x = -800;
  let mundoLargura = windowWidth * 10;
  while (x < mundoLargura) {
    plataformas.push(new Plataforma(x, topoPlat, 1, imgPlat.height, larguraPlat, imgPlat));
    x += larguraPlat;
  }
}

function draw() {
  background("rgba(123, 204, 255, 1)");

  // ========== ATUALIZAÇÕES ==========
  // 1. Abelha (só vertical)
  abelha.moverVertical();
  abelhaCaiu = abelha.caiu();
  
  // 2. Atualiza colisões
  colFlor = abelha.colidiu(florInimigo);
  colApicultor = abelha.colidiu(apicultor);
  colHomem = abelha.colidiu(homem);
  
  // 3. MUNDO se move
  // Plataformas
  for (let plat of plataformas) {
    plat.x -= velocidadeMundo;
    
    // Reposiciona quando sai da tela (sistema de loop)
    if (plat.x + plat.largura < 0) {
      plat.x += larguraPlat * plataformas.length;
    }
  }
  
  // NPCs
  for (let i = npcs.length - 1; i >= 0; i--) {
    let npc = npcs[i];
    npc.x -= velocidadeMundo;
    
    // Remove NPCs que saíram da tela
    if (npc.x + npc.largura < 0) {
      npcs.splice(i, 1);
    }
    
    // Verifica colisão (após o movimento)
    if (abelha.colidiu(npc)) {
      npcs.splice(i, 1);
    }
  }
  
  // Sol (parallax - move mais devagar)
  sol.x -= velocidadeMundo * 0.2;
  
  // ========== DESENHO ==========
  // Desenha plataformas
  for (let plat of plataformas) {
    plat.mostrar();
  }
  
  // Desenha NPCs
  for (let npc of npcs) {
    npc.mostrar();
  }
  
  // Desenha sol
  sol.mostrar();
  
  // Desenha abelha (posição fixa na tela)
  abelha.mostrar();
  
  // ========== HUD ==========
  desenharMostrador(10, height - 100);
  
  // Debug
  fill(0);
  text(`Abelha (tela): (${abelha.x.toFixed(0)}, ${abelha.y.toFixed(0)})`, 10, 30);
  text(`Velocidade: ${velocidadeMundo}`, 10, 50);
  text(`NPCs: ${npcs.length}`, 10, 70);
  text(`Plataformas: ${plataformas.length}`, 10, 90);
}

function desenharMostrador(x, y) {
  fill(0);            
  noStroke();
  textSize(14);
  text(`Colidiu com flor: ${colFlor}`, x, y);
  text(`Colidiu com apicultor: ${colApicultor}`, x, y + 20);
  text(`Colidiu com homem: ${colHomem}`, x, y + 40);
  text(`Caiu: ${abelhaCaiu}`, x, y + 60);
  text(`velY: ${abelha.velY.toFixed(1)}`, x, y + 80);
}

// Função para aumentar/diminuir velocidade (opcional)
function keyPressed() {
  if (key === '+') {
    velocidadeMundo += 0.5;
  }
  if (key === '-') {
    velocidadeMundo = max(velocidadeMundo - 0.5, 0.5);
  }
}


/*let abelha, florInimigo, apicultor, homem, sol;
let imgBel, imgFlor, imgApi, imgHomem, imgSol, imgPlat;
let plataformas = [];
let larguraPlat = 1536;
let alturaPlat = 198;
let florAltura = 100; 
let florLargura = 80;
let camera = { x: 0, y: 0 }; // Objeto câmera global
let npcs = [];
let offsetChao = 50;

// variáveis para debug
let colFlor = false, colApicultor = false, colHomem = false, abelhaCaiu = false;
//------------------------------------------------------------------------------


function preload() {
  imgBel = loadImage("img/bel-sm.png");
  imgFlor = loadImage("img/flor.png");
  imgApi = loadImage("img/apicultor.png");
  imgHomem = loadImage("img/homi.png");
  imgSol = loadImage("img/sol.png");
  imgPlat = loadImage("img/plataforma.png");
}
//-----------------------------------------------------------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);

  let topoPlat = height - imgPlat.height 

  // Criar abelha passando a referência da câmera
  abelha = new Abelha(50, 100, 0.5, 4, 10, imgBel, topoPlat, camera);

  let alturaFlor = imgFlor.height * 0.18;
  florInimigo = new Flor(700, topoPlat - alturaFlor, alturaFlor, 100, imgFlor, 2);

  let alturaApi = imgApi.height * 0.6;
  apicultor = new Apicultor(1000, topoPlat - alturaApi, 800, 60, 70, 2, imgApi);

  let alturaHomem = imgHomem.height * 0.6;
  homem = new Homem(1500, topoPlat - alturaHomem, 500, 60, 70, 2, imgHomem);

  sol = new Sol(1100, 50, 300, 150, 100, imgSol);

  npcs = [florInimigo, apicultor, homem, new Flor(2000, topoPlat - alturaFlor, alturaFlor, 100, imgFlor, 2)];
 
  // Criar plataformas para um mundo maior
  let x = -800;
  let y = topoPlat;
  let mundoLargura = windowWidth * 10;
  while (x < mundoLargura) {
    plataformas.push(new Plataforma(x, topoPlat, 1, imgPlat.height, larguraPlat, imgPlat));
    x += larguraPlat;
  }
}

//-----------------------------------------------------------------------------------------------------------------------------------

function draw() {
  background("rgba(123, 204, 255, 1)");

  // ========== TESTE SIMPLES ==========
  // 1. A câmera se move (mundo desliza para esquerda)
  
   const velocidadeJogo = 4;
  camera.x += velocidadeJogo;
  
  
  // 2. A abelha fica FIXA na posição 200px da esquerda da TELA
  const posicaoAbelhaNaTela = width * 0.3; // 30% da tela
  abelha.x = camera.x + posicaoAbelhaNaTela;
  
  
  // 3. Movimento vertical normal
  abelha.moverVertical();
  abelhaCaiu = abelha.caiu();

  // 4. Atualizar colisões
  colFlor = abelha.colidiu(florInimigo);
  colApicultor = abelha.colidiu(apicultor);
  colHomem = abelha.colidiu(homem);

  // 5. Aplicar transformação da câmera
  push();
  translate(-camera.x, 0);

  // Desenhar plataformas
  for (let plat of plataformas) {
    plat.mostrar();
  }

  // Desenhar NPCs
  for (let i = npcs.length - 1; i >= 0; i--) {
    let npc = npcs[i];
    npc.mostrar();
    if (abelha.colidiu(npc)) npcs.splice(i, 1);
  }

  // Desenhar sol e abelha
  sol.mostrar();
  
  // ========== DEBUG VISUAL ==========
 fill(0);
  textSize(12);
  text(`Velocidade: ${velocidadeJogo}`, 10, 30);
  text(`Camera: ${camera.x.toFixed(0)}`, 10, 50);
  text(`Abelha na tela: ${posicaoAbelhaNaTela.toFixed(0)}px`, 10, 70);
  
  // Desenha a abelha
  abelha.mostrar();
  
  pop();


  // ========== HUD E DEBUG ==========
  desenharMostrador(10, height - 100);
  
//------------------------------------------------------------------------------------  
  
  
}
function desenharMostrador(x, y) {
  textSize(14);
  fill(0);
  text(`Colidiu com flor: ${colFlor}`, x, y);
  text(`Colidiu com apicultor: ${colApicultor}`, x, y + 20);
  text(`Colidiu com homem: ${colHomem}`, x, y + 40);
  text(`Caiu: ${abelhaCaiu}`, x, y + 60);
  text(`velY: ${abelha.velY.toFixed(1)}`, x, y + 80);
}
























/*let abelha, florInimigo, apicultor, homem, sol;
let imgBel, imgFlor, imgApi, imgHomem, imgSol, imgPlat;
let plataformas = [];
let larguraPlat = 1536;
let alturaPlat = 198;
let florAltura = 100; 
let florLargura = 80;
let cameraX = 0;
let npcs = [];

// variáveis para debug
let colFlor = false, colApicultor = false, colHomem = false, abelhaCaiu = false;


function preload() {
  imgBel = loadImage("img/bel-sm.png");
  imgFlor = loadImage("img/flor.png");
  imgApi = loadImage("img/apicultor.png");
  imgHomem = loadImage("img/homi.png");
  imgSol = loadImage("img/sol.png");
  imgPlat = loadImage("img/plataforma.png");
  
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  let topoPlat = height - imgPlat.height;

  // Adicionar a velocidade vertical e manter a horizontal
  // Adicionar a gravidade
  
 
  let alturaFlor = imgFlor.height * 0.18;
  florInimigo = new Flor(700, topoPlat - alturaFlor, alturaFlor, 100, imgFlor, 2);

  let alturaApi = imgApi.height * 0.6;
  apicultor = new Apicultor(1000, topoPlat - alturaApi, 800, 60, 70, 2, imgApi);

  let alturaHomem = imgHomem.height * 0.6;
  homem = new Homem(1500, topoPlat - alturaHomem, 500, 60, 70, 2, imgHomem);

  sol = new Sol(1100, 50, 300, 150, 100, imgSol);

  abelha = new Abelha(50, 100, 0.5, 4, 10, imgBel, topoPlat);

  npcs = [florInimigo, apicultor, homem, new Flor(2000, topoPlat - alturaFlor, alturaFlor, 100, imgFlor, 2)];
 
  let x = -800;
  let y = topoPlat;
  while (x < windowWidth * 10) {
  plataformas.push(new Plataforma(x, topoPlat, 1, imgPlat.height, larguraPlat, imgPlat));
  x += larguraPlat;
  }
  }

  
function draw() {
  background("rgba(123, 204, 255, 1)");

  abelha.moverHorizontal();
  abelha.moverVertical();
  abelhaCaiu = abelha.caiu();

  // atualizaçao da camera
  cameraX = -abelha.x + 120;

  push();
  translate(cameraX, 0);

  // chao
  for (let plat of plataformas) {
    plat.mostrar();
    line(0, windowHeight - 1, width, height - 1);
  }

  // desenhando cada personagem
  for (let i = npcs.length - 1; i >= 0; i--) {
    let npc = npcs[i];
    npc.mostrar();
    if (abelha.colidiu(npc)) npcs.splice(i, 1);
  }

  sol.mostrar();
  abelha.mostrar();

  pop();

  // plaquinha
  desenharMostrador(10, height - 100);
}



/*
function draw() {
  background("rgba(123, 204, 255, 1)");
  push();
  translate(cameraX, 0); //usamos o translate para que tudo apos ele seja deslocado junto a nossa camera
  abelha.mostrar();
  abelha.moverHorizontal();
  abelha.moverVertical();
  abelhaCaiu = abelha.caiu();

  
  for (let plat of plataformas) {
    plat.mostrar();
   
    line(0, windowHeight - 1, width, height - 1);
  }

  for(let i = npcs.length - 1; i >= 0; i--){
    let npc = npcs[i];

    npc.mostrar();
    
    if (abelha.colidiu(npc)) {
      npcs.splice(i, 1)
    }

  }

  cameraX = -abelha.x + 120;
 // abelha.gravidadeAbelha();



  sol.mostrar();
  

  
  pop();
  desenharMostrador(10, height - 100);
  
}

function desenharMostrador(x, y) {
  textSize(14)
  text(`Colidiu com flor: ${colFlor}`, x, y);
  text(`Colidiu com apicultor: ${colApicultor}`, x, y + 20);
  text(`Colidiu com homem: ${colHomem}`, x, y + 40);
  text(`Caiu: ${abelhaCaiu}`, x, y + 60);
  text(`velY: ${abelha.velY}`, x, y + 80);
}





/* IMPORTANTE
Se:
topoPlat = windowHeight - alturaPlat   // topo da imagem da plataforma

e se a borda decorativa tem bordaDecorativa px contados do topo para baixo,
então:

pisoReal = topoPlat + bordaDecorativa
posY_personagem = pisoReal - alturaPersonagem
*/