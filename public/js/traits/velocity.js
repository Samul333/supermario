import { Trait } from "../entity.js";

export class Velocity extends Trait {

    constructor(){
        super('velocity')
    }

    update(entity,deltaTime){
            entity.pos.x+=entity.vel.x * deltaTime;
            entity.pos.y+=entity.vel.y * deltaTime;
    
    
    }
}