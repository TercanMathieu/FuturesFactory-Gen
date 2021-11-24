
async function getText(url) {
    const res = await fetch(url)

    if (res.status !== 200) {
        throw new Error(`response error ${res.status} status code`)
    }

    return await res.text()
}

async function getTextFakeUserAgent(url) {
    const res = await fetch(url, {
        headers: {
            'user-agent': 'Mozilla/5.0 (Linux; Android 9; W-U300) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36',
        },
    })

    if (res.status !== 200) {
        throw new Error(`response error ${res.status} status code`)
    }

    return await res.text()
}

module.exports = {
    getText,
    getTextFakeUserAgent
}
