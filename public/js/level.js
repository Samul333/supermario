import Compositor from "./compositer.js";
import { Matrix } from "./math.js";
import TileCollider from "./tileCollider.js";


export default class Level {

    constructor(){

        this.comp = new Compositor();

        this.entities = new Set();
        this.tiles = new Matrix();
        this.TileCollider = new TileCollider(this.tiles);
    }

    update(deltaTime){

        this.entities.forEach(entity=>{
            entity.update(deltaTime);

            this.TileCollider.test(entity)
        })

    }
}