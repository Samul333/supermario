import Compositor from "./compositer.js";
import { createMario } from "./entities.js";
import KeyboardState from "./ketboard.js";
import { createCollisionLayer } from "./layers.js";


import { loadLevel} from "./loader.js";

import Timer from "./timer.js";







const canvas = document.getElementById('screen');
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d')







Promise.all([
    createMario(),
    loadLevel('1-1')
])
.then(([mario,level])=>{


  

    const gravity = 2000;
    const SPACE = 32;   
    const input = new KeyboardState();



    level.entities.add(mario);
    level.comp.layers.push(createCollisionLayer(level));

    input.addMapping(SPACE,keyState=>{
        if(keyState){
            mario.jump.start();
        }else{
            mario.jump.cancel();
        }
    })

    input.listenTo(window);

    ['mousedown','mousemove'].forEach(eventName=>{
        canvas.addEventListener(eventName,event=>{

           
            if(event.buttons===1){

                mario.vel.set(0,0)
                mario.pos.set(event.offsetX,event.offsetY);

            }
        })
    })


    mario.pos.set(64,180)
  // mario.vel.set(200,-600)


    

    const timer = new Timer(1/60)

    timer.update  = function update(deltaTime){
         
            level.update(deltaTime);
            level.comp.draw(context)
            mario.vel.y+=gravity * deltaTime;
    }

   timer.start();
})




        
     
    






    