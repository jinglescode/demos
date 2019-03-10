/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tf from '@tensorflow/tfjs';
import {generateData, loadFromAlpha} from './data';
import {plotData, plotDataAndPredictions, renderCoefficients} from './ui';


async function predictMarket_old() {

  loadFromAlpha('MSFT','demo').then(function(data) {
    console.log('data', data);

    // var X = data[0];
    // var Y = data[1];

    // var maxLen = X.shape[0];
    // var vocabularySize = X.shape[1];
    //
    // const model = tf.sequential();
    // model.add(tf.layers.lstm({
    //   units: 50,
    //   recurrentInitializer: 'glorotNormal',
    //   inputShape: X.shape,
    //   returnSequences: true
    // }));
    //
    // model.add(tf.layers.timeDistributed({layer: tf.layers.dense({units: vocabularySize})}));
    // model.add(tf.layers.activation({activation: 'softmax'}));
    // model.compile({
    //   loss: 'categoricalCrossentropy',
    //   optimizer: 'adam',
    //   metrics: ['accuracy']
    // });




    const model = tf.sequential();
    model.add(tf.layers.lstm({units: 8, inputShape: [X.shape[0], X.shape[1]]}));
    model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));

    // Compile model to prepare for training.
    const learningRate = 4e-3;
    const optimizer = tf.train.rmsprop(learningRate);
    model.compile({
      loss: 'binaryCrossentropy',
      optimizer: optimizer,
      metrics: ['acc']
    });

    console.log('Training model...');
    const fitOutput = model.fit(
        X, Y, {
          epochs: 30,
          validationSplit: 0.15,
          callbacks: {
            onEpochEnd: async (epoch, logs) => {
              console.log(logs)
              // // Update the UI to display the current loss and accuracy values.
              // document.getElementById('train-epoch').value = epoch + 1;
              // document.getElementById('train-loss').value = logs.loss.toFixed(4);
              // document.getElementById('train-acc').value = logs.acc.toFixed(4);
              // document.getElementById('val-loss').value = logs.val_loss.toFixed(4);
              // document.getElementById('val-acc').value = logs.val_acc.toFixed(4);
            },
          }
        });

  // Memory clean up: Dispose the training data.
  X.dispose();
  Y.dispose();


  console.log(123);

  }, function(err) {
    console.log('err', err);
  });

}
// predictMarket();




function ComputeSMA(time_s, window_size)
{
     var r_avgs = [], avg_prev = 0;
     for (let i = 0; i <= time_s.length - window_size; i++)
     {
        var curr_avg = 0.00, t = i + window_size;
          for (let k = i; k < t && k <= time_s.length; k++)
               curr_avg += time_s[k]['price'] / window_size;

          r_avgs.push({ set: time_s.slice(i, i + window_size), avg: curr_avg });

          avg_prev = curr_avg;
     }

     return r_avgs;
}



async function predictMarket() {

  loadFromAlpha('MSFT','demo').then(function(data_raw) {
    console.log('data_raw', data_raw);

    var sma_vec = ComputeSMA(data_raw, 5);

    console.log('sma_vec',sma_vec);

    var inputs = sma_vec.map(function(inp_f) {
        return inp_f['set'].map(function(val) { return val['price']; })});
    console.log('inputs',inputs);

    var outputs = sma_vec.map(function(outp_f) { return outp_f['avg']; });
    console.log('outputs',outputs);


  }, function(err) {
    console.log('err', err);
  });

}
predictMarket();
