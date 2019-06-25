export class TicTacToeEnvironment {

  board = [];
  board_length: number;
  p1 = 1;
  p2 = -1;
  winner = 0;
  ended = false;
  num_states: number;
  player_turn = 1;

  constructor(board_length:number) {
    this.board_length = board_length;
    this.num_states = Math.pow(board_length,3);

    for(let i=0;i<Math.pow(board_length,2);i++){
      this.board.push(0);
    }
  }

  get_cell(i, j){
    return parseInt(this.board[(i*this.board_length)+j]);
  }

  set_cell(i, j, value){
    this.board[(i*this.board_length)+j] = value;
  }

  cell_is_empty(i, j){
    return this.get_cell(i, j) == 0;
  }

  grid_select(index){
    if(this.board[index] != 0){
      return false;
    }

    this.board[index] = this.player_turn;
    // console.log('player, ', this.player_turn, 'selected', index);

    if(this.is_game_over()){
      this.ended = true;
      // console.log('game ended, winner ', this.winner)

    }else{
      this.player_turn = this.player_turn * -1;
    }

  }

  reset_game(){
    this.winner = 0
    this.board = [];
    for(let i=0;i<Math.pow(this.board_length,2);i++){
      this.board.push(0);
    }
    this.player_turn = 1;
    this.ended = false;
  }

  get_reward(player:number){
    if(!this.is_game_over()){
      return 0;
    }
    if(this.winner == player){
      return 1;
    }else{
      return 0;
    }
  }

  get_state(){
    let v = 0;
    let k = 0;
    let h = 0;

    for(let i=0;i<this.board_length;i++){
      for(let j=0;j<this.board_length;j++){
        if(this.get_cell(i,j) == 0){
          v = 0;
        }else if (this.get_cell(i,j) == this.p1){
          v = 1;
        }else if (this.get_cell(i,j) == this.p2){
          v = 2;
        }

        h += Math.pow(3,k) * v;
        k++;

        // console.log(i, j, this.get_cell(i,j), v, h, k)
      }
    }
    return h;
  }

  is_game_over(force_recalculate=false){

    if(!force_recalculate && this.ended){
      return this.ended;
    }

    for(let i=0;i<(this.board_length*this.board_length);i+=3){
      let sum = 0;
      for(let j=i;j<i+this.board_length;j+=1){
        sum += this.board[j];
      }
      if(this.check_if_player_won(sum)){
        return true;
      }
    }

    // columns
    for(let i=0;i<this.board_length;i+=1){
      let sum = 0;
      for(let j=i;j<i+7;j+=this.board_length){
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

    let has_no_zeros = true;
    for(let i=0;i<this.board_length*this.board_length;i+=1){
      if(this.board[i] == 0){
        has_no_zeros = false;
        break;
      }
    }
    if(has_no_zeros){
      return true;
    }

    return false;
  }

  check_if_player_won(sum:number){
    if(sum==-3){
      this.winner = -1;
      return true;
    }else if(sum==3){
      this.winner = 1;
      return true;
    }
  }

}
