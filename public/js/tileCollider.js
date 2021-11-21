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
        const match = this.tiles.matchByPosition(entity.pos.x,entity.pos.y);

        if(!match) return

        if(match.tile.name !== 'ground') return;

        debugger;
        if(entity.vel.y >0){
            if(entity.pos.y > match.y1){
                entity.pos.y = match.y1;

                entity.vel.y = 0;
            }
        }

    }
}


