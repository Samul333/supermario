import Level from "./level.js";
import { craeteBackgroundLayer, createSpriteLayer } from "./layers.js";
import SpriteSheet from "./SpriteSheet.js";
import { createAnim } from "./anim.js";

export function loadImage(url){

    return new Promise(resolve=>{
        const image = new Image();
        image.addEventListener('load',()=>{
            resolve(image)
        })
        image.src= url;
    })

}


function loadJSON(url){

   return fetch(url)
    .then(r=>r.json())
}


export function loadSpriteSheet(name){

    return loadJSON(`/sprites/${name}.json`)
    .then(sheetSpec=>Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageUrl)
    ]))
    .then(([sheeetSpec,image])=>{


            const sprites = new SpriteSheet(image,
                sheeetSpec.tileW,
                sheeetSpec.tileH);

            
                if(sheeetSpec.tiles){
                    sheeetSpec.tiles.forEach(tileSpec=>{

                        sprites.defineTile(tileSpec.name,
                            tileSpec.index[0],
                            tileSpec.index[1])
        
                    })
                }
                
                if(sheeetSpec.frames){

                    sheeetSpec.frames.forEach(frameSpec=>{
                        sprites.define(frameSpec.name,...frameSpec.rect)
                    })

                }

                if(sheeetSpec.animations){
                
                    sheeetSpec.animations.forEach(animSpec=>{
                        const animation = createAnim(animSpec.frames,animSpec.frameLen)
                        sprites.defineAnim(animSpec.name,animation)
                    })

                }
        
                
            return sprites;
           
    })
}


export function loadLevel(name){
    return loadJSON(`/levels/${name}.json`)
    .then(levelSpec=>Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet)

    ])) 
    .then(([levelSpec,backgroundSprites] )=>{

        const level = new Level();
        
        createTiles(level,levelSpec.backgrounds,levelSpec.patterns);

        const backgroundLayer = craeteBackgroundLayer(level,backgroundSprites)
        level.comp.layers.push(backgroundLayer)
    
        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);


        return level
    })
}



export function createTiles(level,backgrounds,patterns,offsetX=0,offsetY=0){


    function applyRange(background,xStart,xLen,yStart,yLen){

        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
     for (let x=xStart; x<xEnd;++x){
            for (let y=yStart;y<yEnd;++y) {
                   const derivedX = x+offsetX;
                   const derivedY = y+ offsetY
                if(background.pattern){
                   const backgrounds = patterns[background.pattern].backgrounds;
               
                   createTiles(level,backgrounds,patterns,derivedX,derivedY)
                } else{
                    level.tiles.set(derivedX,derivedY,{
                        type: background.type,
                        name: background.tile
                    })
                }
                   
                }
        }
    
    }



    backgrounds.forEach(background=>{
        background.ranges.forEach((range)=>{

            if(range.length === 4){
                const [xStart,xLen,yStart,yLen] = range;
                applyRange(background,xStart,xLen,yStart,yLen);
            }

            else if (range.length ==  3){
                const [xStart,xLen,yStart]= range;
                applyRange(background,xStart,xLen,yStart,1)
            }

            else if (range.length ===2){
                const [xStart,yStart] = range;
                applyRange(background,xStart,1,yStart,1);
            }

        
        
        })
    })


}