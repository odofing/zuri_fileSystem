'use strict'

const fs = require('fs');

const path = require('path')

const axios = require('axios')

async function downloadText() {

    const url = 'http://jsonplaceholder.typicode.com/posts'

    const textPath = path.resolve(__dirname, 'result', 'posts.txt')

    const writer = fs.createWriteStream(textPath);

    const resp = await axios({
        url: url,
        method: 'GET',
        responseType: 'stream'
    })
    resp.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finished', resolve)
        writer.on('error', reject)
    })
}

downloadText()