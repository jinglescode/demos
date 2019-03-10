import * as tf from '@tensorflow/tfjs';

import Data from './data.js';

const timeWindowWidth = 10;


function getTrainingData(){
  Data.loadFromAlphavantage('MSFT','demo').then(function(data) {
    console.log(111);

    console.log(data);

    let {x, y} = Data.generateData(data, timeWindowWidth);
    console.log(x);
    console.log(y);

    console.log(222);
  }, function(err) {
    console.log(err);
  });
}

getTrainingData();
