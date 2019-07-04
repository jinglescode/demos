## Reinforcement Learning Value Function with Tic Tac Toe

Reinforcement learning algorithm for agents to learn the tic-tac-toe, using the value function.

At any progression state except the terminal stage (where a win, loss or draw is recorded), the agent takes an action which leads to the next state, which may not yield any reward but would result in the agent a move closer to receiving a reward.

The value function is the algorithm to determine the value of being in a state, the probability of receiving a future reward.

The value of each state is updated reversed chronologically through the state history of a game, with enough training using both explore and exploit strategy, the agent will be able to determine the true value of each state in the game.

There are many ways to define a value function, this is just one that is suitable for a tic-tac-toe game.

Train the agent to play tic-tac-toe, by having 2 agents play against each other through simulation. You can experiment by adjusting 2 parameters, 1) learning rate and 2) probability of exploration of each agent. After training, try playing against the agent.

[Demo](https://jinglescode.github.io/demos/rl-value-function-tic-tac-toe)

[Read article on Medium:Towards Data Science](https://towardsdatascience.com/reinforcement-learning-value-function-57b04e911152)
