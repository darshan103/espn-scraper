const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard';

const request = require('request');
const cheerio = require('cheerio');

request(url,cb);

function cb(error, response, html){
    if(error){
        console.log(error);
    }
    else{
        extractMatchDetails(html);
    }
}

function extractMatchDetails(html){
    let $ = cheerio.load(html);
    let descElem = $('.ds-grow .ds-text-tight-m.ds-font-regular.ds-text-ui-typo-mid');
    // console.log(descElem.text());
    let descElemArr = descElem.text().split(',');
    let date = (descElemArr[2]+descElemArr[3]).trim();
    let venue = descElemArr[1].trim();
    let result = $('.ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title').text();
    // console.log(date);
    // console.log(venue);
    // console.log(result);

    let innings = $('.ds-rounded-lg.ds-mt-2');

    let htmlString = '';
    for(let i=0; i<innings.length; i++){
        htmlString+=$(innings[i]).html();
        let teamName = $(innings[i]).find('.ds-text-title-xs.ds-font-bold.ds-capitalize').text();
        let oppIndex = i==0 ? 1:0;
        let oppName = $(innings[oppIndex]).find('.ds-text-title-xs.ds-font-bold.ds-capitalize').text();
        // console.log(teamName);
        // console.log(oppName);

        console.log(venue, date, result, teamName, oppName);

    }
}