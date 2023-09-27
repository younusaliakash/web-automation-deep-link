import puppeteer from 'puppeteer'

export const getAllPostLinks = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://hn.algolia.com', { waitUntil: 'networkidle0' })
    await page.waitForSelector('.Story_title')
    const postLinks = await page.evaluate(() => {
        return [...document.querySelectorAll('.Story_title a:first-child')].map(link => link.href)
    })

    await page.close()
    await browser.close()
    return postLinks;
}