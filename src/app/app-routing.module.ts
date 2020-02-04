import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TfjsTimeseriesStocksComponent } from './components/tfjs-timeseries-stocks/tfjs-timeseries-stocks.component';
import { RLValueFunctionTicTacToeComponent } from './components/rl-value-function-tic-tac-toe/rl-value-function-tic-tac-toe.component';
import { PhrasesExtractionD3WordcloudComponent } from './components/phrases-extraction-d3-wordcloud/phrases-extraction-d3-wordcloud.component';
import { ClusteringD3ForceChartComponent } from './components/clustering-d3-force-chart/clustering-d3-force-chart.component';
import { NlpSentenceEncoderComponent } from './components/nlp-sentence-encoder/nlp-sentence-encoder.component';
import { DevtPlaygroundComponent } from './components/devt-playground/devt-playground.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tfjs-timeseries-stocks', component: TfjsTimeseriesStocksComponent },
  { path: 'phrases-extraction-d3-wordcloud', component: PhrasesExtractionD3WordcloudComponent },
  { path: 'rl-value-function-tic-tac-toe', component: RLValueFunctionTicTacToeComponent },
  { path: 'clustering-d3-force-chart', component: ClusteringD3ForceChartComponent },
  { path: 'nlp-sentence-encoder', component: NlpSentenceEncoderComponent },
  { path: 'devt-playground', component: DevtPlaygroundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
