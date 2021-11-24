import { Trait } from "../entity.js";

export class Go extends Trait {

    constructor(){
        super('go')

        this.dir = 0;
        this.acceleration = 400;
        this.deceleration = 300;   
        this.distance = 0;
        this.dragFactor = 1/5000;
        this.heading = 1;

    }

    update(entity,deltaTime){
        
        const absX = Math.abs(entity.vel.x);
        
        if(this.dir !== 0){
            entity.vel.x += this.acceleration * this.dir * deltaTime;    
            this.heading = this.dir;
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        }
        else if(entity.vel.x !== 0) {
            const decel = Math.min(absX,this.deceleration*deltaTime);   
            entity.vel.x += entity.vel.x > 0 ? -decel : decel
        }
        else {
            this.distance=0;
        }
       
        const drag = this.dragFactor * entity.vel.x * Math.abs(entity.vel.x);

        entity.vel.x -=drag;

        this.distance += absX * deltaTime;
    }
}