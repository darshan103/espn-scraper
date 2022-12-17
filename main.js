const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595';

const request = require('request');
const cheerio = require('cheerio');

request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }
    else{
        extractLink(html)
    }
}

function extractLink(html){
    let $ = cheerio.load(html);
    let anchorEle = $('.ds-border-t.ds-border-line.ds-text-center.ds-py-2 a');
    let link = anchorEle.attr('href');
    let fullLink = 'https://www.espncricinfo.com'+link;
    console.log(fullLink);
}