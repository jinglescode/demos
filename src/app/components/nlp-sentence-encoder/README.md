# Build a Textual Similarity Web App with TensorFlow.js

Have you wondered how search engines understand your queries and retrieve relevant results? How chatbots extract your intent from your questions and provide the most appropriate response?

In this story, I will detail each part needed to build a textual similarity analysis web-app:

-   word embeddings
-   sentence embeddings
-   cosine similarity
-   build a textual similarity analysis web-app
-   analysis of results

Try the [textual similarity analysis web-app](https://jinglescode.github.io/demos/nlp-sentence-encoder), and let me know how it works for you in the comments below!

----------

# Word embeddings

Word embeddings enable **knowledge representation where a vector represents a word**. This improves the ability for neural networks to learn from a textual dataset.

Before word embeddings were de facto standard for natural language processing, a common approach to deal with words was to use a one-hot vectorisation. Each word represents a column in the vector space, and each sentence is a vector of ones and zeros. Ones denote the presence of the word in the sentence.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-02.webp)

One-hot vectorisation [taken from [Text Encoding: A Review](https://towardsdatascience.com/text-encoding-a-review-7c929514cccf)]

As a result, this leads to a huge and sparse representation, because there are much more zeros than ones. When there are many words in the vocabulary, this creates a large word vector. This might become a problem for machine learning algorithms.

One-hot vectorisation also fails to capture the meaning of words. For example, “_drink_” and “_beverage_”, even though these are two different words, they have a similar definition.

With word embeddings, semantically similar words have similar vectors representation. As a result, “_I would like to order a drink_” or “_a beverage_”, an ordering system can interpret that request the same way.

## In the past

Back in 2003, [Yoshua Bengio et al.](http://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf) introduced a language model concept. The focus of the paper is to learn representations for words, which allow the model to predict the next word.

This paper is crucial and led to the development to discover word embeddings. Yoshua received the Turing Award alongside with Geoffrey Hinton, and Yann LeCun.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-03.webp#skinny_image)

Input sequence of feature vectors for words, to a conditional probability distribution over words, to predict next word [image taken from [paper](http://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf)]

In 2008, [Ronan and Jason](https://thetalkingmachines.com/sites/default/files/2018-12/unified_nlp.pdf) worked on a neural network that could learn to identify similar words. Their discovery has opened up many possibilities for natural language processing. The table below shows a list of words and the respective ten most similar words.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-04.webp#float_left)
![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-05.webp#float_left)

Left figure: Neural network architecture for given input sentence, outputs class probabilities. Right table: 5 chosen words and 10 most similar words. [sources taken from [paper](https://thetalkingmachines.com/sites/default/files/2018-12/unified_nlp.pdf)]

In 2013, [Tomas Mikolov et al.](https://arxiv.org/pdf/1301.3781.pdf) introduced learning high-quality word vectors from datasets with billions of words. They named it _Word2Vec,_ and it contains millions of words in the vocabulary.

Word2Vec has become popular since then. Nowadays, the word embeddings layer is in all popular deep learning framework.

## Examples

On Google’s pretrained Word2Vec model, they trained on roughly 100 billion words from Google News dataset. The word “_cat_” shares the closest meanings to “_cats_”, “_dog_”, “_mouse_”, “_pet_”.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-06.webp)

The word “_cat_” is geometrically closer to to “_cats_”, “_dog_”, “_mouse_”, “_pet_”. [taken from [Embedding Projector](http://projector.tensorflow.org/)]

Word embedding also manages to recognise relationships between words. A classic example is the gender-role relationships between words. For example, “_man_” is to “_woman_” is like “_king_” is to “_queen_”.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-07.webp)

Interesting relationships between words learnt from GloVe unsupervised learning algorithm [[image source](https://nlp.stanford.edu/projects/glove/)]

## Dig deeper

[Galina Olejnik](https://medium.com/u/6da21bd709d) did an excellent job describing the motivation of word embeddings. From one-hot encoding and TF-IDF to GloVe and Poincaré.

[Word embeddings: exploration, explanation, and exploitation (with code in Python)](https://towardsdatascience.com/word-embeddings-exploration-explanation-and-exploitation-with-code-in-python-5dac99d5d795)

Here’s a 29-minute comprehensive article about various language models by [Dipanjan (DJ) Sarkar](https://medium.com/u/6278d12b0682). He covers Word2Vec, GloVe and FastText; do check this out, if you are planning to work on word embeddings.

[A hands-on intuitive approach to Deep Learning Methods for Text Data — Word2Vec, GloVe and FastText](https://towardsdatascience.com/understanding-feature-engineering-part-4-deep-learning-methods-for-text-data-96c44370bbfa)

## Do it yourself

TensorFlow has provided a [tutorial](https://www.tensorflow.org/tutorials/text/word_embeddings) on word embeddings and codes in this [Colab notebook](https://colab.research.google.com/github/tensorflow/docs/blob/master/site/en/tutorials/text/word_embeddings.ipynb). You can get your hands dirty with the codes and use it to train your word embeddings on your dataset. This can definitely help you get started.

For who enjoys animation, there is a cool embeddings visualisation on [Embedding Projector](http://projector.tensorflow.org/). Every dot represents a word, and you can visualise semantically similar words in a 3D space.

----------

We have word vectors to represent meanings for words; how about sentences?

# Universal Sentence Encoder

Like word embeddings, [universal sentence encoder](https://arxiv.org/pdf/1803.11175.pdf) is a versatile sentence embedding model that converts text into semantically-meaningful fixed-length vector representations.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-09.webp)

Universal Sentence Encoder encodes text into high dimensional vectors [taken from [TensorFlow Hub](https://tfhub.dev/google/universal-sentence-encoder/1)]

These vectors produced by the universal sentence encoder capture rich semantic information. We can use it for various natural language processing tasks, to train classifiers such as [classification](https://en.wikipedia.org/wiki/Sentiment_analysis) and [textual similarity analysis](https://en.wikipedia.org/wiki/Semantic_similarity).

There are two universal sentence encoder models by Google. One of them is based on a **Transformer** architecture and the other one is based on **Deep Averaging Network**.

**Transformer**, the sentence embedding creates context-aware representations for every word to produce sentence embeddings. It is designed for higher accuracy, but the encoding requires more memory and computational time. This is useful for sentiment classification where words like ‘not’ can change the meaning and able to handle double negation like “not bad”.

**Deep Averaging Network**, the embedding of words are first averaged together and then passed through a feedforward deep neural network to produce sentence embeddings. Unfortunately, by averaging the vectors, we lose the context of the sentence and sequence of words in the sentence in the process. It is designed for speed and efficiency, and some accuracy is sacrificed (especially on sarcasm and double negation). A great model for topic classification, classifying long articles into categories.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-10.webp#skinny_image)

Sentences are semantically similar if they can be answered by the same responses. [taken from [paper](https://arxiv.org/pdf/1804.07754.pdf)]

[Yinfei Yang et al.](https://arxiv.org/pdf/1804.07754.pdf) introduce a way to learn sentence representations using conversational data.

For example, “_How old are you?_” and “_What is your age?_”, both questions are semantically similar, a chatbot can reply the same answer “_I am 20 years old_”.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-11.webp#skinny_image)

“How are you?” and “How old are you?” have 33% similarity even though having identical words [[demo](https://jinglescode.github.io/demos/nlp-sentence-encoder)]

In contrast, while “_How are you?_” and “_How old are you?_” contain identical words, both sentences have different meanings. A chatbot has to understand the question and provide the appropriate response.

This is a heatmap showing the similarity between three sentences “_How old are you?_”, “_What is your age?_” and “_How are you?_”.

“_How are you?_” and “_How old are you?_” have low similarity score even though having identical words.

[Logeswaran et al.](https://arxiv.org/abs/1803.02893) introduced a framework to learn sentence representations from unlabelled data. In this paper, the decoder (_orange box_) used in prior methods is replaced with a classifier that chooses the target sentence from a set of candidate sentences (_green boxes_); it improves the performance of question and answer system.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-12.webp)

Replaces the decoder from prior methods with a classifier which chooses the target sentence from a set of candidate sentences [taken from [paper](https://arxiv.org/pdf/1803.02893.pdf)]

## Dig deeper

[Dipanjan (DJ) Sarkar](https://medium.com/u/6278d12b0682) explained the development of each embedding models. If you are keen to build a text classifier, his article detailed each step to perform sentiment analysis on movie reviews dataset.

[Deep Transfer Learning for Natural Language Processing — Text Classification with Universal](https://towardsdatascience.com/deep-transfer-learning-for-natural-language-processing-text-classification-with-universal-1a2c69e5baa9)

If you are curious to explore other language models, [Pratik Bhavsar](https://medium.com/u/c0101388583) compared the performance of various language models such as BERT, ELMo, USE, Siamese and InferSent. Learning to choose the correct one will improve the outcome of your results.

[Variety Of Encoders In NLP](https://medium.com/modern-nlp/on-variety-of-encoding-text-8b7623969d1e)

## Do it yourself

TensorFlow has provided a [tutorial](https://tfhub.dev/google/universal-sentence-encoder/1), a pretrained model and a [notebook](https://colab.research.google.com/github/tensorflow/hub/blob/50bbebaa248cff13e82ddf0268ed1b149ef478f2/examples/colab/semantic_similarity_with_tf_hub_universal_encoder.ipynb) on universal sentence encoder. Definitely check this out if you are thinking about building your own text classifier.

----------

With semantically-meaningful vectors for each sentence, how can we measure the similarity between sentences?

# Cosine similarity

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-13.webp)

Photo by [浮萍 闪电](https://unsplash.com/@vsmilelx?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

[Cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity) is a measure of similarity by calculating **the cosine angle between two vectors**. If two vectors are similar, the angle between them is small, and the cosine similarity value is closer to 1.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-14.webp#skinny_image)

Given two vectors _A_ and _B_, the cosine similarity, cos(θ), is represented using a [dot product](https://en.wikipedia.org/wiki/Dot_product "Dot product") and [magnitude](https://en.wikipedia.org/wiki/Magnitude_%28mathematics%29#Euclidean_vector_space "Magnitude (mathematics)") [from [Wikipedia](https://en.wikipedia.org/wiki/Cosine_similarity)]

Here we input sentences into the universal sentence encoder, and it returns us sentence embeddings vectors.

With the vectors, we can take the cosine similarities between vectors. For every sentence pair, _A_ and _B_, we can calculate the cosine similarity of _A_ and _B_ vectors.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-15.webp)

Semantic similarity is a measure of the degree to which two pieces of text carry the same meaning. [taken from [TensorFlow Hub](https://tfhub.dev/google/universal-sentence-encoder/1)]

We can determine a minimum threshold to group sentence together. As similarity score falls between 0 to 1, perhaps we can choose 0.5, at the halfway mark. That means any sentence that is greater than 0.5 similarities will be cluster together.

## Dig deeper

[Euge Inzaugarat](https://medium.com/u/5515433d5913) introduced six methods to measure the similarity between vectors. Each method is suitable for a particular context, so knowing them it’s like knowing your data science toolbox well.

[How to measure distances in machine learning](https://towardsdatascience.com/how-to-measure-distances-in-machine-learning-13a396aa34ce)

----------

# Building blocks of a textual similarity analysis web-app

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-16.webp)

Photo by [Ryan Quintal](https://unsplash.com/@ryanquintal?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

In this project, I will be using these libraries:

-   TensorFlow.js
-   Universal sentence encoder
-   Angular

## TensorFlow.js

[TensorFlow.js](https://www.tensorflow.org/js) is a framework built by Google which enables machine learning in JavaScript. We can **develop machine learning models and deploy them in the web browser and Node.js**.

_As I enjoy developing web applications, I was so happy when TensorFlow.js released in 2018._

It is easy to get started, and we can install TensorFlow.js with [npm](https://www.npmjs.com/).
```
$ npm install @tensorflow/tfjs
```

An example of a simple linear regression model would look like this.

```
import * as tf from '@tensorflow/tfjs';

const model = tf.sequential();  
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);  
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

model.fit(xs, ys, {epochs: 10}).then(() => {  
  model.predict(tf.tensor2d([5], [1, 1])).print();  
});
```

## Universal sentence encoder

I will be using is the [universal sentence encoder package](https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder) from [TensorFlow.js](https://www.tensorflow.org/js). We can install universal sentence encoder using [npm](https://www.npmjs.com/).

```
$ npm install @tensorflow-models/universal-sentence-encoder
```

This is an example to show how we can extract embeddings from each sentence using universal sentence encoder.

```
import * as use from '@tensorflow-models/universal-sentence-encoder';

use.load().then(model => {  
  const sentences = [  
    'Hello.',  
    'How are you?'  
  ];  
  model.embed(sentences).then(embeddings => {  
    embeddings.print(true /* verbose */);  
  });  
});
```

## Angular

[Angular](https://angular.io/) is a web application framework built by Google for creating dynamic single-page apps.

For this project, I am using Angular 8.0. I enjoy building on Angular for its [model–view–controller design pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller). I have used Angular since its first version and for most of my web development. But since they roll out major releases every half a year, feeling that my work will become obsolete (maybe? I don’t know). [React](https://en.wikipedia.org/wiki/React_%28web_framework%29) is a popular UI framework, so perhaps I might switch to React one day. _Who knows?_

## Cosine similarity

Create a function to calculate the similarity of two vectors using the [cosine similarity formula](https://en.wikipedia.org/wiki/Cosine_similarity).
```
similarity(a, b) {  
  var magnitudeA = Math.sqrt(this.dot(a, a));  
  var magnitudeB = Math.sqrt(this.dot(b, b));  
  if (magnitudeA && magnitudeB)  
    return this.dot(a, b) / (magnitudeA * magnitudeB);  
  else return false  
}
```

Another function to calculate the similarity scores for every sentence pair as follows.

```
cosine_similarity_matrix(matrix){  
  let cosine_similarity_matrix = [];  
  for(let i=0;i<matrix.length;i++){  
    let row = [];  
    for(let j=0;j<i;j++){  
      row.push(cosine_similarity_matrix[j][i]);  
    }  
    row.push(1);  
    for(let j=(i+1);j<matrix.length;j++){  
      row.push(this.similarity(matrix[i],matrix[j]));  
    }  
    cosine_similarity_matrix.push(row);  
  }  
  return cosine_similarity_matrix;  
}
```

----------

## Combine everything together

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-17.webp)

Photo by [Amélie Mourichon](https://unsplash.com/@amayli?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

I have introduced all the major components needed for this project. Now we just have to stack them up like Legos, package it and deploy to Github.

Voilà! We get a [web application](https://jinglescode.github.io/demos/nlp-sentence-encoder) for a live demo.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-18.webp)

Input a list of sentences for semantic similarity [[demo](https://jinglescode.github.io/demos/nlp-sentence-encoder)]

We have a list of sentences, and these will be input into the universal sentence encoder. It will output will the embeddings of each sentence. Then we calculate the similarity between each sentence.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-19.webp)

## Results

These are the sentences we will be testing our universal sentence encoder. The objective is to group sentences with similar meaning together. I have picked a few difficult cases, so let us see how it performs.

> Will it snow tomorrow?  
> Recently a lot of hurricanes have hit the US  
> Global warming is real

> An apple a day, keeps the doctors away  
> Eating strawberries is healthy

> what is your age?  
> How old are you?  
> How are you?

> The dog bit Johnny  
> Johnny bit the dog

> The cat ate the mouse  
> The mouse ate the cat

This heatmap shows how similar each sentence are to other sentences. The brighter the green represents similarity closer to 1, which means the sentences are more identical to each other.

![](https://jinglescode.github.io/assets/img/posts/build-textual-similarity-analysis-web-app-20.webp)

Semantic similarity of 12 sentences pairs [[demo](https://jinglescode.github.io/demos/nlp-sentence-encoder)]

We can adjust the value to determine a minimum similarity threshold to group sentences together. These are the sentences grouped together with greater than 0.5 similarity value.

> **Group 1**  
> Recently a lot of hurricanes have hit the US  
> Global warming is real

> **Group 2**  
> An apple a day, keeps the doctors away  
> Eating strawberries is healthy

> **Group 3**  
> what is your age?  
> How old are you?

> **Group 4**  
> The dog bit Johnny  
> Johnny bit the dog

> **Group 5**  
> The cat ate the mouse  
> The mouse ate the cat

Our web application did an excellent job recognising “_Group 1_” being _weather-related issues_. Even though both sentences do not have any overlapping words.

It managed to identify that “_hurricanes_” and “_global warming_” are weather-related, but somehow didn’t manage to group the “_snow_” into this category.

Unfortunately, “_Johnny bit the dog” and “The dog bit Johnny” has an_ 87% similarity. _Poor Johnny, I don’t know which is better._

Likewise for “_The cat ate the mouse_” and “_The mouse ate the cat_”, I would be expecting that the two vectors to have an opposing similarity.

----------

Thanks for reading thus far!

Once again, do try the [textual similarity analysis web-app](https://jinglescode.github.io/demos/nlp-sentence-encoder), and let me know how it works for you in the comments below!

Check out the [codes](https://github.com/jinglescode/demos/tree/master/src/app/components/nlp-sentence-encoder) for the web application if you would like to build something similar.

----------

# Other machine learning web applications I’ve built

As I enjoy building web applications, I have developed these web-apps to showcase machine learning capabilities on the web. Do follow me on Medium ([Jingles](https://medium.com/@jinglesnote)) because I will be building more of such.

A time-series prediction with TensorFlow.js.

[Time Series Forecasting with TensorFlow.js](https://jinglescode.github.io/datascience/2019/05/17/time-series-forecasting-with-tensorflow-js/)

A reinforcement agent learning to play tic-tac-toe.

[Reinforcement Learning Value Function](https://jinglescode.github.io/datascience/2019/06/30/reinforcement-learning-value-function/)

----------
