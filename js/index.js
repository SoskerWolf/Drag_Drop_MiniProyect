function Animal(nombre, numero) {
    this.nombre = nombre;
    this.numero = numero;
}
var Lista = [];
Lista.push(new Animal("Conejo",1));
Lista.push(new Animal("Tigre",2));
Lista.push(new Animal("Elefante",3));
Lista.push(new Animal("Gato",4));
Lista.push(new Animal("Lobo",5));
Lista.push(new Animal("Serpiente",6));
Lista.push(new Animal("Vaca",7));
Lista.push(new Animal("Delfin",8));
Lista.push(new Animal("Tucan",9));
Lista.push(new Animal("Pinguino",10));
var cont=0;
var part_1,part_2;
var vidas=0;
var segundos=0,minutos=0;
var time;

var lienzo = document.getElementById("Logo").getContext('2d');
var logo = new Image();
logo.src="../img/Logo.png";
logo.addEventListener("load",function(){lienzo.drawImage(logo,0,0,530,400);})

document.getElementById("Volver").addEventListener("click",Escoger);
document.getElementById("Jugar").addEventListener("click",function(){
    swal("Cual es tu nombre:", {
        content: "input",
      }).then((value) =>{
        if (`${value}`) {
            localStorage.setItem("Nombre",JSON.stringify(`${value}`));
            Escoger();
        }else{
        }
      });
      
});

function Escoger(){
    document.getElementById("estructura").style.display = "flex";
    document.getElementById("info").style.display = "flex";
    document.getElementById("contenedor").style.display = "flex";
    document.getElementById("Jugar").style.display = "none";
    document.getElementById("Volver").style.display = "none";
    document.getElementById("Logo").style.display = "none";
    document.getElementById("contenedor").style.backgroundImage ="";
    document.getElementById("jugador").innerHTML="Jugador: <br>"+JSON.parse(localStorage.getItem("Nombre"));
    vidas=3;
    segundos=0;
    minutos=0;
    IniciarTiempo();
    ActulizarVidas();
    let aux=Lista.slice();
    let elegir=[];
    let r=0;
    for (let i = 0; i < 6; i++) {
        r=Math.floor(Math.random()*(aux.length));
        elegir.push(aux.splice(r,1)[0]);
    }
    part_1=elegir.splice(0,3);
    part_2=elegir.slice();
    console.log(part_1);
    console.log(part_2);
    CrearTabla(part_1);
}

function CrearTabla(aux){
    let info="";
    let ids=[];
    for (let i = 0; i < aux.length; i++) {
        info+="<div class='hab'>";
        info+="<img id='"+aux[i].numero+"_h' src='../img/hab/"+aux[i].nombre+"_h.png' width=100% height=100% />";
        info+="<p id='"+aux[i].numero+"_t'></p></div>";
        ids.push(aux[i].numero+"_h");
    }
    document.getElementById("habitat").innerHTML=info;
    let hab_1 = document.getElementById(ids[0]);
    let hab_2 = document.getElementById(ids[1]);
    let hab_3 = document.getElementById(ids[2]);
    hab_1.addEventListener('dragover', eventoOver, false);
    hab_1.addEventListener('drop', soltado, false);
    hab_2.addEventListener('dragover', eventoOver, false);
    hab_2.addEventListener('drop', soltado, false);
    hab_3.addEventListener('dragover', eventoOver, false);
    hab_3.addEventListener('drop', soltado, false);
    console.log(ids[0],ids[1],ids[2]);
    info="";
    ids=[];
    let xua=[];
    let r=0;
    for (let i = 0; i < 3; i++) {
        r=Math.floor(Math.random()*(aux.length));
        xua.push(aux.splice(r,1)[0]);
    }
    for (let i = 0; i < xua.length; i++) {
        info+="<div class='ani'>";
        info+="<img id='"+xua[i].numero+"' src='../img/ani/"+xua[i].nombre+".png' width=100% height=100% />";
        info+="</div>";
        ids.push(xua[i].numero);
    }
    document.getElementById("animales").innerHTML=info;
    let ani_1 = document.getElementById(ids[0]);
    let ani_2 = document.getElementById(ids[1]);
    let ani_3 = document.getElementById(ids[2]);
    ani_1.addEventListener('dragstart', arrastrado, false);
    ani_2.addEventListener('dragstart', arrastrado, false);
    ani_3.addEventListener('dragstart', arrastrado, false);
    console.log(ids[0],ids[1],ids[2]);
}

