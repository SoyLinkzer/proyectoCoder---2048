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
    actualizarCasilla(){
        this.casillaHTML.innerText = this.valor;
    }
}
  
//defino el tamaño de la matriz
const LADO = 4;
let puntuacion = 0;

let pantallaHTML = document.getElementById("pantalla");
let puntuacionHTML = document.getElementById("puntuacion");

//inicializar matriz de casillas
let casillas = [];
for(let i = 0; i<LADO; i++){
    casillas.push([]);
    for(let j = 0; j<LADO; j++){
        casillas[i].push(new casilla(0,[i,j],document.createElement("div")));
        //casillas[i].push(new casilla(i+"."+j,[i,j],document.createElement("div")));
        casillas[i][j].dibujarse(pantallaHTML,'casilla');
    }
}

//console.log(casillas);

const sumarArrayAIzquierda = (cadena)=>{
    /*
        Partiendo del inicio de un array numerico,
        llevara todos los elementos hacia la "izquierda".
        En caso de ser 0 el valor del cual parte se sumara,
        en caso de no serlo solo se sumara si ambos son de igual valor.
    */ 
    let long = cadena.length;
    for(let i = 0; i < long; i++){
        for(let j = i+1; j<long; j++){
            if(cadena[j] !== 0 ){
                if(cadena[i] === 0 || cadena[i] === cadena[j]){
                    cadena[i] += cadena[j];
                    cadena[j] = 0;
                }else{
                    break;
                }
            }
        } 
    }
    return cadena;
};

//Aplica la funcion anterior a una matriz numerica
const moverCasillas = (matrizAMover)=>{
    matrizAMover.forEach((e)=>{
        e = sumarArrayAIzquierda(e);
    });
    return matrizAMover;
};

//Devuelve una matriz numerica basada en los valores de la matriz de objetos para mantener las anteriores funciones genericas
const mObjetosToMNumeros = (matrizObjetos)=>{
    let matrizAux = [];
    let arrayAux = [];
    matrizObjetos.forEach(fila=>{
        fila.forEach(columna=>{
            arrayAux.push(columna.valor);
        });
        matrizAux.push(arrayAux);
        arrayAux = [];
    });
    return  matrizAux;
};

//Actualiza los valores de la matriz de objetos con los calculados utilizando sus valores
const actualizarValores = (matrizObjetos, matrizNumeros)=>{
    for(let i = 0 ; i<matrizObjetos.length ; i++){
        for(let j = 0; j<matrizObjetos[i].length; j++){
            matrizObjetos[i][j].valor = matrizNumeros[i][j];
        }
    }
    return matrizObjetos;
};

//Actualiza los datos de las casillas en el html
const actualizarCasillasHTML = (matrizCasillas)=>{
    matrizCasillas.forEach(fila=>{
        fila.forEach(columna=>{
            columna.actualizarCasilla();
        })
    })
};

//Da vuelta las cadenas dentro de la "matriz"
const revertirMatriz = (matrizARevertir)=>{
    matrizARevertir.forEach(fila=>{
        fila.reverse();
    });
    return matrizARevertir;
};

//Manteniendo los valores en su "lugar", pasa las filas a columnas y viceversa 
const filasAColumnas = (matrizATransformar)=>{
    let matrizAux = [];
    matrizATransformar.forEach(()=>matrizAux.push([]));
    for(let i = 0 ; i<matrizATransformar.length ; i++){
        for(let j = 0; j<matrizATransformar[i].length; j++){
            matrizAux[j].push(matrizATransformar[i][j]);
        }
    }
    return matrizAux;
};

const calcularPuntuacion = (matrizASumar)=>{
    //revisa el total de las casillas, determina la puntuacio, y la actualiza en el html
    let total = 0;
    matrizASumar.forEach((fila=>{
        fila.forEach(columna=>{
            total += columna.valor;
        })
    }));
    return total;
}

const actualizarPuntuacion = (matriz,elementoHTML)=>{
    elementoHTML.innerText = `Puntuacion: ${calcularPuntuacion(matriz)}`;
};

const getRandomInt = (min, max)=>{
    return Math.floor(Math.random() * (max - min)) + min;
}

const aparecerRandom = (matriz)=>{
    let arrayAux; 
    let casillaAux;
    //Obtengo solo filas con valores = 0
    matriz = matriz.map(fila=>{
        return fila.filter(columna=>(columna.valor === 0));
    });
    matriz += matriz.forEach(fila=>{
        return 
    });
    console.log(matriz);
    if(matriz != [[],[],[],[]]){
        arrayAux = matriz[getRandomInt(0,matriz.length)];
        casillaAux = arrayAux[getRandomInt(0,arrayAux.length)];
        console.log(casillaAux);
        console.log(casillaAux.valor);
        casillaAux.valor = 2;
        casillaAux.actualizarCasilla();
        console.log(casillaAux.posicion);
    }else{
        alert("Perdiste :c");
    }
};

const actualizarTotal = (matrizAActualizar,elementoHTML)=>{
    actualizarCasillasHTML(matrizAActualizar);
    actualizarPuntuacion(matrizAActualizar,elementoHTML);
    aparecerRandom(matrizAActualizar);
};

//Algunas pruebas
//let matrizDePrueba = [[1,2,3,4],[4,3,2,1],[5,6,7,8],[8,7,6,5]];
//console.log(filasAColumnas(matrizDePrueba));
//console.log(casillasEjemplo);
//console.log(moverCasillas(casillasEjemplo));

let casillasNumAux;

aparecerRandom(casillas);

document.addEventListener('keydown',(t)=>{
    switch(t.key){
        case 'ArrowUp':
            casillasNumAux = moverCasillas(filasAColumnas(mObjetosToMNumeros(casillas)));
            casillas = actualizarValores(casillas,filasAColumnas(casillasNumAux));
            actualizarTotal(casillas,puntuacionHTML);
            break;
        case 'ArrowDown':
            casillasNumAux = moverCasillas(revertirMatriz(filasAColumnas(mObjetosToMNumeros(casillas))));
            casillas = actualizarValores(casillas,filasAColumnas(revertirMatriz(casillasNumAux)));
            actualizarTotal(casillas,puntuacionHTML);
            break;
        case 'ArrowLeft':
            casillas = actualizarValores(casillas,moverCasillas(mObjetosToMNumeros(casillas)));
            actualizarTotal(casillas,puntuacionHTML);
            break;
        case 'ArrowRight':
            casillasNumAux = moverCasillas(revertirMatriz(mObjetosToMNumeros(casillas)));
            casillas = actualizarValores(casillas,revertirMatriz(casillasNumAux));
            actualizarTotal(casillas,puntuacionHTML);
            break;
        default:
            break;
    }
});