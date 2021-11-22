import { Matrix } from "./math.js";

export function craeteBackgroundLayer (level,sprites){
    const buffer = document.createElement('canvas');
    buffer.width= 2048;
    buffer.height= 240;

    const context = buffer.getContext('2d')

    level.tiles.forEach((tile,x,y)=>{
        sprites.drawTile(tile.name,context,x,y);
    })



    return function drawBackgroundLayer(context,camera){
        context.drawImage(buffer,-camera.pos.x,-camera.pos.y)
    }

}





export function createSpriteLayer(entities,width=64,height=64){

    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext('2d');


    return function drawSpriteLayer(context,camera){
        entities.forEach(entity=>{

            spriteBufferContext.clearRect(0,0,width,height)

            entity.draw(spriteBufferContext);

            context.drawImage(spriteBuffer,
                entity.pos.x -camera.pos.x,
                entity.pos.y -camera.pos.y  )
        })
      
    }
}

export function createCollisionLayer(level) {

  

    const tileResolver = level.TileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const resolvedTiles = new Matrix();

    const getByIndexOriginal = tileResolver.getByIndex;

    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.set(x, y, true);
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollisions(context,camera) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach((value, x, y) => {
            context.beginPath();
            context.rect(
                x * tileSize -camera.pos.x, 
                y * tileSize - camera.pos.y, 
                tileSize, 
                tileSize);
            context.stroke();
        });
        context.strokeStyle = 'red';

        level.entities.forEach(entity=>{
            context.beginPath();
            context.rect(
                entity.pos.x- camera.pos.x, 
                entity.pos.y - camera.pos.y, 
                entity.size.x, entity.size.y);
            context.stroke();
        })

        resolvedTiles.clear();
    };
}