import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../services/global.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: GlobalService) { }

  ngOnInit() {
    this.service.changePageTitle('JavaScript Exhibits');
  }

  showcases = [
    {
      name:'Time Series Forecasting with TensorFlow.js',
      link:'./tfjs-timeseries-stocks',
      description:'Pull stock prices from online API and perform predictions using Recurrent Neural Network and Long Short-Term Memory (LSTM) with TensorFlow.js framework.'
    },
    {
      name:'Reinforcement Learning Value Function with Tic Tac Toe',
      link:'./rl-value-function-tic-tac-toe',
      description:'A simple reinforcement learning algorithm for agents to learn the game tic-tac-toe. This demonstrate the purpose of the value function.'
    },
    {
      name:'Phrases extraction and D3 Wordcloud',
      link:'./phrases-extraction-d3-wordcloud',
      description:'Extracting ngrams from text and display high frequency in beautiful D3 wordcloud.'
    },
    {
      name:'Sentence Similarity With TensorFlow.Js',
      link:'./nlp-sentence-encoder',
      description:'Encoding sentences into embedding vectors and perform sentence similarity'
    }
  ];

}
