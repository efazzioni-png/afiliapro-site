// Renderiza a composição HTML quadro a quadro (30 fps) com Playwright/Chromium.
// Uso:
//   node render.js frames <quadro_inicial> <quadro_final> <pasta_saida>
//   node render.js stills <t1,t2,...> - <pasta_saida>
const { chromium } = require(process.env.PW_PATH || 'playwright');
const path = require('path');

const [, , mode, a, b, outdir] = process.argv;
const FPS = 30;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.log('pageerror:', e.message));
  await page.goto('file://' + path.resolve(__dirname, 'index.html'));
  await page.evaluate(() => window.ready());
  if (mode === 'stills') {
    for (const t of a.split(',').map(Number)) {
      await page.evaluate(t => window.seek(t), t);
      await page.screenshot({ path: `${outdir}/still_${t.toFixed(2)}.jpg`, type: 'jpeg', quality: 80 });
    }
  } else {
    for (let f = +a; f < +b; f++) {
      await page.evaluate(t => window.seek(t), f / FPS);
      await page.screenshot({ path: `${outdir}/${String(f).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 93 });
    }
  }
  await browser.close();
})();
