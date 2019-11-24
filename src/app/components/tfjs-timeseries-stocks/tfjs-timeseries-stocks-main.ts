import * as tf from '@tensorflow/tfjs';

import { HttpClient } from '@angular/common/http';

export class TfjsTimeseriesStocksMain {

  input_dataset: number[];
  result: number[];
  data_raw: number[];
  sma_vec: number[];
  window_size: number;
  trainingsize: number;
  data_temporal_resolutions: string;

  constructor(private  httpClient:HttpClient) {
    this.input_dataset = [];
    this.result = [];
    this.data_raw = [];
    this.sma_vec = [];
    this.window_size = 50;
    this.trainingsize = 70;
    this.data_temporal_resolutions = 'Weekly';
  }

  async demo_1_fetchData(ticker:string, apikey:string, data_temporal_resolutions:string){

    return new Promise((resolve, reject) => {

      let output = {};

      let requestUrl = "";
      if(data_temporal_resolutions == 'Daily'){
        requestUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ticker+"&outputsize=full&apikey="+apikey;
      }else{
        requestUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol="+ticker+"&apikey="+apikey;
      }

      this.httpClient.get(requestUrl).subscribe(
        data  => {
          console.log("GET Request is successful ", data);

          let daily = [];
          if(data_temporal_resolutions == 'Daily'){
            daily = data['Time Series (Daily)'];
          }else{
            daily = data['Weekly Time Series'];
          }

          if(daily){
            let symbol = data['Meta Data']['2. Symbol'];
            let last_refreshed = data['Meta Data']['3. Last Refreshed'];

            let data_raw = [];

            for(let date in daily){
              data_raw.push({ timestamp: date, price: parseFloat(daily[date]['4. close']) });
            }

            data_raw.reverse();

            let message = "Symbol: " + symbol + " (last refreshed " + last_refreshed + ")";

            output['linegraph_title'] = message;

            if(data_raw.length > 0){
              let timestamps = data_raw.map(function (val) { return val['timestamp']; });
              let prices = data_raw.map(function (val) { return val['price']; });
              output['timestamps'] = timestamps;
              output['prices'] = prices;
            }

            output['data_raw'] = data_raw;
            output['success'] = true;

          }else{
            output['success'] = false;
            output['error_message'] = data['Information'];
          }

          resolve(output);

        },
        error  => {
          output['success'] = false;
          output['error_message'] = error;

          reject(output);
        }
      );

    });

  }

  demo_2_compute_sma(data_raw, input_windowsize){
    let output = {};
    output['data_sma_vec'] = this.computeSMA(data_raw, input_windowsize);

    output['sma'] = output['data_sma_vec'].map(function (val) { return val['avg']; });
    output['prices'] = data_raw.map(function (val) { return val['price']; });

    output['timestamps_a'] = data_raw.map(function (val) { return val['timestamp']; });
    output['timestamps_b'] = data_raw.map(function (val) {
      return val['timestamp'];
    }).splice(input_windowsize, data_raw.length);

    // table
    // output['demo_2_table'] = [];
    // let set = output['data_sma_vec'].map(function (val) { return val['set']; });
    // let data_output = "";
    // for (let index = 0; index < 25; index++){
    //   let row = {
    //     index: (index + 1),
    //     x: set[index].map(function (val) {
    //       return (Math.round(val['price'] * 10000) / 10000).toString();
    //     }),
    //     y: output['data_sma_vec'][index]['avg']
    //   };
    //   output['demo_2_table'].push(row);
    // }

    return output;
  }

  async trainModel(model_params, callback){

    console.log(model_params);

    let inputs = model_params['inputs'];
    let outputs = model_params['outputs'];
    let trainingsize = model_params['input_trainingsize'];
    let window_size = model_params['input_windowsize'];
    let n_epochs = model_params['input_epochs'];
    let learning_rate = model_params['input_learningrate'];
    let n_layers = model_params['input_hiddenlayers'];

    const input_layer_shape  = window_size;
    const input_layer_neurons = 50;

    const rnn_input_layer_features = 10;
    const rnn_input_layer_timesteps = input_layer_neurons / rnn_input_layer_features;

    const rnn_input_shape  = [rnn_input_layer_features, rnn_input_layer_timesteps];
    const rnn_output_neurons = 20;

    const rnn_batch_size = window_size;

    const output_layer_shape = rnn_output_neurons;
    const output_layer_neurons = 1;

    let X = inputs.slice(0, Math.floor(trainingsize / 100 * inputs.length));
    let Y = outputs.slice(0, Math.floor(trainingsize / 100 * outputs.length));

    const xs = tf.tensor2d(X, [X.length, X[0].length]).div(tf.scalar(10));
    const ys = tf.tensor2d(Y, [Y.length, 1]).reshape([Y.length, 1]).div(tf.scalar(10));

    const model = tf.sequential();

    model.add(tf.layers.dense({units: input_layer_neurons, inputShape: [input_layer_shape]}));
    model.add(tf.layers.reshape({targetShape: rnn_input_shape}));

    let lstm_cells = [];
    for (let index = 0; index < n_layers; index++) {
         lstm_cells.push(tf.layers.lstmCell({units: rnn_output_neurons}));
    }

    model.add(tf.layers.rnn({
      cell: lstm_cells,
      inputShape: rnn_input_shape,
      returnSequences: false
    }));

    model.add(tf.layers.dense({units: output_layer_neurons, inputShape: [output_layer_shape]}));

    model.compile({
      optimizer: tf.train.adam(learning_rate),
      loss: 'meanSquaredError'
    });

    const hist = await model.fit(xs, ys,
      { batchSize: rnn_batch_size, epochs: n_epochs, callbacks: {
        onEpochEnd: async (epoch, log) => {
          callback(epoch, log, model_params);
        }
      }
    });

    // await model.save('localstorage://tfjs-stocks');
    // const model = await tf.loadLayersModel('localstorage://tfjs-stocks');
    // const hist = {};

    return { model: model, stats: hist };
  }

  makePredictions(X, model)
  {
      // let X = inputs.slice(Math.floor(size / 100 * inputs.length), inputs.length);
      const predictedResults = model.predict(tf.tensor2d(X, [X.length, X[0].length]).div(tf.scalar(10))).mul(10);
      return Array.from(predictedResults.dataSync());
  }


  computeSMA(data, window_size)
  {
    let r_avgs = [], avg_prev = 0;
    for (let i = 0; i <= data.length - window_size; i++){
      let curr_avg = 0.00, t = i + window_size;
      for (let k = i; k < t && k <= data.length; k++){
        curr_avg += data[k]['price'] / window_size;
      }
      r_avgs.push({ set: data.slice(i, i + window_size), avg: curr_avg });
      avg_prev = curr_avg;
    }
    return r_avgs;
  }


}
