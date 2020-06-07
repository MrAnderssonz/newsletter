import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {name: '', pass: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
  }

  handleChange = (event) =>
  {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }  

  handleSubmit = (event) => 
  {
      event.preventDefault();
      this.verifyLogin(this.state.name, this.state.pass)
  }

  verifyLogin = (userName, password) => 
  {
    var data = {userName: userName, password: password};
    
    fetch ("http://localhost:3100/users/login", {
      "method": "POST",
      "headers": {
        "Content-type":'application/json',
      },
      "body": JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {

        if(data.login)
        {
            this.props.getUser(data.userId);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", userName);
            localStorage.setItem("subStatus", data.subscription);
        }
    })
    .catch(err => {
      console.log(err);
    });
  }

    render()
    {
  
        return (
        <div className="App">
          <form onSubmit={this.handleSubmit}>
                <label>
                    Användare:
                    <input name="name" type="text" placeholder="Keyser Söze" value={this.state.name} onChange={this.handleChange} />
                    Lösenord:
                    <input name="pass" type="password" placeholder="‎IsRogerKint" value={this.state.pass} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Logga in" />
            </form>
        </div>
      );
    }
  }
  
  export default Login;