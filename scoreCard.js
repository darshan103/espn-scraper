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

        let cInnings = $(innings[i]);
        let allRows = cInnings.find('table.ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table tbody tr');
        // let count=allRows.length;
        // console.log(count);
        for(let j=0; j<=allRows.length; j++){
            let allCols =$(allRows[j]).find('td');

            // I am using counting for fetching players details.
            let count = allCols.length;
            // console.log(count);

            // let isWorthy=$(allCols[0]).hasClass('batsmen-table');
            // if(isWorthy==true){
            //     let playerName = $(allCols[0]).text().trim();
            //     console.log(playerName);
            // }

            if(count==8){
                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixs = $(allCols[6]).text().trim();
                let str = $(allCols[7]).text().trim();
                console.log(playerName, runs, balls, fours, sixs, str);
            }
        }
        console.log("...................Opponent_Team......................");

        // console.log(venue, date, result, teamName, oppName);

    }
}