import CSVIO from './csv-io.js'
import TimeSeries from './timeseries.js'
import Model from './model.js'

; (async function () {
	let timeWindowWidth = 10

	// let timeSeries = await TimeSeries.loadFromCSV('../data/GOOG-nov072018-dec072018.csv')
	// let timeSeries = await TimeSeries.loadFromCSV('../data/AAPL-dec072017-dec072018.csv')
	let timeSeries = TimeSeries.generateCos(100, 6)
	// let timeSeries = TimeSeries.generateLine(100)

	TimeSeries.displayTfvis({name: 'original data',	tab: 'Time Series'}, timeSeries)

	// let { transformedTimeSeries, inverseFunction } = TimeSeries.standardizeTransform(timeSeries)
	// let { transformedTimeSeries, inverseFunction } = TimeSeries.normalizeTransform(timeSeries)
	// TimeSeries.displayTfvis({name: 'Standardized data', tab: 'Time Series'}, transformedTimeSeries)
	// timeSeries = transformedTimeSeries
	// let inversedTimeSeries = inverseFunction(transformedTimeSeries)
	// TimeSeries.displayTfvis({name: 'Inversed data', tab: 'Time Series'}, inversedTimeSeries)


	////////////////////////////////////////////////////////////////////////
	//		Build Model
	////////////////////////////////////////////////////////////////////////

	// let tfModel = Model.createDenseOnly(timeWindowWidth, {
	// 	learningRate: 0.05
	// })
	let tfModel = Model.createLSTM(timeWindowWidth, {
		learningRate: 0.01
	})

	// basic usage of tfvis
	const surface = { name: 'Model Summary', tab: 'Model' };
	tfvis.show.modelSummary(surface, tfModel);

	////////////////////////////////////////////////////////////////////////
	//		learn
	////////////////////////////////////////////////////////////////////////

	let {xs, ys} = TimeSeries.buildLearningTensor(timeSeries, timeWindowWidth)
	xs.print()
	ys.print()

	console.log('xs', xs);
	console.log('ys', ys);

	// train the tfModel
	let learningResponse = await Model.train(tfModel, xs, ys, {
		epochs: 50,
		// batchSize: 100,
		validationSplit: 0.15,
	})

	// display learningResponse.params
	let {container, label, drawArea} = tfvis.visor().surface({name: 'Training Data', tab: 'Training'});
	drawArea.innerHTML = '<pre>' + JSON.stringify(learningResponse.params, null, '\t') + '</pre>'

	////////////////////////////////////////////////////////////////////////
	//		Predict
	////////////////////////////////////////////////////////////////////////

	let predictTimeSeries = TimeSeries.sliceTimeWindow(timeSeries, 0, timeWindowWidth)
	let actualTimeSeries = TimeSeries.sliceTimeWindow(timeSeries, 1, timeWindowWidth)

	let predictedTimeSeries = TimeSeries.predict(tfModel, predictTimeSeries, timeWindowWidth)

	console.log('predictedTimeSeries', predictedTimeSeries)
	console.log('actualTimeSeries', actualTimeSeries)


	////////////////////////////////////////////////////////////////////////
	//		Display result
	////////////////////////////////////////////////////////////////////////

	TimeSeries.displayTfvisMultiple({name: 'predicted timeWindow', tab: 'Predicting'}, [
		{timeSeries: actualTimeSeries, name: 'actual' },
		{timeSeries: predictedTimeSeries, name: 'predicted'},
	])

	let predictedOneAhead = TimeSeries.generatePredictOneAhead(tfModel, timeSeries, timeWindowWidth)
	TimeSeries.displayTfvisMultiple({name: 'One Ahead Prediction', tab: 'Predicting'}, [
		{timeSeries: timeSeries, name: 'Actual'},
		{timeSeries: predictedOneAhead, name: 'One Ahead'},
	])

	let predictedFullAhead = TimeSeries.generatePredictFullAhead(tfModel, timeSeries, timeWindowWidth)
	TimeSeries.displayTfvisMultiple({name: 'Full Ahead Prediction', tab: 'Predicting'}, [
		{timeSeries: timeSeries, name: 'Actual'},
		{timeSeries: predictedFullAhead, name: 'Full Ahead'},
	])
})()
