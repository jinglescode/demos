## Time Series Forecasting with TensorFlow.js

Pull stock prices from online API and perform predictions using Recurrent Neural Network and Long Short-Term Memory (LSTM) with TensorFlow.js framework

Machine learning is becoming increasingly popular these days and a growing number of the world’s population see it is as a magic crystal ball: predicting when and what will happen in the future. This experiment uses artificial neural networks to reveal stock market trends and demonstrates the ability of time series forecasting to predict future stock prices based on past historical data.

<b>Disclaimer</b>: As stock markets fluctuation are dynamic and unpredictable owing to multiple factors, this experiment is 100% educational and by no means a trading prediction tool.

[View Demo](https://lonedune.github.io/tfjs-stocks/demo/)

[Read article on Towards Data Science](https://towardsdatascience.com/time-series-forecasting-with-tensorflow-js-1efd48ff2201)


### Get Stocks Data
Before we can train our neural network and make any predictions, we will first require data. The type of data we are looking for is time series: a sequence of numbers in chronological order. A good starting place to fetch these data is from alphavantage.co. This API allows us to retrieve chronological data on specific company stocks prices from the last 20 years.

The API yields the following fields:
- open price
- highest price of that day
- lowest price of that day
- closing price
- volume

To prepare training dataset for our neural network, we will be using closing stocks price; which also means that we will be aiming to predict future closing price.


### Simple Moving Average
For this experiment, we are using supervised learning, which means feeding data to the neural network and it learns by mapping input data to the output label. One way to prepare the training dataset is to extract Simple Moving Average from that time series data.

Simple Moving Average (SMA) is a method to identify trends direction for a certain period of time, by looking at the average of all the values within that time window. The number of prices in a time window is selected experimentally.

For example, let's assume the closing prices for past 5 days were 13, 15, 14, 16, 17, the SMA would be (13+15+14+16+17)/5 = 15. So the input for our training dataset is the set of prices within a single time window, and label is the computed moving average of those prices. Learn more about SMA.


### Train Neural Network
Now that you have the training data, it is time to create a model for time series prediction, to achieve this we will use TensorFlow.js framework.

Sequential model is selected which simply connects each layer and pass the data from input to the output during the training process. In order for the model to learn time series data which are sequential, recurrent neural network (RNN) layer is created and a number of LSTM cells are added to the RNN.

The model will be trained using Adam (read more), a popular optimisation algorithm for machine learning. Root mean square error which determine the difference between predicted values and the actual values, so model is able to learn by minimising the error during the training process.

These are the hyperparameters (parameters used in the training process) available for tweaking:
- Training Dataset Size (%): the amount of data used for training, and remaining data will be used for prediction
- Epochs: number of times the dataset is used to train the model (learn more)
- Learning Rate: amount of change in the weights during training in each step (learn more)
- Hidden LSTM Layers: to increase the model complexity to learn in higher dimensional space (learn more)


### Prediction
Now that you have trained your model, it is time to use it for predicting future values, for our case, it is the moving average. We are actually using the remaining data for prediction which allow us to see how closely our predicted values are compared to the actual values.
