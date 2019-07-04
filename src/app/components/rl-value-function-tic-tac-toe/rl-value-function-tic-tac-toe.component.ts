import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../services/global.service";
import { TicTacToeAgent } from "./tic-tac-toe-agent";
import { TicTacToeEnvironment } from "./tic-tac-toe-environment";

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './rl-value-function-tic-tac-toe.component.html',
  styleUrls: ['./rl-value-function-tic-tac-toe.component.css']
})
export class RLValueFunctionTicTacToeComponent implements OnInit {

  constructor(private service: GlobalService) {
    this.service.changePageTitle('Tic Tac Toe');
  }

  agent: TicTacToeAgent;
  environment: TicTacToeEnvironment;

  agentA: TicTacToeAgent;
  agentB: TicTacToeAgent;

  input_episodes: number;
  input_agent1_explore_probability = 0;
  input_agent1_learning_rate = 0;
  input_agent2_explore_probability = 0;
  input_agent2_learning_rate = 0;

  strategy: String;
  agent_probability = [];

  demo_agentx_graph_1 = {data:[], layout:{}};
  demo_agentx_graph_2 = {data:[], layout:{}};
  demo_agento_graph_1 = {data:[], layout:{}};
  demo_agento_graph_2 = {data:[], layout:{}};
  demo_agento_graph_1_zero = {data:[], layout:{}};
  demo_agento_graph_2_zero = {data:[], layout:{}};


  ngOnInit() {
    this.environment = new TicTacToeEnvironment(3);
    this.agentA = new TicTacToeAgent(1);
    this.agentB = new TicTacToeAgent(-1);
    this.input_episodes = 1;
    this.input_agent1_explore_probability = 0.05;
    this.input_agent1_learning_rate = 0.5;
    this.input_agent2_explore_probability = 0.05;
    this.input_agent2_learning_rate = 0.5;

    this.generate_epsilon_greedy_charts();

    this.input_episodes = 10000;
    this.train_agents();
  }

  play_again(){
    this.environment.reset_game();
    this.play_with_agent();
  }

  async play_game(p1, p2, simulation=false){

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

      if(simulation){
        await this.sleep(1000);
      }
    }

