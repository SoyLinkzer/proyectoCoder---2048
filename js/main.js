class casilla {
    constructor(valor,posicion,casillaHTML){
        this.valor = valor;
        this.posicion = posicion;
        this.casillaHTML = casillaHTML;
    }
    dibujarse(elemento,id){
        this.casillaHTML.innerHTML = this.valor;
        this.casillaHTML.className = id;
        elemento.append(this.casillaHTML);
    }
    sumarse(valorASumar){
        this.valor += valorASumar;
    }
    resetearValor(){
        this.valor = 0;
    }
}

//defino el tamaño de la matriz
const lado = 4;

let pantalla = document.getElementById("pantalla");

//inicializar matriz de casillas
let casillas = [];
for(let i = 0; i<lado; i++){
    casillas.push([]);
    for(let j = 0; j<lado; j++){
        casillas[i].push(new casilla(2,[i,j],document.createElement("div")));
        casillas[i][j].dibujarse(pantalla,'casilla');
    }
}