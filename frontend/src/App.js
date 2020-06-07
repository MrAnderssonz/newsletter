import React from 'react';
import './App.css';
import Login from './Login';
import CreateNewUser from './CreateNewUser';
import ShowUserInfo from './ShowUserInfo';

class App extends React.Component {
  constructor(props)
  {
    super(props)

    this.state = {
      userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : null,
      showNewUserForm: false,
      showInfo: false }
  }
  
  setUserId = (inputId) => 
  {
    this.setState({userId: inputId});
  }

  newUserForm = () =>
  {
    this.setState({showNewUserForm: this.state.showNewUserForm ? false : true})
  }
  logOut = () =>
  {
    this.setState({userId: null})
    this.setState({showInfo: null})
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("subStatus");
  }
  showInfo = () =>
  {
    this.setState({showInfo: this.state.showInfo ? false : true})
  }

  render()
  {

      return (
      <div className="App">
      <h1 className="RedHead">Das News souuupersida</h1>
      {
        this.state.userId ? 
        <div> Välkommen in i värmen!
        <br></br><button onClick={this.showInfo}>{this.state.showInfo  ? "Dölj info" : "Visa info" }</button>
        {this.state.showInfo ? <ShowUserInfo></ShowUserInfo> :
        ""
        }
        <button onClick={this.logOut}>Logga ut</button>
        </div> : 
        <div>
        <Login getUser={this.setUserId}></Login>
        {this.state.showNewUserForm ?
          <div>
          <CreateNewUser></CreateNewUser> 
          <button onClick={this.newUserForm}>Ångra</button>
          </div> :
          <button onClick={this.newUserForm}>Skapa ny användare</button>
        }  
        </div>
      }
      </div>
    );
  }
}


export default App;
