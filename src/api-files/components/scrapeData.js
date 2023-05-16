import puppeteer from 'puppeteer-core'
// import {executablePath} from 'puppeteer'
// import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import takeFullPageScreenshots from './takeScreenshot'
import scrapeImages from './scrapeImages'
import scrapeLinks from './scrapeLinks'
import getPageTitle from './scrapePageTitle'
import error from './cusomError'
import saveNewScraped from './saveNewScraped'
const pup = puppeteer
// pup.use(StealthPlugin())

const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
}
const {BROWSERLESS_KEY} = process.env


const scrapeData = async (url) => {
    try{
        !isValidUrl(url) && error('Invalid URL')
        const viewportHeight = 732
        // var browser = await pup.launch({
        //     headless: 'new',
        //     executablePath: executablePath()
        // })
        var browser = await pup.connect({
            browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_KEY}`,
            defaultViewport: { width: 1500, height: viewportHeight },
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }, {timeout: 0})
        var page = await browser.newPage()
        // await page.setViewport({ width: 1500, height: viewportHeight });
        await page.goto(url, {timeout: 0})
        try{
            await page.waitForSelector('*')
            await page.waitForSelector('a', {timeout: 5000})
            await page.waitForSelector('img', {timeout: 5000})
        }
        catch(err){

        }

        const pageTitle = await getPageTitle(page)

        // Take Page Snapshot
        // const screenshotData = await page.screenshot({ encoding: 'base64' });
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
        err.message = err.message.includes('connect ETIMEDOUT') ? 'Sever Connection Timeout, try again' : err.message
        throw new Error(err.message)
    }
    finally{
        await page?.close()
        await browser?.close()
    }
}


export default scrapeData