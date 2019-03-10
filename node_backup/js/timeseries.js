import CSVIO from './csv-io.js'

class TimeSeries {

	////////////////////////////////////////////////////////////////////////
	//		Predict
	////////////////////////////////////////////////////////////////////////
	
	static predict(model, timeSeriesPredict, timeWindowWidth){
		console.assert(timeSeriesPredict.length === timeWindowWidth)
		const inputsTensor = TimeSeries.toTensor(timeSeriesPredict, timeWindowWidth)
	
		let predictionsTensor = model.predict(inputsTensor);
	
		let predictedTimeSeries = TimeSeries.fromTensor(predictionsTensor)

		return predictedTimeSeries
	}

	static generatePredictOneAhead(model, actualTimeSeries, timeWindowWidth){
		var newTimeSeries = actualTimeSeries.slice(0, timeWindowWidth)

		for(let timeStep = 0; timeStep < actualTimeSeries.length - timeWindowWidth; timeStep++){
			let inputTimeSeries = TimeSeries.sliceTimeWindow(actualTimeSeries, timeStep, timeWindowWidth)
			let predictedTimeSeries = TimeSeries.predict(model, inputTimeSeries, timeWindowWidth)
			let valueOneAhead = predictedTimeSeries[0]
			newTimeSeries.push(valueOneAhead)
		}
		console.assert(actualTimeSeries.length === newTimeSeries.length)
		return newTimeSeries
	}

	static generatePredictFullAhead(model, actualTimeSeries, timeWindowWidth){
		var newTimeSeries = actualTimeSeries.slice(0, timeWindowWidth)

		for(let timeStep = 0; timeStep < actualTimeSeries.length - timeWindowWidth; timeStep++){
			let inputTimeSeries = TimeSeries.sliceTimeWindow(newTimeSeries, timeStep, timeWindowWidth)
			let predictedTimeSeries = TimeSeries.predict(model, inputTimeSeries, timeWindowWidth)
			let valueOneAhead = predictedTimeSeries[0]
			newTimeSeries.push(valueOneAhead)
		}
		console.assert(actualTimeSeries.length === newTimeSeries.length)
		return newTimeSeries
	}

	////////////////////////////////////////////////////////////////////////
	//		Processing
	////////////////////////////////////////////////////////////////////////
	
	static slice(timeSeries, begin, end){
		return timeSeries.slice(begin, end)
	}

	static sliceTimeWindow(timeSeries, begin, timeWindowWidth){
		return timeSeries.slice(begin, begin + timeWindowWidth)
	}

	////////////////////////////////////////////////////////////////////////
	//		Transform
	////////////////////////////////////////////////////////////////////////
	

	static normalizeTransform(timeSeries){
		// compute minValue, maxValue
		let minValue = +Infinity
		let maxValue = -Infinity
		for(let value of timeSeries){
			minValue = Math.min(minValue, value)
			maxValue = Math.max(maxValue, value)
		}

		// normalize the values ```newValue = (value - min)/(max - min)```
		let transformedTimeSeries = []
		for(let timeIndex = 0; timeIndex < timeSeries.length; timeIndex++){
			transformedTimeSeries[timeIndex] = (timeSeries[timeIndex] - minValue) / (maxValue - minValue)
		}

		// build the inverseFunction
		let inverseFunction = function(timeSeries){
			// denormalize the values ```newValue = (value*(max-min) + min)```
			let inversedTimeSeries = []
			for(let timeIndex = 0; timeIndex < timeSeries.length; timeIndex++){
				inversedTimeSeries[timeIndex] = timeSeries[timeIndex]*(maxValue - minValue) + minValue
			}
			return inversedTimeSeries
		}

		// return the transformedTimeSeries and inverseFunction
		return { transformedTimeSeries, inverseFunction }
	}
	static standardizeTransform(timeSeries){
		// compute mean
		let mean = 0
		for(let timeIndex = 0; timeIndex < timeSeries.length; timeIndex++){
			mean += timeSeries[timeIndex]
		}
		mean /= timeSeries.length

		// compute standard deviation
		let standardDeviation = 0
		for(let timeIndex = 0; timeIndex < timeSeries.length; timeIndex++){
			standardDeviation += Math.pow(timeSeries[timeIndex] - mean, 2)
		}
		standardDeviation = Math.sqrt(standardDeviation / timeSeries.length)

		// standardize the values - value = (value - mean)/standardDeviation
		let transformedTimeSeries = []
		for(let timeIndex = 0; timeIndex < timeSeries.length; timeIndex++){
			transformedTimeSeries[timeIndex] = (timeSeries[timeIndex] - mean) / standardDeviation
		}

		// build the inverseFunction
		let inverseFunction = function(timeSeries){
			// de-standardize the values ```newValue = (value*standardDeviation + mean)```
			let inversedTimeSeries = []
			for(let timeIndex = 0; timeIndex < timeSeries.length; timeIndex++){
				inversedTimeSeries[timeIndex] = timeSeries[timeIndex]*standardDeviation + mean
			}
			return inversedTimeSeries
		}

		// return the transformedTimeSeries and inverseFunction
		return { transformedTimeSeries, inverseFunction }
	}

