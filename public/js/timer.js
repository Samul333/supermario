
export default class Timer{

    constructor(deltaTime=1/60){
        let accumulatedTome = 0;
        let lastTime = 0;
    
        this.updateProxy = (time) =>{
            accumulatedTome += (time-lastTime)/1000;
          
    
            while (accumulatedTome > deltaTime){
                this.update(deltaTime)
                accumulatedTome *= deltaTime
            }
           
            lastTime = time;

            this.enqueue()
        }
        
    }

    enqueue(){
        requestAnimationFrame(this.updateProxy);
    }

    start(){
        this.enqueue();
    }

}