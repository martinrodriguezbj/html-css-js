//inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1=null;
let tarjeta2=null;
let primerResultado=null;
let segundoResultado=null;
let movimientos=0;
let aciertos=0;
let temporizador=false;
let timer = 30;
let tiempoRegresivoId=null;
let timerInicial = 30;

//apuntando a documentos HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

//generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>Math.random()-0.5);
console.log(numeros);

//funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = "Tiempo: "+timer+" segundos";
        if(timer==0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            mostrarTiempo.innerHTML = "Se te acabo el tiempo, perdiste";
        }
    },1000)
}

function bloquearTarjetas(){
    for(let i=0;i<16;i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i]
        tarjetaBloqueada.disabled=true;
    }
}

function reiniciarJuego(){
    clearInterval(tiempoRegresivoId);

    //inicializacion de variables
    tarjetasDestapadas = 0;
    tarjeta1=null;
    tarjeta2=null;
    primerResultado=null;
    segundoResultado=null;
    movimientos=0;
    aciertos=0;
    temporizador=false;
    timer = 30;
    tiempoRegresivoId=null;
    timerInicial = 30;

    //apuntando a documentos HTML
    mostrarMovimientos.innerHTML='Movimientos: '+movimientos;
    mostrarAciertos.innerHTML='Aciertos: '+aciertos;
    mostrarTiempo.innerHTML = "Tiempo: "+timer+" segundos";

    //generacion de numeros aleatorios
    numeros = numeros.sort(()=>Math.random()-0.5);
    console.log(numeros);

    for(let i=0;i<16;i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = " ";
        tarjetaBloqueada.disabled=false;
    }
}

//funcion principal
function destapar(id){

    if(temporizador==false){
        contarTiempo();
        temporizador=true;
    }
    
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas==1){
        //mostrar el primer numero
        tarjeta1=document.getElementById(id);
        primerResultado=numeros[id];
        tarjeta1.innerHTML=primerResultado;

        //desabilitar el boton
        tarjeta1.disabled=true;
    }else if(tarjetasDestapadas==2){
        //mostrar segundo numero
        tarjeta2=document.getElementById(id);
        segundoResultado=numeros[id];
        tarjeta2.innerHTML=segundoResultado; 

        //desabilitar el boton
        tarjeta2.disabled=true;
        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML='Movimientos: '+movimientos;

        //comparar resultados
        if(primerResultado==segundoResultado){
            //encerar contador de tarjetas destapadas
            tarjetasDestapadas=0;
            //aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML='Aciertos: '+aciertos;
            
            if(aciertos==8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML='Aciertos: '+aciertos+' Ganaste';
                mostrarTiempo.innerHTML = "Fantastico! solo te demoraste "+(TimerInicial-timer)+" segundos";
                mostrarMovimientos.innerHTML='Movimientos: '+movimientos;
            }
        }else{
            //mostrar momentanemente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = " ";
                tarjeta2.innerHTML = " ";
                tarjeta1.disabled=false;
                tarjeta2.disabled=false;
                tarjetasDestapadas=0;
            },800)
        }
    }
}