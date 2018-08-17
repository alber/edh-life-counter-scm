import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*** 
  PENDING: 
    4. finally use PUSH integration! with bookmarked tutorial+service
***/

/*** used to be inside Dashboard state
      life: 40,
      commander_damage: [null, 0, 0, 0, 0], 
      poison_damage: 0,
***/
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: 'idle',
      window_focus: 'life-window-unfocused',
      button_focus: 'updownbuttons-unfocused'
    };
  }
  
  
  toggleFocus() {
    const is_focused = (this.state.window_focus === 'life-window');
    if (is_focused) {
      this.handleBlur();
    } else {
      this.handleFocus();
    }
  }
  
  handleFocus() {
    this.setState({
      window_focus: 'life-window',
      button_focus: 'updownbuttons'
    });
  }
  
  handleBlur() {
    this.setState({
      window_focus: 'life-window-unfocused',
      button_focus: 'updownbuttons-unfocused'
    });
  }
  
  handleGitit() {
    var gunkval = Number(window.prompt('Git Whacked by How Much ?', 0));
    this.props.onRegularDamageClick(gunkval);
  }
  
  
  render() { //{this.props.player.substring(0,3)
    return (
      <div className="dashboard"> 

        <div className="mystats">
          <h3>{this.props.player}</h3>
          <div 
            className={this.state.window_focus}
            onClick={() => this.toggleFocus()}>
            {this.props.life}
          </div>
        </div>
        
        <ul className="pilllist">
          <Pillbutton 
            player="Alb" 
            damage={this.props.commander_damage[1]} /*j, n*/
            onClick={() => this.props.onCommanderDamageClick(1,1)} 
            onDmgClick={() => this.props.onCommanderDamageClick(1,-1)} />
          <Pillbutton 
            player="Ant" 
            damage={this.props.commander_damage[2]} 
            onClick={() => this.props.onCommanderDamageClick(2,1)} 
            onDmgClick={() => this.props.onCommanderDamageClick(2,-1)} />
          <Pillbutton 
            player="Wil" 
            damage={this.props.commander_damage[3]}
            onClick={() => this.props.onCommanderDamageClick(3,1)} 
            onDmgClick={() => this.props.onCommanderDamageClick(3,-1)} />
          <Pillbutton 
            player="Ser"
            damage={this.props.commander_damage[4]}
            onClick={() => this.props.onCommanderDamageClick(4,1)} 
            onDmgClick={() => this.props.onCommanderDamageClick(4,-1)} />  
        </ul>
      
        <button 
          className={this.state.button_focus}
          onClick={() => this.props.onRegularDamageClick(1)} 
          >
          +
        </button>
        <button 
          className={this.state.button_focus}
          onClick={() => this.props.onRegularDamageClick(-1)}>
          -
        </button>
        <button 
          className={this.state.button_focus}
          onClick={() => this.handleGitit()}>
          N
        </button>        
      
      </div>
    );
  }
}

class Pillbutton extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <li className='pillbutton'>
        <span onClick={() => this.props.onClick()} >{this.props.player}</span>
        <span onClick={() => this.props.onDmgClick()}className='pillcount'>{this.props.damage}</span>
      </li>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [null, "Alberto", "Antonio", "WillKarlAnthony", "Sergio"],
      lifes: [null, 40, 40, 40, 40],
      commander_damage: [ [], [null, 0, 0, 0, 0], [null, 0, 0, 0, 0], [null, 0, 0, 0, 0], [null, 0, 0, 0, 0] ], 
      poison_damage: [null, 0, 0, 0, 0],
      activity: 'idle',
    };
    
  }
  
  
  /***
   i: which player receives the damage
   n: the amount of damage or life gain points
  ***/
  handleRegularDamageClick(i,n) {
    const pre_lifes = this.state.lifes;
    const pre_life_val = pre_lifes[i];
    const new_life_val = pre_life_val + n;
    const new_lifes = [...pre_lifes];
    new_lifes[i] = new_life_val;
    
    this.setState({
      lifes: new_lifes
    });  
  }

  /*** 
    i: which player receives the damage
    j: which player dealt the damage
    n: the amount of damage or life gain points
  ***/
  handleCommanderDamageClick(i,j,n) {
    const all_current_commander_damage = this.state.commander_damage;
    const current_commander_damage = all_current_commander_damage[i];
    const new_commander_damage_val = current_commander_damage[j] + n;
    const new_commander_damage = [...current_commander_damage];
    new_commander_damage[j] = new_commander_damage_val;
    const new_all_commander_damage = [...all_current_commander_damage];
    new_all_commander_damage[i] = new_commander_damage;
    
    const pre_lifes = this.state.lifes;
    const pre_life_val = pre_lifes[i];
    const new_life_val = pre_life_val - n;
    const new_lifes = [...pre_lifes];
    new_lifes[i] = new_life_val;

    this.setState({commander_damage: new_all_commander_damage, lifes:new_lifes});    
  }
  
  render() {
    return (
      <div>
        <Dashboard 
          player={this.state.players[1]}
          life = {this.state.lifes[1]}
          commander_damage = {this.state.commander_damage[1]}
          onCommanderDamageClick = {(j,n) => this.handleCommanderDamageClick(1,j,n)}
          onRegularDamageClick = {(n) => this.handleRegularDamageClick(1,n)}
        />
        
        <Dashboard 
          player={this.state.players[2]}
          life = {this.state.lifes[2]}
          commander_damage = {this.state.commander_damage[2]}
          onCommanderDamageClick = {(j,n) => this.handleCommanderDamageClick(2,j,n)}
          onRegularDamageClick = {(n) => this.handleRegularDamageClick(2,n)}          
        />
        <Dashboard 
          player={this.state.players[3]}
          life = {this.state.lifes[3]}
          commander_damage = {this.state.commander_damage[3]}
          onCommanderDamageClick = {(j,n) => this.handleCommanderDamageClick(3,j,n)}
          onRegularDamageClick = {(n) => this.handleRegularDamageClick(3,n)}          
        />
        <Dashboard 
          player={this.state.players[4]}
          life = {this.state.lifes[4]}
          commander_damage = {this.state.commander_damage[4]}
          onCommanderDamageClick = {(j,n) => this.handleCommanderDamageClick(4,j,n)}
          onRegularDamageClick = {(n) => this.handleRegularDamageClick(4,n)}          
        />        
      </div>
    );
  }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);