	////////////////////////////////////////////////////////////////////////
	//		Convert to Tensor
	////////////////////////////////////////////////////////////////////////

	static fromTensor(tensor){
		let timeSeries = Array.from(tensor.dataSync())	
		return timeSeries
	}

	static toTensor(timeSeries, timeWindowWidth){
		var xsValues = []
		for(let timeIndex = 0; timeIndex < timeSeries.length-timeWindowWidth+1; timeIndex++){
			// build input
			var input = timeSeries.slice(timeIndex, timeIndex + timeWindowWidth).map((value) => [value])
			// add input to xsValue
			xsValues.push(input)
		}
		// create the tensors for xsValues
		var xsTensor = tf.tensor3d(xsValues)

		return xsTensor
	}

	/**
	 * convert a timeSeries into a tensor
	 * 
	 * @param {Number[]} timeSeries the timeseries to convert
	 * @param {Number} timeWindowWidth the width of the time window
	 */
	static buildLearningTensor(timeSeries, timeWindowWidth){
		var xsValues = TimeSeries.slice(timeSeries, 0, timeSeries.length-timeWindowWidth)
		var xs = TimeSeries.toTensor(xsValues, timeWindowWidth)

		var ysValues = TimeSeries.slice(timeSeries, timeWindowWidth, timeSeries.length)
		var ys = TimeSeries.toTensor(ysValues, timeWindowWidth)


		console.assert(xsValues.length === ysValues.length)

		return { xs, ys }
	}

	////////////////////////////////////////////////////////////////////////
	//		Loading files
	////////////////////////////////////////////////////////////////////////
	

	/**
	 * Load a CSV file
	 * 
	 * @param {String} url url of the file to load
	 */
	static async loadFromCSV(csvURL){
		let csvData = await CSVIO.load(csvURL)
		let timeSeries = csvData.map((row) => parseFloat(row['Close']))
		return timeSeries
	}

	////////////////////////////////////////////////////////////////////////
	//		Generation of 'artificial' time series
	////////////////////////////////////////////////////////////////////////
	

	/**
	 * Generate a cosinus timeSerie
	 * 
	 * @param {Number} length length of the timeserie to generate
	 * @param {Number} period the period of the cosinus to generate
	 */
	static generateCos(length, period){
		let timeSeries = []
		for(let i = 0; i < length; i++){
			let angle = i * Math.PI*2 / period
			let value = Math.cos(angle)
			// let value = Math.abs(Math.cos(angle/2))
			timeSeries.push(value)
		}
		return timeSeries
	}

	static generateLine(length){
		let timeSeries = []
		for(let i = 0; i < length; i++){
			let value = i
			timeSeries.push(value)
		}
		return timeSeries
	}

	////////////////////////////////////////////////////////////////////////
	//		Display
	////////////////////////////////////////////////////////////////////////
	
	/**
	* Display historical data from csvData
	*/
	static displayTfvis(tfvisContainer, timeSeries, seriesName){
		seriesName = seriesName || 'Time Series'
		TimeSeries.displayTfvisMultiple(tfvisContainer, [{
			timeSeries: timeSeries,
			name: seriesName,
		}])
	}

	/**
	* Display historical data from csvData
	*/
	static displayTfvisMultiple(tfvisContainer, multipleTimeSeries){
		const surface = tfvis.visor().surface(tfvisContainer)

		// convert value before displaying them
		let seriesValues = []
		let seriesNames = []
		for(let item of multipleTimeSeries){
			let seriesValue = item.timeSeries.map((value, recordIndex) => new Object({ x: recordIndex, y: value, }))
			let seriesName = item.name
			seriesValues.push(seriesValue)
			seriesNames.push(seriesName)
		}

		// render value with tfvis
		tfvis.render.linechart({
			values: seriesValues,
			series: seriesNames,
		}, surface, {
			zoomToFit : true,
			xLabel : 'timeStep',
			yLabel : 'value',
		})
	}
}


export default TimeSeries
