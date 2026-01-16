class Sol extends Base {
  constructor(x, y, tamanho, altura, largura, img) {
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
    this.img.resize(0, this.altura);
  }

  mostrar() {
    push();
    
    // Efeito de brilho
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = "yellow";
    
    // Desenha o sol na posição atual (com parallax)
    image(this.img, this.x - 15, this.y, this.largura, this.altura);
    
    pop();
  }
}




/*class Sol{
    constructor(x, y, tamanho, altura, largura, img){
        this.x = x;
        this.y = y;
        this.tamanho = tamanho;
        this.altura = altura;
        this.largura = largura;
        this.img = img;
        this.img.resize(0, this.altura);
        
    }

    mostrar(){
        push();

  
  drawingContext.shadowBlur = 40;      //efeito fechaçao pro nosso sol
  drawingContext.shadowColor = "yellow"; //o 1 muda a intensidade e o 2 a cor
  image(this.img, this.x - 15, this.y );

  pop();
}
}*/