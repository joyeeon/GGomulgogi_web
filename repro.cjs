const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 800, height: 900 } });

  page.on('console', (msg) => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', (err) => console.log('PAGEERROR:', err.message));

  await page.goto('http://localhost:5173/draw', { waitUntil: 'networkidle' });

  // wait for the pens grid to show up
  const topRow = page.locator('div.grid.grid-cols-6');
  await topRow.waitFor({ state: 'visible', timeout: 15000 });

  const box1 = await topRow.boundingBox();
  console.log('TOP ROW BOX before anything:', JSON.stringify(box1));

  // click rainbow button (alt text on its img)
  const rainbowBtn = page.locator('button', { has: page.locator('img[alt*="무지개"]') });
  await rainbowBtn.click();

  await page.waitForTimeout(500);
  const box2 = await topRow.boundingBox();
  console.log('TOP ROW BOX after opening modal:', JSON.stringify(box2));

  // simulate picking a custom color in the native color input without needing the OS dialog
  const colorInput = page.locator('input[type="color"]');
  await colorInput.evaluate((el) => {
    el.value = '#ff00aa';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  });

  await page.waitForTimeout(500);
  const box3 = await topRow.boundingBox();
  console.log('TOP ROW BOX after picking color (modal still open):', JSON.stringify(box3));

  // close the modal via the RxCross2 close button (first button inside the modal content)
  const closeBtn = page.locator('[aria-label="색상 선택 모달"] button').first();
  await closeBtn.click();

  await page.waitForTimeout(600);
  const box4 = await topRow.boundingBox();
  console.log('TOP ROW BOX after closing modal:', JSON.stringify(box4));

  await page.screenshot({ path: 'C:\\Users\\PC\\AppData\\Local\\Temp\\claude\\d--School-SangSang\\98418fb5-d0cc-4c00-b1a8-659b0cc6f95c\\scratchpad\\after-close.png' });

  await browser.close();
})();
