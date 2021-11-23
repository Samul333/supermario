import { loadImage } from "./loader.js";
import SpriteSheet from "./SpriteSheet.js";


export function loadMarioSprite(){
    
    return loadImage('/image/characters.gif')
    .then(image=>{
    
        const sprites = new SpriteSheet(image,16,16);
    
        sprites.define('idle',276,44,16,16)
        return sprites;
        });
    }
    

