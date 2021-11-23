import KeyboardState from "./ketboard.js";

export function setUpKeyboard(entity,){

     
    const input = new KeyboardState();
    const audio =  document.getElementById("player");
    let pause = false;
    ['Space','ArrowUp'].forEach(key=>{
        input.addMapping(key,keyState=>{
            if(keyState){
                entity.jump.start();
            }else{
                entity.jump.cancel();
            }
        })
    })
  
    input.addMapping('KeyP',_=>{
       
        if(!audio.paused){
         audio.pause();
         pause = true;
        }
    })

 
    input.addMapping('ArrowRight',keyState=>{
       
        if(audio.paused && !pause){
         audio.play();
        }
       
         entity.go.dir = keyState
     })

    input.addMapping('ArrowLeft',keyState=>{
         
       if(audio.paused && !pause){
        audio.play();
       }
        entity.go.dir = -keyState
    })

    return input
}