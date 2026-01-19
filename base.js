class Base { //classe que serve de base para as outras, pois tem funcionalidades fundamentais para os objetos do jogo
  constructor(x, y, altura, largura, img) {
    this.x = x;
    this.y = y;
    this.altura = altura;
    this.largura = largura;
    this.img = img;
    
  }

  mostrar() {
    image(this.img, this.x, this.y, this.largura, this.altura);
  }

}