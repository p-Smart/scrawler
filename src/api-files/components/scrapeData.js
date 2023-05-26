import takeFullPageScreenshots from './takeScreenshot'
import scrapeImages from './scrapeImages'
import scrapeLinks from './scrapeLinks'
import getPageTitle from './scrapePageTitle'
import error from './cusomError'
import saveNewScraped from './saveNewScraped'
import connToPuppeteer from '../config/pupConnect'


const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
}


const scrapeData = async (url) => {
    try{
        !isValidUrl(url) && error('Invalid URL')

        var {browser, page, viewportHeight} = await connToPuppeteer()

        await page.goto(url, {timeout: 0})
        try{
            await page.waitForSelector('*')
            await page.waitForSelector('a', {timeout: 5000})
            await page.waitForSelector('img', {timeout: 5000})
        }
        catch(err){

        }

        const pageTitle = await getPageTitle(page)

        const snapshotSrcs = await takeFullPageScreenshots(page, viewportHeight)

        const imgSrcs = await scrapeImages(page)

        const pageLinks = await scrapeLinks(page)

        const savedResult = await saveNewScraped(url, snapshotSrcs[0], pageTitle)

        return {
            title: pageTitle,
            images: imgSrcs,
            links: pageLinks,
            snapshots: snapshotSrcs
        }
    }
    catch(err){
        console.log(err)
        err.message = err.message.includes('connect ETIMEDOUT') ? 'Sever Connection Timeout, try again' : err.message
        throw new Error(err.message)
    }
    finally{
        // await page?.close()
        // await browser?.close()
    }
}


export default scrapeData