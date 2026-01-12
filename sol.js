class Sol{
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
}