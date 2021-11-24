import { createAnim } from "./anim.js";
import Entity from "./entity.js";
import { loadSpriteSheet } from "./loader.js";
import { Go } from "./traits/go.js";
import { Jump } from "./traits/jump.js";







export function createMario(){
    

    return loadSpriteSheet('mario')
    .then(sprite=>{
        const mario = new Entity();
        
        mario.size.set(14,16);
        mario.addTrait(new Jump());

        mario.addTrait(new Go())
        
        const runAnim = createAnim(['run-1','run-2','run-3'],10)

        function routeFrame(mario){

            if (mario.go.distance > 0){

                if((mario.vel.x> 0 && mario.go.dir < 0 ) || (mario.vel.x <0 && mario.go.dir >0 )) {
                    return 'break'
                }

                return runAnim(mario.go.distance);
            }

            return 'idle'
        }

        mario.draw = function drawMario(context){
            sprite.draw(routeFrame(this),context,0,0, mario.go.heading < 0)
        }
    
        return mario
    })

 
}