class Model {
	////////////////////////////////////////////////////////////////////////
	//		Create a model
	////////////////////////////////////////////////////////////////////////
	
	static createLSTM(timeWindowWidth, options){
		// handle options values
		options = options || {}
		let learningRate = options.learningRate !== undefined ? options.learningRate : 0.05

		// build model and its layers
		const tfModel = tf.sequential();

		// tfModel.add(tf.layers.dense({
		// 	inputShape: [timeWindowWidth, 1],
		// 	units: 40,
		// 	activation: 'relu',
		// }));
	
		tfModel.add(tf.layers.lstm({
			inputShape: [timeWindowWidth, 1],
			units: 10,
			// activation: 'relu',
			returnSequences: true
		}));
		// tfModel.add(tf.layers.lstm({
		// 	units: 1,
		// 	activation: 'sigmoid',
		// 	returnSequences: true
		// }));
	
		tfModel.add(tf.layers.dense({
			units: 10,
			// activation: 'sigmoid',
		}));
	
		// tfModel.add(tf.layers.timeDistributed({
		// 	layer: tf.layers.dense({
		// 		units: 20
		// 	})
		// }));
		// tfModel.add(tf.layers.dropout({rate:0.1}));
		// tfModel.add(tf.layers.activation({
		// 	activation: 'softmax'
		// }));
		tfModel.add(tf.layers.dense({
			units: 1,
			// activation: 'sigmoid',
		}));
		// tfModel.add(tf.layers.activation({
		// 	activation: 'softmax'
		// }));
	
	
		// create the optimized
		// const optimizer = tf.train.sgd(0.1)
		const optimizer = tf.train.adam(learningRate);

		// compile the tfModel
		tfModel.compile({
			optimizer: optimizer,
			loss: tf.losses.meanSquaredError
		});
		// return the just built tfModel
		return tfModel
	}


	static createDenseOnly(timeWindowWidth, options){
		// handle options values
		options = options || {}
		let learningRate = options.learningRate !== undefined ? options.learningRate : 0.05

		// build model and its layers
		const tfModel = tf.sequential();

		tfModel.add(tf.layers.dense({
			inputShape: [timeWindowWidth, 1],
			units: 50,
			// activation: 'relu',
		}));
		// tfModel.add(tf.layers.dropout({rate:0.1}));
		// tfModel.add(tf.layers.dense({
		// 	units: 20,
		// 	// activation: 'relu',
		// }));
		// tfModel.add(tf.layers.dropout({rate:0.1}));
		tfModel.add(tf.layers.dense({
			units: 1,
			// activation: 'relu',
		}));
	
	
		// create the optimized
		const optimizer = tf.train.adam(learningRate);

		// compile the tfModel
		tfModel.compile({
			optimizer: optimizer,
			loss: tf.losses.meanSquaredError
		});
		// return the just built tfModel
		return tfModel
	}

	////////////////////////////////////////////////////////////////////////
	//		Train a model
	////////////////////////////////////////////////////////////////////////
	
	
	static async train(tfModel, xs, ys, options){
		// handle options values
		options = options || {}
		let epochs = options.epochs !== undefined ? options.epochs : 30
		let validationSplit = options.validationSplit !== undefined ? options.validationSplit : 0.3

		// compute batchSize
		let batchSize = options.batchSize
		if( batchSize === undefined ){
			batchSize = Math.floor(xs.shape[0] * 0.3)
			batchSize = Math.max(batchSize, 4)
			batchSize = Math.min(batchSize, 64)	
		}

		// Use tfjs-vis - TODO make that as an options from the caller. too hardcoded for here
		const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
		const container = { name: 'model.fit metrics', tab: 'Training' };
		const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
		const tfjsApplyWorkaroundCanvasSize = () => {
			// Working around a bug in tfvis - it keeps increasing the size of the canvas for no reason
			// - so here im forcing them back
			Array.from(document.querySelectorAll('.vega-embed canvas')).forEach( (canvasEl) => {
				canvasEl.style.height = '200px'
			})
		}

		// acutally start learning
		let response = await tfModel.fit(xs, ys, {
			batchSize,
			validationSplit,
			epochs,
			callbacks: {
				onBatchEnd: async (batch, logs) => {
					fitCallbacks.onBatchEnd.apply(this, [batch, logs])
					tfjsApplyWorkaroundCanvasSize()
				},
				onEpochEnd: (epoch, log) => {
					fitCallbacks.onEpochEnd.apply(this, [epoch, log])
					tfjsApplyWorkaroundCanvasSize()
				}
			}
		})

		return response
	}
}


export default Model
