

const takeFullPageScreenshots = async (page, viewportHeight) => {
    const screenshots = []
    // await page.screenshot({path: 'screenshot.png'})
    let screenshot = await page.screenshot({ encoding: 'base64' })
    screenshots.push(screenshot)
  
    // Calculate the total height of the page
    const totalHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });
  
    // Set the viewport height as the initial scroll height
    let scrollHeight = viewportHeight;

    while (scrollHeight < totalHeight) {
      // Scroll the page to the current height
      await page.evaluate((height) => {
        window.scrollBy(0, height);
      }, scrollHeight);
  
      // Wait for a brief moment to allow content to load
      await page.waitForTimeout(500);
  
      // Capture the screenshot
    //   await page.screenshot({ path: `screenshot_${scrollHeight}.png` });
      screenshot = await page.screenshot({ encoding: 'base64' });
      screenshots.push(screenshot)

      // Increment the scroll height by the viewport height
      scrollHeight += viewportHeight;
    }

    return screenshots.map( (screenshot) => `data:image/png;base64, ${screenshot}` )
  }



  export default takeFullPageScreenshots