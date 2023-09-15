const http = require('http');
const fs = require('fs');
const url = require('url');
const myServer = http.createServer(
    (req, res) => {
        // console.log(`new request recieved`);
        // console.log({ req });
        // console.log(res)
        // console.log(req.headers);
        const parsedurl = url.parse(req.url, true);

        const log = `${Date.now()}: New Req at ${parsedurl.pathname} Received \n`;
        if (req.url === '/favicon.ico') {
            return res.end();
        }
        fs.appendFile('./log.text', log, (err, result) => {
            console.log(parsedurl);
            switch (parsedurl.pathname) {
                case '/':
                    res.end("home page");
                    break;
                case '/about':
                    const userrollnumber = parsedurl.query.rollnumber;
                    res.end(` ${userrollnumber} about page`);
                    break;
                case '/search':
                    const data_searched = parsedurl.query.search_query;
                    res.end(`here is the result for --> ${data_searched}`);
                    break;
                default:
                    res.end("404");
            }

            console.log('file appended successfully');
        });
    }
);

myServer.listen(9000, () => {
    console.log(`server Started`);
});