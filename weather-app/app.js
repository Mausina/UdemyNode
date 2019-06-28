const request = require('request');

const url = {
    urls: 'https://api.darksky.net/forecast/',
    apiKey: 'f7e71606d23737657a8bf5d2b7937428',
    // out: this.urls + this.apiKey + '/' + this.long + "," + this.lat
    out() {
        return this.urls + this.apiKey + '/' + this.long + "," + this.lat
    }
};
const mapBoxUrl = {
    url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    apiKey: 'pk.eyJ1IjoiYWxleHNhbmRlcjExMTE1IiwiYSI6ImNqeGRheDU4bTBiZjMzb3M4bmJmdTZvd2YifQ.LcuiK8noc8bF1kayZJD1kw',
    sity: 'Dnepr.json',
    limit: 3,

    out() {
        return this.url + this.sity + "?limit=" + this.limit + "&access_token=" + this.apiKey
    }
};


request({url:mapBoxUrl.out(), json: true},(error, response, body)=>{
    if(error){
        console.log("Error connection");
    }else{
        const dnipro = body.features.filter((item) => item.id === 'poi.2808908687579');
        url.long = dnipro[0].center[1];
        url.lat = dnipro[0].center[0];
    }


    request({url:url.out(), json: true},(error, response, body)=>{
        if(error){
            console.log('Error connection');
        }else if( body.error){
            console.log('Error: Not enough information');
        }else{
            const temperature = body.currently.apparentTemperature;
            const rainChance = body.currently.precipProbability;
            const summary = body.daily.data[0].summary;
            console.log(`${summary} It is currently ${temperature} degrees out. There is a ${rainChance}% chance of rain.`);

        }



    });
});