function arrastrado(e){
    elemento = e.target;
    e.dataTransfer.setData('Text', elemento.getAttribute('id'));
}
function eventoOver(e){
    e.preventDefault();
}
function soltado(e){
    e.preventDefault();
    console.log(e.path[0].id);
    var id = e.dataTransfer.getData('Text');
    if (e.path[0].id==id+"_h") {
        let sonido = new Audio("../audio/"+id+".mp3");
        document.getElementById(id).style.display = "none";
        document.getElementById(e.path[0].id).src = "../img/habani/"+Lista[id-1].nombre+"_f.png";
        document.getElementById(id+"_t").innerHTML = Lista[id-1].nombre;
        sonido.play();
        sonido.loop = false;
        cont++;
        if(cont==3){
            document.getElementById("animales").innerHTML="<button id='V' class='boton' onclick='CrearTabla(part_2)'>Siguente</button>";
        }else if(cont==6){
            document.getElementById("animales").innerHTML="<button id='V' class='boton' onclick='Fin()'>Terminar</button>";
        }
    }else{
        let error = new Audio("../audio/error.mp3");
        error.play();
        error.loop = false;
        vidas--;
        ActulizarVidas();
    }
    if (vidas<=0) {
        GameOver();
    }
}
function ActulizarVidas(){
    let info="Vidas:";
    for (let i = 0; i < vidas; i++) {
        info+="<img src='../img/Vida.png' width='40px'/>";
    }
    document.getElementById("vidas").innerHTML=info;
}
function GameOver(){
    DetenerTiempo();
    document.getElementById("habitat").innerHTML =  "<img src='../img/Logo.png' width='50%' />";
    document.getElementById("animales").innerHTML =  "Perdiste "+JSON.parse(localStorage.getItem("Nombre"))+"<br>animo intentalo de nuevo";
    document.getElementById("Volver").style.display = "inline";
    document.getElementById("Volver").innerHTML = "Volver a jugar";
    document.getElementById("Jugar").style.display = "inline";
    document.getElementById("Jugar").innerHTML = "Otro Jugador";
    document.getElementById("vidas").innerHTML="Vidas: <img src='../img/Craneo.png' width='30px'/>";
    cont=0;
}
function Fin(){
    DetenerTiempo();
    document.getElementById("contenedor").style.backgroundImage = "url('../img/Artificiales.gif')";
    document.getElementById("habitat").innerHTML =  "<img src='../img/Logo.png' width='50%' />";
    document.getElementById("animales").innerHTML =  "Felicidades "+JSON.parse(localStorage.getItem("Nombre"))+" lo has completado";
    document.getElementById("Volver").style.display = "inline";
    document.getElementById("Volver").innerHTML = "Volver a jugar";
    document.getElementById("Jugar").style.display = "inline";
    document.getElementById("Jugar").innerHTML = "Otro Jugador";
    cont=0;
}
function IniciarTiempo(){
    time = window.setInterval(
        function(){
            if (segundos==60) {
                segundos=0;
                minutos++;
                document.getElementById("time").innerHTML="<img src='../img/Reloj.png' width='40px'> "+("0"+minutos).slice(-2)+":"+("0"+segundos).slice(-2);
            }
            document.getElementById("time").innerHTML="<img src='../img/Reloj.png' width='40px'> "+("0"+minutos).slice(-2)+":"+("0"+segundos).slice(-2);
            segundos++;
        }
    ,1000);      
}
function DetenerTiempo(){
    clearInterval(time);
}
document.getElementById("Credito").addEventListener("click",function(){
    let mensaje="";
    mensaje +="<br><br>Equipo: Reapear   -   Numero: 4<br>";
    mensaje +="Alumno: Carlos Luevano Santillan <br>";
    mensaje +="ID: 206520   Grupo: A <br>";
    mensaje +="Semestre: 6 <br><br>";
    mensaje +="Maestra:  Georgina Salazar Partida.<br>";
    mensaje +="Materia: Tecnologias Web.<br>";
    mensaje +="Carrera: Ingenenieria en Sistemas Computacionales. <br>";
    mensaje +="Universidad: Universidad Autonoma de Aguascalientes. <br>";
    mensaje +="Ciudad: Rincon de Romos. <br><br>";
    mensaje +="Fecha: 12/03/2022. <br>";
      Swal.fire({
        imageUrl: '../img/Logo_UAA.png',
        imageHeight: 150,
        html:mensaje,
      });
});