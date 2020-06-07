import React from 'react';

class CreateNewUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {name: '', pass: "", mail: "", isSub: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) =>
  {
    const target = event.target;
    const value = target.name === 'isSub' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => 
  {
      this.newUser(this.state.name, this.state.mail, this.state.pass, this.state.isSub)
  }
  newUser = ( name, mail, pass, sub) =>
  {
    fetch("http://localhost:3100/users", 
    {
      "method": "POST",
      "headers": {
        "Content-type":'application/json',
      },
      "body": JSON.stringify({
            userName: name,
            mail: mail,
            password: pass,
            subscription: sub
          }),
    })
    .catch(err => {
        console.log(err);
    }); 

  }
    render()
    {
  
        return (
        <div className="NewUserForm">
            <b>Skapa nya användare</b>
          <form onSubmit={this.handleSubmit}>
                <label>
                    Namn:
                    <input name="name" type="text" placeholder="Keyser Söze" value={this.state.name} onChange={this.handleChange} />
                    <br></br>Epost:
                    <input name="mail" type="email" placeholder="keyser@badguy.com" value={this.state.mail} onChange={this.handleChange}/>
                    <br></br>Lösenord:
                    <input name="pass" type="password" placeholder="‎IsRogerKint" value={this.state.pass} onChange={this.handleChange}/>
                    <br></br>Nyhetsbrev?
                    <input name="isSub" type="checkbox" onChange={this.handleChange}></input>
                </label>
                <br></br><input type="submit" value="Skicka in" />
            </form>
        </div>
      );
    }
  }
  
  export default CreateNewUser;