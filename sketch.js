var rex,rex_run,moleu;
var bordas;
var solo, imagemSolo;
var solo_inv;
var nuvem, imagemnuvem;
var ponto = 0;
var grupoobstaculo,gruponuvem;
var finaldojogo,finaldojogo_img;
var restart,restart_img;

var MODOJOGAR = 1;
var MODOFINAL = 0;

var modo = MODOJOGAR;
//cicle  fundo infinito
//tileset
var som_pular,som_morte,som_checkpoint;
function preload(){
  //carregar animações e imagens
  
  //imagem do trex
  rex_run = loadAnimation("trex1.png","trex3.png","trex4.png");
  //imagem do solo
  imagemSolo = loadImage("ground2.png");
  
  imagemnuvem = loadImage("cloud.png");
  
  moleu = loadImage("trex_collided.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  finaldojogo_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
  
  
  som_pular = loadSound("jump.mp3");
  som_morte = loadSound("die.mp3");
  som_checkpoint =loadSound("checkPoint.mp3");
}

function setup(){
  //adicionar sprites e etc
  createCanvas(600,200);
  
  
 
  
  
  
  //sprite rex
  rex = createSprite(50,100,10,10);
  //animação rex correndo
  rex.addAnimation("running",rex_run);
  rex.addAnimation("tmoleu",moleu);
  rex.scale = 0.5;
 // ver o tamanho da colisão do objeto  
 //rex.debug = true;
rex.setCollider("circle",0,0,30);
  
  
  
  //solo
  solo = createSprite(300,190,600,20);
  solo.addImage("solo",imagemSolo);
  solo.x = solo.width / 2;
  
  
  //bordas do jogo
  bordas = createEdgeSprites();
  
  //solo inv 
  solo_inv= createSprite(300,202,600,20);
  solo_inv.visible = false;
  
  finaldojogo = createSprite(300,80);
  finaldojogo.addImage("final",finaldojogo_img);
  
  restart = createSprite(300,140);
  restart.addImage("restart1",restart_img);
  restart.scale = 0.8;
  
  grupoobstaculo = new Group();
  
  gruponuvem = new Group();
  
}

function draw(){
  //funcionamento do jogo
  background('white');
   
  console.log(modo);
  if(modo === MODOJOGAR){
    
   //Pulo rex 
   if(keyDown("space") && rex.isTouching(solo)){
    rex.velocityY = -10; 
     som_pular.play();
  } 
  //gravidade
  rex.velocityY = rex.velocityY + 0.6;
    
  solo.velocityX = -10; 
   //reiniciar solo
    
    restart.visible =false;
    finaldojogo.visible = false;
    
   if (solo.x < 0){
    solo.x = solo.width/2;
  } 
    
  gerarnuvin();
  
  gerarobstaculos(); 
    
    
    if(ponto % 100 === 0 && ponto >0){
    som_checkpoint.play(); 
   } 
    
  if(grupoobstaculo.isTouching(rex)){
      modo = MODOFINAL;
    console.log("tocando");
      som_morte.play();
    
    } 
    
  ponto = ponto + Math.round(frameRate() /60 ); 
    
  }else if (modo === MODOFINAL){
  
    rex.changeAnimation("tmoleu");
    
    solo.velocityX = 0;
  grupoobstaculo.setVelocityXEach (0);
  gruponuvem.setVelocityXEach (0);
    
  gruponuvem.setLifetimeEach (-1);
  grupoobstaculo.setLifetimeEach(-1);  
    rex.velocityY = 0;
    
    restart.visible =true;
    finaldojogo.visible = true;
    
    if(mousePressedOver(restart)) {
reset();
} 
  }
  
  
  //console.log("ola"+" mundo");
  
  //test
  //var rand = Math.round(random(1,10));
  //console.log (rand);
    
  
  //&& rex.y >=150
  
  
  
  
  //chão
  //rex.collide (bordas [3]);
  rex.collide(solo_inv);
   
 

  
  
  
 

  //para contar os frames do jogo
  //console.log(frameCount);
 
  drawSprites();
  
  textSize (13);
  text("ponto = "+ ponto,500,12);
  
  
  
  
}

//para colocar o text em cima do sprite e so colocar o text em 
//baixo do drawSprite 

function gerarnuvin(){
 
  if (frameCount % 60 === 0){
   nuvem = createSprite(610,100,10,10);
   nuvem.addImage("nunu" , imagemnuvem);
   nuvem.scale = 0.6; 
   
  //randomiza o lugar das nuvin   
  nuvem.y = Math.round(random(10,100));
    
   nuvem.velocityX = -5; 
    //ajustando a profundidade
    nuvem.depth = rex.depth;
    rex.depth = rex.depth +1;
    
    nuvem.lifetime = 140;
     
    gruponuvem.add(nuvem);
  } 
  
   
}


function gerarobstaculos(){
if(frameCount % 80 === 0){
  var obstaculo = createSprite(610,175,10,10);
  
  var rand = Math.round(random(1,6));
  obstaculo.scale = 0.5;
  
  obstaculo.velocityX = -6;
  obstaculo.lifetime = 120;
  
  switch(rand){
    case 1: obstaculo.addImage(obstaculo1);
    break;
    
    case 2: obstaculo.addImage(obstaculo2);
    break;
    
    case 3: obstaculo.addImage(obstaculo3);
    break;
    
    case 4: obstaculo.addImage(obstaculo4);
    break;
    
    case 5: obstaculo.addImage(obstaculo5);
    break;
    
    case 6: obstaculo.addImage(obstaculo6);
    break;
    
    default:break;
    
   
  }

  
 grupoobstaculo.add(obstaculo); 

} 
}

function reset(){
 modo = MODOJOGAR; 
 
  finaldojogo.visible = false;
  restart.visible = false;
  
  grupoobstaculo.destroyEach();
  gruponuvem.destroyEach();
  
  rex.changeAnimation("running");
  
  ponto= 0;
}