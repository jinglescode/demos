# JavaScript Exhibits

Here are the list of JavaScript projects in this repo. I work on them during my free time. If you are interested to collaborate on working a cool JavaScript side project together, [reach out to me](https://jinglescode.github.io/), I will be happy to chat!

## Time Series Forecasting With TensorFlow.Js

Pull stock prices from online API and perform predictions using Recurrent Neural Network and Long Short-Term Memory (LSTM) with TensorFlow.js framework.

[Demo](https://jinglescode.github.io/demos/tfjs-timeseries-stocks/) |
[Code](https://github.com/jinglescode/demos/tree/master/src/app/components/tfjs-timeseries-stocks) |
[Article](https://jinglescode.github.io/datascience/2019/05/17/time-series-forecasting-with-tensorflow-js/)

Packages dependencies:
- @tensorflow/tfjs
- @angular/common/http

## Reinforcement Learning Value Function with Tic Tac Toe

Reinforcement learning algorithm for agents to learn the tic-tac-toe, using the value function. Train the agent to play tic-tac-toe, by having 2 agents play against each other through simulation. You can experiment by adjusting 2 parameters, 1) learning rate and 2) probability of exploration of each agent. After training, try playing against the agent.

[Demo](https://jinglescode.github.io/demos/rl-value-function-tic-tac-toe) |
[Code](https://github.com/jinglescode/demos/tree/master/src/app/components/rl-value-function-tic-tac-toe) |
[Article](https://jinglescode.github.io/datascience/2019/06/30/reinforcement-learning-value-function/)

## Phrases Extraction And D3 Wordcloud

100% JavaScript solution to extracting ngrams from text and display high frequency in beautiful D3 wordcloud. Phrases (ngrams) extraction are done inside d3-wordcloud-phrases.js, there are a few params which you could tweak and edit stopwords list. Adjustments to wordcloud can be found in d3-wordcloud-wordcloud.js.

[Demo](https://jinglescode.github.io/demos/phrases-extraction-d3-wordcloud) |
[Code](https://github.com/jinglescode/demos/tree/master/src/app/components/phrases-extraction-d3-wordcloud)

Packages dependencies:
- d3
- d3.layout.cloud

## Sentence Similarity With TensorFlow.Js Sentence Encoder

Universal Sentence Encoder [(Cer et al., 2018)](https://arxiv.org/pdf/1803.11175.pdf) is a language model that encodes text into fixed-length embeddings. It aims to convert sentences into semantically-meaningful dense real-valued vectors.

[Demo](https://jinglescode.github.io/demos/nlp-sentence-encoder) |
[Code](https://github.com/jinglescode/demos/tree/master/src/app/components/nlp-sentence-encoder) |
[Article](https://jinglescode.github.io/datascience/2020/02/10/build-textual-similarity-analysis-web-app/)

Packages dependencies:
- @tensorflow/tfjs
- @tensorflow-models/universal-sentence-encoder

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

This project is build on [Angular](https://angular.io/), styles are based on [Material](https://material.angular.io/).
