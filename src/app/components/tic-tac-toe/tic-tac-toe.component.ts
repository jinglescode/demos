import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../services/global.service";
import { TicTacToeAgent } from "./tic-tac-toe-agent";
import { TicTacToeEnvironment } from "./tic-tac-toe-environment";

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {

  constructor(private service: GlobalService) {
    this.service.changePageTitle('Reinforcement Learning : Tic Tac Toe');
  }

  agent: TicTacToeAgent;
  environment: TicTacToeEnvironment;

  agentA: TicTacToeAgent;
  agentB: TicTacToeAgent;

  // game_ended = false;
  // winner = 0;
  // board = [0,0,0,0,0,0,0,0,0];
  // playerTurn = 1;

  ngOnInit() {
    this.environment = new TicTacToeEnvironment(3);
    this.agentA = new TicTacToeAgent(1);
    this.agentB = new TicTacToeAgent(-1);
    this.train_agents();
    // this.train_agents(this.agentA, this.agentB, 1);
  }



  play_game(p1, p2){

    let current_agent = p1;

    for(let i=0;i<9;i++){
      let action = current_agent.take_action(this.environment);

      // console.log(current_agent.name, action, this.environment.get_state());
      this.environment.grid_select(action);

      p1.update_state_history(this.environment.get_state());
      p2.update_state_history(this.environment.get_state());

      if(this.environment.ended){
        break;
      }

      if(current_agent == p1){
        current_agent = p2;
      }else{
        current_agent = p1;
      }
    }

    p1.update(this.environment);
    p2.update(this.environment);

  }

  train_agents(){

    let episode = 10000;

    let state_winner_triples = [];
    this.get_state_hash_and_winner(state_winner_triples, this.environment);
    console.log(state_winner_triples);

    let p1_V = this.initialV(this.environment, state_winner_triples, this.agentA.name);
    this.agentA.set_v(p1_V);
    let p2_V = this.initialV(this.environment, state_winner_triples, this.agentB.name);
    this.agentB.set_v(p2_V);

    for(let i=0;i<episode;i++){
      this.play_game(this.agentA, this.agentB);
      this.environment.reset_game();
    }

    console.log('train_agents completed');
  }



  play_with_agent(){

    let action = this.agentA.take_action(this.environment);

    console.log(this.agentA.name, action, this.environment.get_state());
    this.environment.grid_select(action);

    this.agentA.update_state_history(this.environment.get_state());

    if(this.environment.ended){
      console.log('ended');
    }

  }

  human_player_move(i){

    this.environment.grid_select(i);

    if(this.environment.ended){
      console.log('ended');
    }else{
      this.play_with_agent();
    }
  }

  get_state_hash_and_winner(results, env, i=0, j=0){

    for (var v in [0, 1, -1]) {
     env.set_cell(i, j, v);

     if (j == 2){
       if (i == 2){
         let state = env.get_state();
         let ended = env.is_game_over(true);
         let winner = env.winner;

         // console.log(i,j, state, winner, ended)
         results.push([state, winner, ended])
       }
       else{
         results.concat(this.get_state_hash_and_winner(results, env, i + 1, 0));
       }
     }
     else{
       results.concat(this.get_state_hash_and_winner(results, env, i, j + 1));
     }
    }
    env.reset_game();
  }

  initialV(env, state_winner_triples, player){
    // initialize state values as follows
    // if x wins, V(s) = 1
    // if x loses or draw, V(s) = 0
    // otherwise, V(s) = 0.5

    // let counter = [0,0,0];
    let V = [];
    for(let i=0;i<state_winner_triples.length;i++){
      V.push(0.5);
    }

    for(let i=0; i<state_winner_triples.length;i++){
      let v = 0.5;
      let state_winner_triple = state_winner_triples[i];
      let state = state_winner_triple[0];
      let winner = state_winner_triple[1];
      let ended = state_winner_triple[2];
      if(ended == true){
        if(winner == player){
          v = 1;
          // counter[2]++;
        }else{
          v = 0;
          // counter[0]++;
        }
      }
      // if(v==0.5){
      //   counter[1]++;
      // }
      V[state] = v;
    }
    // console.log('initialV',counter);
    return V
  }


}
