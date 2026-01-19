class Sol extends Base { //herda de base
  constructor(x, y, tamanho, altura, largura, img) {
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
    this.alturaDesejada = altura;
    this.larguraDesejada = largura;
  }

  mostrar() {
    push();
    
    // Efeito de brilho
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = "yellow";
   
    image(this.img, this.x - 15, this.y, this.larguraDesejada, this.alturaDesejada);
    
    pop();
  }
}