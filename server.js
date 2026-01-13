const http = require("http");

const PLATFORM = "0x411DD1F78A8c3D1BEC5d1fC012B898a201E84D56";
const USDC = "0x833589fCD6EDb6E08f4c7C32D4f71b54bdA02913";

http.createServer((req, res) => {
  if (req.url === "/frame") {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(`
<!DOCTYPE html>
<html>
<head>
<meta property="fc:frame" content="vNext">
<meta property="fc:frame:image" content="https://i.imgur.com/M4dZ4xF.png">
<meta property="fc:frame:button:1" content="Tip 1 USDC">
<meta property="fc:frame:button:1:action" content="post">
<meta property="fc:frame:button:1:target" content="/tip?amount=1">
<meta property="fc:frame:button:2" content="Tip 5 USDC">
<meta property="fc:frame:button:2:action" content="post">
<meta property="fc:frame:button:2:target" content="/tip?amount=5">
</head></html>`);
  }

  if (req.url.startsWith("/tip")) {
    const amount = req.url.split("=")[1];
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(`
<!DOCTYPE html>
<html>
<head>
<meta property="fc:frame" content="vNext">
<meta property="fc:frame:image" content="https://i.imgur.com/4M7IWwP.png">
<meta property="fc:frame:button:1" content="Send ${amount} USDC">
<meta property="fc:frame:button:1:action" content="tx">
<meta property="fc:frame:button:1:target" content="ethereum:${USDC}/transfer?to=${PLATFORM}&value=${amount}000000">
</head></html>`);
  }

  res.end("OK");
}).listen(3000, () => console.log("OPEN http://localhost:3000/frame"));
