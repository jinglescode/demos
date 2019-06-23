const tf = require('@tensorflow/tfjs');

export class TfData {

  constructor() {
    this.message = 'heyhey';

    // Boston Housing data constants:
    this.BASE_URL = 'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/';

    this.TRAIN_FEATURES_FN = 'train-data.csv';
    this.TRAIN_TARGET_FN = 'train-target.csv';
    this.TEST_FEATURES_FN = 'test-data.csv';
    this.TEST_TARGET_FN = 'test-target.csv';
  }

  async printit(){

    let x1 = tf.tensor([
      [1,2,3],
      [4,5,6],
      [7,8,9],
      [10,11,12],
      [13,14,15],
    ]);
    x1.print();

    // filter
    // .slice([0,0],[-1,3])

    let min = x1
      .min(0);
    let max = x1
      .max(0);

    x1
      .sub(min)
      .div(
        max.sub(min)
      ).print();




    // // Create a simple model.
    // const model = tf.sequential();
    // model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    //
    // // Prepare the model for training: Specify the loss and the optimizer.
    // model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    //
    // // Generate some synthetic data for training. (y = 2x - 1)
    // // const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    // // const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
    //
    // const xs = tf.tensor([
    //   [-1], [0], [1], [2], [3], [4]
    // ]);
    // const ys = tf.tensor([
    //   [-3], [-1], [1], [3], [5], [7]
    // ])
    //
    // // Train the model using the data.
    // await model.fit(xs, ys, {epochs: 250});
    //
    // // Use the model to do inference on a data point the model hasn't seen.
    // // Should print approximately 39.
    // document.getElementById('micro-out-div').innerText =
    //     model.predict(tf.tensor2d([20], [1, 1])).dataSync();

  }






}

// module.exports = TfData;
