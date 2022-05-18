//let nombre = prompt("Ingrese nombre del jugador");


const agregarValores = (primerLlamada) =>{
    //agrega los valores iniciales de las casillas que empezaran con un 2
}
const dibujarMatriz = ()=>{
    //dibuja la matriz de casillas en la pagina usando el metodo dibujarse de cada objeto casilla, por ahora solo mostrara los valores
    casillas.forEach((element) => console.log(element));
}
//Funcion que mueve el total se las casillas a la izquierda, la idea es generalizarla (en lo posible) para las demas direcciones
const moverCasillasIzquierda = ()=>{
    for(let fila = 0; fila<lado; fila++){
        for(let columna = lado-1; columna>0; columna--){
            for(let casillaColumnaActual = columna-1; casillaColumnaActual>=0; casillaColumnaActual--){
                if(casillas[casillaColumnaActual][fila].valor === 0){
                    continue;
                }else{
                    if(casillas[columna][fila].valor === casillas[casillaColumnaActual][fila].valor){
                        //una vez encontrada una casilla con valor con la cual sumarse, setea el valor de la misma a 0
                        casillas[columna][fila].sumarse(casillas[casillaColumnaActual][fila].valor);
                        casillas[casillaColumnaActual][fila].resetearValor();
                        //debido a que al ser 0 suma con el siguiente y continua el cicle, el siguiente a este no se suma con el mismo
                        //es un bug a arreglar, todos lo que au no se sumaron con algo mayor a 0 deberian sumarse tambien mientras sean el mismo numero
                    }
                    break;
                }
            }
        }
    }
}

const actualizarPuntuacion = ()=>{
    //revisa el total de las casillas, determina la puntuacio, y la actualiza en el html
    let total = 0;
    for (const columna of casillas) {
        for (const casilla of columna) {
            total += casilla.valor;
        }
    }
    console.log(total);
}

let eleccion = '';
do{
    //agregarValores();
    dibujarMatriz(casillas);
    //la idea es que el input luego sea sin el prompt, por presionar las felchas unicamente
    eleccion = prompt(`Ingrese eleeccion:
    -Arriba
    -Abajo
    -Izquierda
    -Derecha
    -Salir`).toLowerCase();
    switch(eleccion){
        case 'arriba':
            //mover cuadros arriba
            console.log("arriba");
            break;
        case 'abajo':
            //mover cuadros abajo
            console.log("abajo");
            break;
        case 'izquierda':
            //mover cuadros a la izquierda
            moverCasillasIzquierda();
            console.log("izquierda");
            break;
        case 'derecha':
            //mover cuadros a la derecha
            console.log("derecha");
            break;
        case 'salir':
            console.log("Salir");
    }
    actualizarPuntuacion();
}while(eleccion !== 'salir');
