import { Queue, Worker } from 'bullmq'
import { connection } from './config/redisConfig.mjs'
import { getAllPostLinks } from './hackernewsMainPage.mjs';
import { setTimeout } from 'timers/promises'
import getSentiment from './semtiment.mjs';
import { extractComments } from './hackernewsSinglePage.mjs';

const links = await getAllPostLinks()

new Worker('postWithComments', async (job) => {
    const postData = job.data
    console.log(postData)

}, { connection })

const queue = new Queue('postWithComments', { connection })
for (let link of links) {
    if (!await connection.get(link)) {
        await setTimeout(5000)
        const comments = await extractComments(link)
        const sentiment = await getSentiment(comments.join(' '))
        queue.add(link, { postUrl: link, sentimentScore: sentiment.score }, { jobId: link })

        await connection.set(link, sentiment.score)
    } else {
        console.log("already Saved!", link)
    }
}


