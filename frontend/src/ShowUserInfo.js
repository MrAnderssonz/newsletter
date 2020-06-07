import React from 'react';

class ShowUserInfo extends React.Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem("subStatus") === "true")
    {
        this.state = {isSub: true};
    }
    else
    {
        this.state = {isSub: false}
    }
    this.changeSub = this.changeSub.bind(this);
    this.change = this.change.bind(this);
  }

changeSub = () =>
{
    this.setState(({isSub: this.state.isSub ? false : true}), () =>
    localStorage.setItem("subStatus", (this.state.isSub) ));
}

change = () =>
{
    
    let id = localStorage.getItem("userId");
    fetch("http://localhost:3100/users/" + id , 
    {
      "method": "PUT",
      "body": JSON.stringify({
        "subscription": this.state.isSub
      }),
      "headers": {"Content-Type": 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      if(!data.sucessful) {
        console.log("Something went wrong!");
      }
    });
}
    render()
    {
  
        return (
        <div>
            <b>Anvädar info</b>
            <br></br>
            Namn: {localStorage.getItem("userName")}
            <br></br>
            Nyhetsbrev: {this.state.isSub ? 'Ja' : 'Nej' }
            <br></br><button onClick={this.changeSub}>{this.state.isSub  ? "Sluta prenumerera" : "Börja prenumerera" } </button>
            <br></br><button onClick={this.change}>Uppdatera </button>
        </div>
      );
    }
  }
  
  export default ShowUserInfo;