    p1.update(this.environment);
    p2.update(this.environment);

  }

  train_agents(){

    this.agentA = new TicTacToeAgent(1, this.input_agent1_explore_probability, this.input_agent1_learning_rate);
    this.agentB = new TicTacToeAgent(-1, this.input_agent2_explore_probability, this.input_agent2_learning_rate);

    let episode = this.input_episodes;

    let state_winner_triples = this.get_state_hash_and_winner(this.environment);

    let V_list = this.initial_values(this.environment, state_winner_triples, this.agentA.name, this.agentB.name);
    this.agentA.set_v(V_list[0]);
    this.agentB.set_v(V_list[1]);

    for(let i=0;i<episode;i++){
      this.play_game(this.agentA, this.agentB);
      this.environment.reset_game();
    }

    this.agentA.skill_level = episode;
    this.agentB.skill_level = episode;

    console.log('train_agents completed');

    this.play_with_agent();
  }

  agent_simulation(){
    this.environment.reset_game();
    this.play_game(this.agentA, this.agentB, true);
  }

  play_with_agent(){

    this.agentA.set_eps(0);

    let action = this.agentA.take_action(this.environment, true);
    let next_move = action[0];
    this.strategy = action[1];

    this.agent_probability = [0,0,0,0,0,0,0,0,0];
    for(let i=0;i<action[2].length;i++){
      this.agent_probability[action[2][i][0]] = (action[2][i][2] * 100).toFixed(1) + "%";
    }

    this.environment.grid_select(next_move);

    this.agentA.update_state_history(this.environment.get_state());

    if(this.environment.ended){
      this.agentA.update(this.environment);
      console.log('ended');
    }

  }

  human_player_move(i){

    this.environment.grid_select(i);

    if(this.environment.ended){
      this.agentA.update(this.environment);
      console.log('ended');
    }else{
      this.play_with_agent();
    }
  }

  get_state_hash_and_winner(env, i=0, j=0){
    let results = [];

    let options = [0,-1,1];//[0, 1, -1];

    for (var vi=0; vi<options.length; vi++) {
      let v = options[vi];
      env.set_cell(i, j, v);
      // console.log(i, j, v, env.board);

      if (j == 2){
        if (i == 2){
          let state = env.get_state();
          let ended = env.is_game_over(env.board);
          let winner = env.winner;
          results.push([state, winner, ended])
        }
        else{
          results = results.concat(this.get_state_hash_and_winner(env, (i+1), 0));
        }
      }
      else{
        results = results.concat(this.get_state_hash_and_winner(env, i, (j+1)));
      }

    }
    return results;
    // env.reset_game();
  }

  initial_values(env, state_winner_triples, p1, p2){

    let V1 = [];
    let V2 = [];

    let V = [];
    for(let i=0;i<state_winner_triples.length;i++){
      V.push(0);
    }

    for(let i=0; i<state_winner_triples.length;i++){
      let v1 = 0.5;
      let v2 = 0.5;
      let state_winner_triple = state_winner_triples[i];
      let state = state_winner_triple[0];
      let winner = state_winner_triple[1];
      let ended = state_winner_triple[2];

      if(ended == true){
        if(winner == p1){
          v1 = 1;
          v2 = 0;
        }else{
          v1 = 0;
          v2 = 1;
        }
      }
      V1[state] = v1;
      V2[state] = v2;
    }
    // console.log('initialV',counter);
    return [V1,V2]
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  generate_epsilon_greedy_charts(){
    let chartdata_agent_x = JSON.parse('[{"eps": 0, "counter": [9017, 241]}, {"eps": 0.01, "counter": [9181, 262]}, {"eps": 0.02, "counter": [8864, 428]}, {"eps": 0.03, "counter": [9112, 353]}, {"eps": 0.04, "counter": [9080, 420]}, {"eps": 0.05, "counter": [9268, 359]}, {"eps": 0.06, "counter": [8773, 634]}, {"eps": 0.07, "counter": [8748, 691]}, {"eps": 0.08, "counter": [8772, 731]}, {"eps": 0.09, "counter": [8569, 858]}, {"eps": 0.1, "counter": [8527, 916]}, {"eps": 0.11, "counter": [8400, 1015]}, {"eps": 0.12, "counter": [8231, 1172]}, {"eps": 0.13, "counter": [8221, 1144]}, {"eps": 0.14, "counter": [8021, 1350]}, {"eps": 0.15, "counter": [8048, 1329]}, {"eps": 0.16, "counter": [7855, 1454]}, {"eps": 0.17, "counter": [7790, 1528]}, {"eps": 0.18, "counter": [7815, 1533]}, {"eps": 0.19, "counter": [7712, 1615]}, {"eps": 0.2, "counter": [7665, 1681]}, {"eps": 0.3, "counter": [6655, 2592]}, {"eps": 0.4, "counter": [5982, 3244]}, {"eps": 0.5, "counter": [5128, 4087]}, {"eps": 0.6, "counter": [4127, 5146]}, {"eps": 0.7, "counter": [3436, 5880]}, {"eps": 0.8, "counter": [2583, 6840]}, {"eps": 0.9, "counter": [1984, 7532]}, {"eps": 1.0, "counter": [1454, 8180]}]');
    let chartdata_agent_o = JSON.parse('[{"eps": 0, "counter": [535, 8993]}, {"eps": 0.01, "counter": [628, 8887]}, {"eps": 0.02, "counter": [627, 8790]}, {"eps": 0.03, "counter": [582, 8898]}, {"eps": 0.04, "counter": [591, 8855]}, {"eps": 0.05, "counter": [603, 8856]}, {"eps": 0.06, "counter": [598, 8879]}, {"eps": 0.07, "counter": [603, 8832]}, {"eps": 0.08, "counter": [516, 8946]}, {"eps": 0.09, "counter": [476, 9107]}, {"eps": 0.1, "counter": [473, 9069]}, {"eps": 0.11, "counter": [499, 9008]}, {"eps": 0.12, "counter": [534, 8772]}, {"eps": 0.13, "counter": [477, 8918]}, {"eps": 0.14, "counter": [498, 9009]}, {"eps": 0.15, "counter": [538, 8957]}, {"eps": 0.16, "counter": [505, 8978]}, {"eps": 0.17, "counter": [457, 9028]}, {"eps": 0.18, "counter": [430, 9133]}, {"eps": 0.19, "counter": [501, 8975]}, {"eps": 0.2, "counter": [503, 8921]}, {"eps": 0.3, "counter": [445, 9106]}, {"eps": 0.4, "counter": [433, 9083]}, {"eps": 0.5, "counter": [475, 9073]}, {"eps": 0.6, "counter": [583, 8946]}, {"eps": 0.7, "counter": [479, 9144]}, {"eps": 0.8, "counter": [421, 9317]}, {"eps": 0.9, "counter": [291, 9513]}, {"eps": 1.0, "counter": [232, 9662]}]');
    let chartdata_agent_o_zero = JSON.parse('[{"eps": 0, "counter": [7927, 1563]}, {"eps": 0.01, "counter": [8010, 1846]}, {"eps": 0.02, "counter": [8256, 1619]}, {"eps": 0.03, "counter": [7841, 2028]}, {"eps": 0.04, "counter": [8272, 1596]}, {"eps": 0.05, "counter": [8246, 1618]}, {"eps": 0.06, "counter": [7821, 2059]}, {"eps": 0.07, "counter": [7290, 2584]}, {"eps": 0.08, "counter": [7102, 2775]}, {"eps": 0.09, "counter": [7201, 2665]}, {"eps": 0.1, "counter": [7605, 2294]}, {"eps": 0.11, "counter": [7210, 2667]}, {"eps": 0.12, "counter": [6321, 3529]}, {"eps": 0.13, "counter": [6991, 2886]}, {"eps": 0.14, "counter": [6654, 3215]}, {"eps": 0.15, "counter": [6441, 3415]}, {"eps": 0.16, "counter": [6606, 3254]}, {"eps": 0.17, "counter": [6505, 3358]}, {"eps": 0.18, "counter": [6092, 3761]}, {"eps": 0.19, "counter": [6139, 3715]}, {"eps": 0.2, "counter": [5906, 3955]}, {"eps": 0.3, "counter": [4985, 4856]}, {"eps": 0.4, "counter": [3934, 5900]}, {"eps": 0.5, "counter": [3935, 5855]}, {"eps": 0.6, "counter": [2712, 7086]}, {"eps": 0.7, "counter": [1933, 7848]}, {"eps": 0.8, "counter": [1438, 8338]}, {"eps": 0.9, "counter": [1045, 8715]}, {"eps": 1.0, "counter": [758, 9010]}]');

    let x_all = [];
    let x_initial = [];
    let agentx_graph_1_win=[];
    let agentx_graph_1_lost=[];
    let agentx_graph_2_win=[];
    let agento_graph_1_win=[];
    let agento_graph_1_lost=[];
    let agento_graph_2_win=[];
    let agento_zero_graph_1_win=[];
    let agento_zero_graph_1_lost=[];
    let agento_zero_graph_2_win=[];

    for(let i=0; i<chartdata_agent_x.length; i++){
      x_all.push(chartdata_agent_x[i].eps);

      agentx_graph_1_win.push(chartdata_agent_x[i].counter[0]);
      agentx_graph_1_lost.push(chartdata_agent_x[i].counter[1]);

      agento_graph_1_win.push(chartdata_agent_o[i].counter[0]);
      agento_graph_1_lost.push(chartdata_agent_o[i].counter[1]);

      agento_zero_graph_1_win.push(chartdata_agent_o_zero[i].counter[0]);
      agento_zero_graph_1_lost.push(chartdata_agent_o_zero[i].counter[1]);

      if(i<=20){
        x_initial.push(chartdata_agent_x[i].eps);
        agentx_graph_2_win.push(chartdata_agent_x[i].counter[0]);
        agento_graph_2_win.push(chartdata_agent_o[i].counter[0]);
        agento_zero_graph_2_win.push(chartdata_agent_o_zero[i].counter[0]);
      }
    }

    this.demo_agentx_graph_1 = {
      data: [
        { x: x_all, y: agentx_graph_1_win, name: "Won" },
        { x: x_all, y: agentx_graph_1_lost, name: "Lost" }
      ],
      layout: {height: 350, title: "Agent X (eps increment) vs Agent O (eps 0.05)", autosize: true}
    };
    this.demo_agentx_graph_2 = {
      data: [
        { x: x_initial, y: agentx_graph_2_win, name: "Won" }
      ],
      layout: {height: 350, title: "Agent X (eps increment) vs Agent O (eps 0.05)", autosize: true}
    };
    this.demo_agento_graph_1 = {
      data: [
        { x: x_all, y: agento_graph_1_win, name: "Won" },
        { x: x_all, y: agento_graph_1_lost, name: "Lost" }
      ],
      layout: {height: 350, title: "Agent O (eps increment) vs Agent X (eps 0.05)", autosize: true}
    };
    this.demo_agento_graph_2 = {
      data: [
        { x: x_initial, y: agento_graph_2_win, name: "Won" }
      ],
      layout: {height: 350, title: "Agent O (eps increment) vs Agent X (eps 0.05)", autosize: true}
    };
    this.demo_agento_graph_1_zero = {
      data: [
        { x: x_all, y: agento_zero_graph_1_win, name: "Won" },
        { x: x_all, y: agento_zero_graph_1_lost, name: "Lost" }
      ],
      layout: {height: 350, title: "Agent O (eps increment) vs Agent X (eps 1)", autosize: true}
    };
    this.demo_agento_graph_2_zero = {
      data: [
        { x: x_initial, y: agento_zero_graph_2_win, name: "Won" }
      ],
      layout: {height: 350, title: "Agent O (eps increment) vs Agent X (eps 1)", autosize: true}
    };
    window.dispatchEvent(new Event('resize'));
  }

}
