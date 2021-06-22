const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');
const fs = require('fs')
const path = require('path')
const script = fs.readFileSync('./hello.js', 'utf-8')

const exePath = process.platform === 'win32'
? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
: process.platform === 'linux'
? '/usr/bin/google-chrome'
: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const isDev = !(process.env.NODE_ENV === 'production');

exports.handler = async function (event, ctx) {
  let isHTMLDebug = true
  // puppeteer
  let options;

  const template = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
    </head>
  
    <body>
      <div id="corgi"><div>CORGIIIS 123</div></div>
      <div id="app">
        <p>Loading... {{ message }}</p>
        <Preview title="template from serverless" />
      </div>
      <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    </body>
  </html>
  `

  if (isDev) {
    options = {
        args: [],
        executablePath: exePath,
        headless: true
    };
} else {
    options = {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    };
}
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()

  // await page.goto('https://bitsofco.de', { waitUntil: 'networkidle2' });
  await page.setContent(template)
  await page.addScriptTag({
    content: script
  })
  await page.setViewport({ width: 2048, height: 1170 })

  const html = await page.content()

  // const screenshot = await page.screenshot({encoding: 'binary'});
  const file = await page.screenshot({type: 'png'});

  await browser.close();

  // return {
  //   isBase64Encoded: true,
  //   statusCode: 200,
  //   headers: {
  //     'Content-Type': 'image/png',
  //     'Content-Length': screenshotBuffer.length.toString(),
  //   },
  //   body: screenshotBuffer.toString('base64'),
  // }

  if(isHTMLDebug) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: html
    }
  } else {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
      },
      body: file.toString('base64'),
      isBase64Encoded: true
      // body: JSON.stringify({
      //   message: `Complete screenshot of https://bitsofco.de`, 
      //   buffer: screenshot 
      // })
    }
  }
}