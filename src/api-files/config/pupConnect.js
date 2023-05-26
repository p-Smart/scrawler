import puppeteer from 'puppeteer-core'
// import {executablePath} from 'puppeteer'
// import StealthPlugin from 'puppeteer-extra-plugin-stealth'
const pup = puppeteer
// pup.use(StealthPlugin())
const {BROWSERLESS_KEY} = process.env
const viewportHeight = 1280
const viewportWidth = 1280


const connToPuppeteer = async () => {

    // const browser = await pup.launch({
    //     headless: false,
    //     defaultViewport: { width: viewportWidth, height: viewportHeight },
    //     executablePath: executablePath()
    // })
    const browser = await pup.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_KEY}`,
        defaultViewport: { width: viewportWidth, height: viewportHeight },
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }, {timeout: 0})

    const page = await browser.newPage()

    return {
        browser: browser,
        page: page,
        viewportHeight: viewportHeight,
        viewportWidth: viewportWidth
    }
}


export default connToPuppeteer