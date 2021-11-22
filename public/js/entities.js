import Entity, { Trait } from "./entity.js";
import { loadMarioSprite } from "./Sprites.js";
import { Go } from "./traits/go.js";
import { Jump } from "./traits/jump.js";
import { Velocity } from "./traits/velocity.js";





export function createMario(){
    

    return loadMarioSprite()
    .then(sprite=>{
        const mario = new Entity();
        
        mario.size.set(14,16);
        mario.addTrait(new Jump());
      //  mario.addTrait(new Velocity());

        mario.addTrait(new Go())
    
        mario.draw = function drawMario(context){
            sprite.draw('idle',context,0,0)
        }
    
        return mario
    })

 
}