import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { PlotlyViaWindowModule } from 'angular-plotly.js';

// material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule} from '@angular/material';

// components
import { HomeComponent } from './components/home/home.component';
import { TfjsTimeseriesStocksComponent } from './components/tfjs-timeseries-stocks/tfjs-timeseries-stocks.component';
import { RLValueFunctionTicTacToeComponent } from './components/rl-value-function-tic-tac-toe/rl-value-function-tic-tac-toe.component';
import { PhrasesExtractionD3WordcloudComponent } from './components/phrases-extraction-d3-wordcloud/phrases-extraction-d3-wordcloud.component';
import { ClusteringD3ForceChartComponent } from './components/clustering-d3-force-chart/clustering-d3-force-chart.component';

// directives

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TfjsTimeseriesStocksComponent,
    RLValueFunctionTicTacToeComponent,
    PhrasesExtractionD3WordcloudComponent,
    ClusteringD3ForceChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,

    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    PlotlyViaWindowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
