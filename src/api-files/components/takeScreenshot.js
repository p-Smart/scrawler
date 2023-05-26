

const takeFullPageScreenshots = async (page, viewportHeight) => {
    const screenshots = []

    let screenshot = await page.screenshot({ encoding: 'base64' })
    screenshots.push(screenshot)
  
    const totalHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });
  
    let scrollHeight = viewportHeight;

    while (scrollHeight < totalHeight) {

      await page.evaluate((height) => {
        window.scrollBy(0, height);
      }, scrollHeight);
  
      await page.waitForTimeout(500);
  
      screenshot = await page.screenshot({ encoding: 'base64' });
      if (screenshots.includes(screenshot)) continue
      
      screenshots.push(screenshot)

      scrollHeight += viewportHeight;
    }
    const modifiedScreenShots = screenshots.map( (screenshot) => `data:image/png;base64, ${screenshot}` )
    return modifiedScreenShots
  }



  export default takeFullPageScreenshots