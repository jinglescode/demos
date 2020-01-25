export class TicTacToeAgent {

  eps = 0.1;
  alpha = 0.5;
  state_history = [];
  name = 0;
  V = [];
  skill_level = 0;

  constructor(name:number, eps=0.05, alpha=0.5) {
    this.eps = eps; // probability of choosing random action instead of greedy
    this.alpha = alpha; // learning rate
    this.state_history = [];
    this.name = name;
  }

  set_v(V){
    this.V = V;
  }

  set_skilllevel(v){
    this.skill_level = v;
  }

  set_eps(v){
    this.eps = v;
  }

  take_action(env, return_computation=false){

    let next_move = -1;
    let debug_moves = [];
    let strategy = "exploit";

    if(Math.random()<this.eps){
      strategy = "explore";

      let possible_moves = [];
      for(let i=0;i<env.board.length;i++){
        if(env.board[i]==0){
          possible_moves.push(i);
        }
      }

      next_move = possible_moves[Math.floor(Math.random()*possible_moves.length)];

    }else{
      let best_value = -1;
      let best_state = -1;

      for(let i=0;i<env.board_length*env.board_length;i++){
        if(env.board[i]==0){

          env.board[i] = this.name;
          let state = env.get_state();
          env.board[i] = 0;

          debug_moves.push([i, state, this.V[state]]);

          if(this.V[state] > best_value){
            best_value = this.V[state];
            best_state = state;
            next_move = i;
          }

        }
      }

    }

    if(return_computation){
      return [next_move, strategy, debug_moves];
    }else{
      return next_move;
    }

  }

  update_state_history(state){
    this.state_history.push(this.copy_obj(state));
  }

  update(env){
    let reward = env.get_reward(this.name);
    let target = this.copy_obj(reward);

    for(let i=this.state_history.length-1;i>=0;i--){
      let prev = this.state_history[i];
      let value = this.V[prev] + this.alpha*(target - this.V[prev]);
      this.V[prev] = value;
      // console.log(this.name, prev, this.V[prev]);
      target = this.copy_obj(value);
    }
    this.reset_history();
  }

  reset_history(){
    this.state_history = [];
  }

  copy_obj(obj:any) {
    return JSON.parse(JSON.stringify(obj));
  }

}
