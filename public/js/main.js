


import { createMario } from "./entities.js";
import { setUpKeyboard } from "./input.js";

import { createCameraLayer, createCollisionLayer } from "./layers.js";

import { loadLevel } from "./loader.js";

import Timer from "./timer.js";
import Camera from "./camera.js";
import setupMouseControl from "./debug.js";

const canvas = document.getElementById("screen");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");

Promise.all([createMario(), loadLevel("1-1")]).then(([mario, level]) => {

  const camera = new Camera(); 
  window.camera = camera;
  level.entities.add(mario);
  level.comp.layers.push(createCollisionLayer(level),createCameraLayer(camera));

  level.com

  const input = setUpKeyboard(mario);

  input.listenTo(window);

  setupMouseControl(canvas,mario,camera)

  mario.pos.set(64, 180);
  // mario.vel.s et(200,-600)
  
  const timer = new Timer(1 / 60);

  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.comp.draw(context,camera);
  };

  timer.start();
});
