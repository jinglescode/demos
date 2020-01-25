# JavaScript Exhibits

Here are the list of JavaScript projects in this repo. I work on them during my free time. If you are interested to collaborate on working a cool JavaScript side project together, [reach out to me](https://jinglescode.github.io/), I will be happy to chat!

## Time Series Forecasting With TensorFlow.Js

Pull stock prices from online API and perform predictions using Recurrent Neural Network and Long Short-Term Memory (LSTM) with TensorFlow.js framework.

[Demo](https://jinglescode.github.io/demos/tfjs-timeseries-stocks/) |
[Code](https://github.com/jinglescode/demos/tree/master/src/app/components/tfjs-timeseries-stocks) |
[Read article on Medium:Towards Data Science](https://towardsdatascience.com/time-series-forecasting-with-tensorflow-js-1efd48ff2201)

## Reinforcement Learning Value Function with Tic Tac Toe

Reinforcement learning algorithm for agents to learn the tic-tac-toe, using the value function. Train the agent to play tic-tac-toe, by having 2 agents play against each other through simulation. You can experiment by adjusting 2 parameters, 1) learning rate and 2) probability of exploration of each agent. After training, try playing against the agent.

[Demo](https://jinglescode.github.io/demos/rl-value-function-tic-tac-toe) |
[Code](https://github.com/jinglescode/demos/tree/master/src/app/components/rl-value-function-tic-tac-toe) |
[Read article on Medium:Towards Data Science](https://towardsdatascience.com/reinforcement-learning-value-function-57b04e911152)

## Phrases Extraction And D3 Wordcloud

100% JavaScript solution to extracting ngrams from text and display high frequency in beautiful D3 wordcloud. Phrases (ngrams) extraction are done inside d3-wordcloud-phrases.js, there are a few params which you could tweak and edit stopwords list. Adjustments to wordcloud can be found in d3-wordcloud-wordcloud.js.

[Demo](https://jinglescode.github.io/demos/phrases-extraction-d3-wordcloud) |
[Code](https://github.com/jinglescode/demos/tree/master/src/app/components/phrases-extraction-d3-wordcloud)

# Features

- packages are shared among all the exhibits, reduces setup time and we can focus on building JavaScript projects
- each project are separated as different [app/components](https://github.com/jinglescode/demos/tree/master/src/app/components), this is neat

# Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install
```

That will install all the dependencies listed in `package.json`.

# Usage

Simply run

```
$ npm start
```

This project is build on [Angular](https://angular.io/), styles are based on [Material](https://material.angular.io/)
