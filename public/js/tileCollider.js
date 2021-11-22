import TileResolver from "./tileResolver.js";

export default class TileCollider {

    constructor(tileMatrix){
        this.tiles = new TileResolver(tileMatrix,16)
    }

    test(entity){
        this.checkY(entity)
        const match = this.tiles.matchByPosition(entity.pos.x,entity.pos.y);

        if(match){
            console.log('Matched tile', match,match.tile);
        }

    }

    checkY(entity){
        const matches = this.tiles.searchByRange(entity.pos.x, entity.pos.x + entity.size.x, entity.pos.y, entity.pos.y+entity.size.y);

        matches.forEach(match=>{
            if(match.tile.name !== 'ground') return;

            if(entity.vel.y >0){
                if(entity.pos.y > match.y1){
                    entity.pos.y = match.y1;
    
                    entity.vel.y = 0;
                }
            }
            else if(entity.vel.y < 0){
                if(entity.pos.y < match.y2){
                    entity.pos.y = match.y2;
    
                    entity.vel.y = 0;
                }
            }
    
        })


     

    }
}


