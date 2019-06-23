import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../services/global.service";
import { TicTacToeAgent } from "./tic-tac-toe-agent";

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

  game_ended = false;
  winner = 0;
  board = [0,0,0,0,0,0,0,0,0];
  playerTurn = 1;

  ngOnInit() {
    this.train_agents(10);
  }

  grid_select(index){
    if(this.board[index] != 0){
      return false;
    }

    this.board[index] = this.playerTurn;

    if(this.check_game_over()){
      this.game_ended = true;
      console.log('game ended',this.game_ended, this.winner)

    }else{
      this.playerTurn = this.playerTurn * -1;
    }

  }

  check_game_over(){
    // rows
    for(let i=0;i<9;i+=3){
      let sum = 0;
      for(let j=i;j<i+3;j+=1){
        sum += this.board[j];
      }
      if(this.check_if_player_won(sum)){
        return true;
      }
    }

    // columns
    for(let i=0;i<3;i+=1){
      let sum = 0;
      for(let j=i;j<i+7;j+=3){
        sum += this.board[j];
      }
      if(this.check_if_player_won(sum)){
        return true;
      }
    }

    // diagonals
    if(
      this.check_if_player_won(this.board[0]+this.board[4]+this.board[8])
      ||
      this.check_if_player_won(this.board[2]+this.board[4]+this.board[6])
    ){
      return true;
    }

    if(!this.board.includes(0)){
      return true;
    }

    return false;
  }

  check_if_player_won(sum){
    if(sum==-3){
      this.winner = -1;
      return true;
    }else if(sum==3){
      this.winner = 1;
      return true;
    }
  }

  reset_game(){
    this.game_ended = false;
    this.winner = 0
    this.board = [0,0,0,0,0,0,0,0,0];
    this.playerTurn = 1;
  }

  get_reward(agent_number){
    if(!this.game_ended){
      return 0;
    }else{
      if(this.winner == agent_number){
        return 1;
      }else{
        return 0;
      }
    }
  }


  play_game(p1, p2){

    let current_agent = p1;

    for(let i=0;i<9;i++){

      let action = current_agent.take_action(this.board);
      this.grid_select(action);

      current_agent.update_state_history(this.board);

      if(this.game_ended){
        break;
      }

      if(current_agent == p1){
        current_agent = p2;
      }else{
        current_agent = p1;
      }
    }

    p1.update(this);
    p2.update(this);

  }

  train_agents(episode){

    const agentA = new TicTacToeAgent(1);
    const agentB = new TicTacToeAgent(-1);

    for(let i=0;i<episode;i++){
      this.play_game(agentA, agentB);
      this.reset_game();
    }


  }


}
