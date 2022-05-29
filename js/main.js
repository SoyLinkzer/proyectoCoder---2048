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




/*---------Declaracion e inicializacion de las variables principales---------*/

//defino el tamaño de la matriz
const LADO = 4;
//defino variables de usuario
let puntuacion = 0;
let usuarioLS = localStorage.getItem('jugador');
let nombreUsuario = usuarioLS? usuarioLS.nombre : 'Default';
const dataUsuario = {nombre: nombreUsuario, puntuacion: puntuacion};
//Defino elementos html
let pantallaHTML = document.getElementById("pantalla");
let puntuacionHTML = document.getElementById("puntuacion");
let btnUsuarioHTML = document.getElementById("botonUsuario");
let inputUsuarioHTML = document.getElementById("nombreUsuario")
let interfazHTML = document.getElementById("interfaz");
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




/* ------------------- Funciones ------------------------ */

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
    let puntosTotales = calcularPuntuacion(matriz);
    elementoHTML.innerText = `Puntuacion: ${puntosTotales}`;
    dataUsuario.puntuacion = puntosTotales;
    console.log(dataUsuario);
    guardarLocal(dataUsuario,"jugador");
};

const getRandomInt = (min, max)=>{
    return Math.floor(Math.random() * (max - min)) + min;
}

const eliminarVacios = (matriz)=>{
    let lastIndex = -1;
    for(let i = 0; i<matriz.length; i++){
        if(matriz[i].length===0){matriz[i] = 0}
    }
    do{
        lastIndex = matriz.lastIndexOf(0);
        if(lastIndex !== -1) matriz.splice(lastIndex,1);
    }while(lastIndex != -1);
    return matriz;
};

const aparecerRandom = (matriz)=>{
    let arrayAux; 
    let casillaAux;
    let index;
    //Obtengo solo filas con valores = 0
    matriz = matriz.map(fila=>{
        return fila.filter(columna=>(columna.valor === 0));
    });
    matriz = eliminarVacios(matriz);
    if(matriz.length !== 0){
        arrayAux = matriz[getRandomInt(0,matriz.length)];
        casillaAux = arrayAux[getRandomInt(0,arrayAux.length)];
        casillaAux.valor = 2;
        casillaAux.actualizarCasilla();
    }else{
        alert("Perdiste...");
    }
};

const actualizarTotal = (matrizAActualizar,elementoHTML)=>{
    actualizarCasillasHTML(matrizAActualizar);
    actualizarPuntuacion(matrizAActualizar,elementoHTML);
    aparecerRandom(matrizAActualizar);
};

const guardarLocal = (objeto,campo)=>{
    localStorage.setItem(campo, JSON.stringify(objeto));
};

actualizarUsuario = (e)=>{
    let parrafoUsuario = document.createElement('p');
    let hrHTML = document.getElementById('separador');
    dataUsuario.nombre = inputUsuarioHTML.value;
    interfazHTML.insertBefore(parrafoUsuario,hrHTML);
    parrafoUsuario.innerText = dataUsuario.nombre;
    inputUsuarioHTML.remove();
    btnUsuarioHTML.remove();
    guardarLocal(dataUsuario,"jugador");
};

/*-----------------------------"Ciclo" de juego-----------------------------*/

if(dataUsuario.nombre !== 'Default'){actualizarUsuario()}

let casillasNumAux;

aparecerRandom(casillas);

btnUsuarioHTML.addEventListener('click',actualizarUsuario);

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