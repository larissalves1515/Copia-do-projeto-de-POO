let vidas = 3;
let velocidadeMundo = 3;
let abelha, florInimigo, apicultor, homem, sol;
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

  
 
  let alturaFlor = imgFlor.height * 0.18;
  florInimigo = new Flor(700, topoPlat - alturaFlor, alturaFlor, 100, imgFlor, 2);

  let alturaApi = imgApi.height * 0.6;
  apicultor = new Apicultor(1000, topoPlat - alturaApi, 800, 60, 70, 2, imgApi);

  let alturaHomem = imgHomem.height * 0.6;
  homem = new Homem(1500, topoPlat - alturaHomem, 500, 60, 70, 2, imgHomem);

  sol = new Sol(1100, 50, 300, 150, 150, imgSol);
  abelha = new Abelha(120, 100, 0.5, 0, 10, imgBel, topoPlat);


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

  
  sol.x -= velocidadeMundo * 0.2;
  sol.mostrar();

  abelha.moverVertical();
  abelhaCaiu = abelha.caiu();

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


//trem da colisao
    if (abelha.colidiu(npc)) {
     
  vidas--;
  npcs.splice(i, 1);
  if (vidas <= 0) noLoop();

  if (npc instanceof Flor) colFlor = true;
  if (npc instanceof Apicultor) colApicultor = true;
  if (npc instanceof Homem) colHomem = true;

  npcs.splice(i, 1);
}
  }

  abelha.mostrar();
  desenharVidas();


  desenharMostrador(10, height - 100);

  //tabelinha do debug
    fill(0);
  text(`Abelha (tela): (${abelha.x.toFixed(0)}, ${abelha.y.toFixed(0)})`, 10, 30);
  text(`Velocidade: ${velocidadeMundo}`, 10, 50);
  text(`NPCs: ${npcs.length}`, 10, 70);
  text(`Plataformas: ${plataformas.length}`, 10, 90);

}



function desenharMostrador(x, y) {
  fill(0);            
  noStroke();
  textSize(14)
  text(`Colidiu com flor: ${colFlor}`, x, y);
  text(`Colidiu com apicultor: ${colApicultor}`, x, y + 20);
  text(`Colidiu com homem: ${colHomem}`, x, y + 40);
  text(`Caiu: ${abelhaCaiu}`, x, y + 60);
  text(`velY: ${abelha.velY}`, x, y + 80);
}

function desenharVidas() {
  let tamanho = 35;
  let x = width - 150; // serve pra ajustar pra a tela
  let y = 40;
  
  for (let i = 0; i < 3; i++) {
   
    if (width < 500) { 
      x = width - 120;
      tamanho = 25;
    }
    
    let posX = x + i * (tamanho + 5);
    
    //coraçoes das vida
    if (i < vidas) {
      fill(255, 0, 0);
      textSize(tamanho);
      text("♥", posX, y);
    } else {
      fill(150);
      textSize(tamanho);
      text("♡", posX, y);
    }
  }
}





