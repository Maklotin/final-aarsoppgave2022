import planB from "./plan_b.json"
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import React from 'react';







var passordSynlig = false

let eyeIcon = faEyeSlash

function gjoerPassordSynlig() {
  if (passordSynlig === false) {
    passordSynlig = true;
    eyeIcon = faEye
    document.getElementById("passordTekst").style.display = "inline"
    console.log(passordSynlig)
    console.log(eyeIcon)
  } else {
    passordSynlig = false;
    eyeIcon = faEyeSlash;
    document.getElementById("passordTekst").style.display = "none"
    console.log(passordSynlig)
    console.log(eyeIcon)
  }
}


class LoggInnConstructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brukerLoggetInn: 2
    };
  }
}

class App extends React.Component {


  render() {
    {LoggInnConstructor}
    if (this.state.brukerLoggetInn === 0) {
      return (
        <div className="App">
          <header className="App-header">
            <SpeedType />
          </header>
        </div>
      )
    } else if (this.state.brukerLoggetInn === 1) {
      return (
        <div className="App">
          <header className="App-header">
            <RegistrerBruker />
          </header>
        </div>
      )
    } else {
      return (
        <div className="App">
          <title>SpeedType</title>
          <header className="App-header">
            <LoggInn />
          </header>
        </div>
      )

    }


  }

}



class LoggInn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state)
  }


  render() {
    return <>
      {/*logg inn*/}
      <h1>Logg inn</h1>
      <input type="text" placeholder='brukernavn' className='input_text'></input>
      <div className='passord'>
        <input type="password" value={this.state.value} onChange={this.handleChange} placeholder='passord' className='input_text'></input>
        <FontAwesomeIcon className='eye_icon' id='eye_icon1' onClick={() => gjoerPassordSynlig()} icon={eyeIcon} />
      </div>
      <p id='passordTekst'>{this.state.value}</p>
      <div className='knapper'>
      <button className='knapper_login' onClick={() => this.setState({ brukerLoggetInn: this.state.brukerLoggetInn - 2})}><p>Logg Inn</p></button>
        <button className='knapper_login'><p>Registrer deg</p></button>
      </div>
    </>

  }

}

class SpeedType extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', data: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state)
  }
  async handleSubmit(event) {
    const response = await fetch('http://localhost:3005')
    const result = await response.json()


    console.log(result)

    this.setState({ data: result.msg });
    console.log(this.state)

    event.preventDefault();
  }

  render() {
    var planBArtikler = 'Trykk "start" for å starte SpeedType'

    function genererTekst() {
      planBArtikler = planB[Math.floor(Math.random() * 16)]
    }
    return (
      <>
        <div className="topp">
          <h1>Speed Type</h1>
          <p className="undertekst">Sjekk skrivehastigheten din her!</p>
        </div>
        <div className="hoveddel">

          {/*<button className='knapper_login' onClick={() => this.handleSubmit()}>test</button>*/}
          {/*<p className='text_info'>{ JSON.stringify(this.state.data)}</p>*/}
          <button className='knapper_login' onClick={() => genererTekst()}><p>Start</p></button>
          <p className='text_info'>{planBArtikler}</p>
        </div>


      </>
    )

  }

}

function RegistrerBruker() {
  return <>
    <h1>Registrer Bruker</h1>
  </>
}


export default App;
