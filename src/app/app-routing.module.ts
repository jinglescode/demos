import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { MnistComponent } from './components/mnist/mnist.component';
import { TfjsTimeseriesStocksComponent } from './components/tfjs-timeseries-stocks/tfjs-timeseries-stocks.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { PhrasesExtractionD3WordcloudComponent } from './components/phrases-extraction-d3-wordcloud/phrases-extraction-d3-wordcloud.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tfjs-timeseries-stocks', component: TfjsTimeseriesStocksComponent },
  { path: 'phrases-extraction-d3-wordcloud', component: PhrasesExtractionD3WordcloudComponent },
  { path: 'mnist', component: MnistComponent },
  { path: 'tictactoe', component: TicTacToeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
