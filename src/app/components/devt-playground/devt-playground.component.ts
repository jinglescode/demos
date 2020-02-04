import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../services/global.service";

import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

@Component({
  selector: 'app-devt-playground',
  templateUrl: './devt-playground.component.html',
  styleUrls: ['./devt-playground.component.css']
})
export class DevtPlaygroundComponent implements OnInit {

  list_sentences = [];
  plotly_heatmap = {data:[], layout:{}};

  constructor(private service: GlobalService) { }

  ngOnInit() {
    this.service.changePageTitle('Development Playground');
    this.main();
  }

  get_embeddings(list_sentences, callback) {
      use.load().then(model => {
        model.embed(list_sentences).then(embeddings => {
          callback(embeddings);
        });
      });
  }

  dot(a, b){
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var sum = 0;
    for (var key in a) {
      if (hasOwnProperty.call(a, key) && hasOwnProperty.call(b, key)) {
        sum += a[key] * b[key]
      }
    }
    return sum
  }

  similarity(a, b) {
    var magA = Math.sqrt(this.dot(a, a));
    var magB = Math.sqrt(this.dot(b, b));
    if (magA && magB) return this.dot(a, b) / (magA * magB);
    else return false
  }

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

  async main(){
    let list_sentences = [
        // Smartphones
        "I like my phone",
        "My phone is not good.",
        "Your cellphone looks great.",

        // Weather
        "Will it snow tomorrow?",
        "Recently a lot of hurricanes have hit the US",
        "Global warming is real",

        // Food and health
        "An apple a day, keeps the doctors away",
        "Eating strawberries is healthy",
        "Is paleo better than keto?",

        // Asking about age
        "How old are you?",
        "what is your age?"
    ];


    let callback = function(embeddings) {

      console.log("embeddings", embeddings);

      let cosine_similarity_matrix = this.cosine_similarity_matrix(embeddings.arraySync());

      let colors = [];
      let base_color = 54;
      for(let i=0;i<=10;i++){
        colors.push([i/10, "rgb("+(base_color+(i*20))+", 0, 0)"]);
      }

      console.log(cosine_similarity_matrix);

      this.plotly_heatmap = {
          data: [
            {
              z: cosine_similarity_matrix,// [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
              x: list_sentences,
              y: list_sentences,
              type: 'heatmap',
              colorscale: colors
            }
          ],
          layout: {height:1200, title: "Similarity", autosize: true}
      };
    };

    let embeddings = await this.get_embeddings(list_sentences, callback.bind(this));

  }

  // async tokenizer(text){
  //   console.log('use 1');
  //   use.loadTokenizer().then(tokenizer => {
  //     return tokenizer.encode(text);
  //   });
  //   console.log('use 2');
  // }

}
