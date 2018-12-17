import * as PIXI from 'pixi.js';
import Player from '../lib/player';
import * as m from '../lib/math';

// a == app
export default function sketch(app) {
  const numBars = 256;
  const frequencyData = new Uint8Array(Player.getAnalyser().frequencyBinCount);

  // Player.changeFftSize(numBars);
  // let's create a moving shape
  const thing = new PIXI.Graphics();
  app.stage.addChild(thing);
  thing.x = 800 / 2;
  thing.y = 600 / 2;

  // let count = 0;

  let bars = [];
  for (let i = 0; i < numBars; i += 1) {
    let square = new PIXI.Graphics();
    app.stage.addChild(square);
    bars.push(square);
  }

  app.ticker.add(() => {
    if (typeof frequencyData !== 'undefined') {
      Player.getAnalyser().getByteFrequencyData(frequencyData);
      const spectrum = frequencyData;

      for (let i = 0; i < numBars; i += 1) {
        const color1 = m.map(i, 0, numBars, 0, 50);
        // let color2 = p.map(i, numBars, 0, 0, 255);
        // p.fill(color1, 255, 255);
        const x = m.map(i, 0, numBars, 0, window.innerWidth);
        const h = -window.innerHeight + m.map(spectrum[i], 0, 255, window.innerHeight, 0);
        // p.rect(x, p.height, 10, h);
        let rec = bars[i];
        rec.clear();
        rec.lineStyle(2, 0x0000FF, 1);
        rec.drawRect(x, window.innerHeight, 5, h);
        rec.endFill();
      }
    }
  });
}
