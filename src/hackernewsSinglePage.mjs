import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: false , args: ['--disable-features=site-per-process']});

export const extractComments = async (link) => {
    const page = await browser.newPage();

    await page.goto(link)
    await page.waitForSelector('.comment')
    const postComment = await page.evaluate(() => {
        return [...document.querySelectorAll('.comment')]?.map(comment => comment.innerText)
    })

    await page.close()
    return postComment;
}

// const links = [
//     'https://news.ycombinator.com/item?id=15924794',
//     'https://news.ycombinator.com/item?id=15924794'
// ]

// for (let link of links) {
//     await setTimeout(5000)
//     const comments = await extractComments(link)
//     const sentiment = await getSentiment(comments.join(' ')) 
//     console.log(sentiment)
// }


