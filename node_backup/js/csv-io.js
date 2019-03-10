class CSVIO {
	/**
	 * Load a CSV file
	 * 
	 * @param {String} url url of the file to load
	 */
	static async load(csvURL){
		let response = await fetch(csvURL)
		let csvText = await response.text()
		let csvData = CSVIO.parse(csvText)
		return csvData
	}

	/**
	 * Parse a CSV content
	 * 
	 * @param {String} allText text to parse
	 */
	static parse(allText) {
		var allTextLines = allText.split(/\r\n|\n/);
		var headers = allTextLines[0].split(',');
		var lines = [];

		for (var i = 1; i < allTextLines.length; i++) {
			var data = allTextLines[i].split(',');
			if (data.length == headers.length) {

				var tarr = {};
				for (var j = 0; j < headers.length; j++) {
					tarr[headers[j]] = data[j]
				}
				lines.push(tarr);
			}
		}
		return lines
	}
}


export default CSVIO
