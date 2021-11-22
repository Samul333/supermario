import { Trait } from "../entity.js";

export class Go extends Trait {

    constructor(){
        super('go')

        this.dir = 0;
        this.speed = 5000;

    }

    update(entity,deltaTime){
        
        entity.vel.x = this.speed * this.dir * deltaTime;
    
    
    }
}