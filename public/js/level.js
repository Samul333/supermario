import Compositor from "./compositer.js";
import { Matrix } from "./math.js";
import TileCollider from "./tileCollider.js";

export default class Level {
  constructor() {
    this.gravity = 2000;
    this.comp = new Compositor();
    this.entities = new Set();
    this.tiles = new Matrix();
    this.TileCollider = new TileCollider(this.tiles);
  }

  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;

      this.TileCollider.checkX(entity);

      entity.pos.y += entity.vel.y * deltaTime;

      this.TileCollider.checkY(entity);

      this.TileCollider.test(entity);
      entity.vel.y += this.gravity * deltaTime;
    });
  }
}
