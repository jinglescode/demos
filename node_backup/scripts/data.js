import * as tf from '@tensorflow/tfjs';

class Data {

  static async loadFromAlphavantage(ticker, apikey) {
    return new Promise(function(resolve, reject) {
      let Client = require('node-rest-client').Client;
      let client = new Client();
      client.get("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol="+ticker+"&apikey="+apikey, function (data, response) {

        let daily = data['Monthly Adjusted Time Series'];
        if(daily){

          let output = [];
          for(let date in daily){
            // output.push([
            //   daily[date]['1. open'],
            //   daily[date]['2. high'],
            //   daily[date]['3. low'],
            //   daily[date]['4. close'],
            //   daily[date]['5. adjusted close'],
            //   daily[date]['6. volume'],
            //   daily[date]['7. dividend amount']
            // ]);
            daily[date]['date'] = date;
            output.push(daily[date]);
          }

          output.reverse();

          resolve(output);
        }else{
          reject(Error(data['Information']));
        }
      });
    });
  }

  static generateData(data, windowSize) {
    let x = [];
    let y = [];
    for(let i=0; i<(data.length-windowSize); i++){
      let thisX = [];
      for(let j=i; j<(i+windowSize); j++){
        thisX.push([data[j]['1. open']]);
      }
      x.push(thisX);
      y.push([data[(i+windowSize)]['1. open']]);
    }

    var xTensor = tf.tensor3d(x);
    var yTensor = tf.tensor3d(y);

    return {xTensor, yTensor}
    // return {'x': x, 'y': y};
  }





}

export default Data
