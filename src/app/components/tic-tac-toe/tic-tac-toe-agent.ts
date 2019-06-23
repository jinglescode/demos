export class TicTacToeAgent {

  eps = 0.1;
  alpha = 0.5;
  verbose = false;
  state_history = [];
  name = 0;

  constructor(name, eps=1, alpha=0.5) {
    this.eps = eps; // probability of choosing random action instead of greedy
    this.alpha = alpha; // learning rate
    this.verbose = false;
    this.state_history = [];
    this.name = name;
  }

  take_action(board){

    if(Math.random()<this.eps){
      let possible_moves = []
      for(let i=0;i<board.length;i++){
        if(board[i]==0){
          possible_moves.push(i);
        }
      }

      return possible_moves[Math.floor(Math.random()*possible_moves.length)];

    }else{

    }
    let grid = board.length;
    return grid;
  }

  update_state_history(state){
    this.state_history.push(state);
  }

  update(env){
    let reward = env.get_reward(this.name);
    console.log(this.name, reward);

  }

}
