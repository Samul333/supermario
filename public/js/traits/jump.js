import { Trait } from "../entity.js";

export class Jump extends Trait {

    constructor(){
        super('jump')
        this.duration = 0.4;
        this.velocity = 200;
        this.engagedTime = 0;
        this.ready = false;
    }


    start(){
        if(!this.ready) return
        this.engagedTime = this.duration;
    }

    cancel(){
        this.engagedTime = 0;
    }


    obstruct(entity,side){

        if(side === 'bottom'){
            this.ready = true;
        }
        else if (side === 'top' ){
            this.cancel()
        }

        
    }

    update(entity,deltaTime){
        
        if(this.engagedTime > 0){
            entity.vel.y = -this.velocity;
            this.engagedTime -= deltaTime;

         }

         this.ready = false;
        
    
    
    }
}