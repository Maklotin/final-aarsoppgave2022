import planB from "./plan_b.json"
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';
import db from './db'
import cors from 'cors'
import express from 'express'
import mysql from 'mysql'

const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json)





function App() {

  var [brukernavn, setBrukernavn] = useState()
  var [passord, setPassord] = useState()


  const [state, setState] = useState()
  const [verdi, setVerdi] = useState()

  const [brukerLoggetInn, setBrukerLoggetInn] = useState(2)
  var [icon, setIcon] = useState(faEyeSlash)
  var [passordSynlighet, setPassordSynlighet] = useState(false)

  /*constructor(props) {
    super(props);
    this.state = { value: '', data: "", brukerLoggetInn: 2 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }*/

  function gjoerPassordSynlig() {
    //gjør det du skriver i passord inputet synig
    if (passordSynlighet === false) {
      setPassordSynlighet(passordSynlighet = true)
      setIcon(icon = faEye)
      document.getElementById("passordTekst").style.display = "inline"
    } else {
      setPassordSynlighet(passordSynlighet = false)
      setIcon(icon = faEyeSlash)
      document.getElementById("passordTekst").style.display = "none"
    }
  }

  function registrerBruker(event) {
    setBrukernavn(brukernavn = document.getElementById("brukernavn_reg").value)
    setPassord(passord = document.getElementById("passord_reg"))

    setBrukerLoggetInn(brukerLoggetInn + 2)

    app.post('/api/create', (req, res) => {

      const username = brukernavn;
      const password = passord;

      db.query("INSERT INTO brukere (Brukernavn, Passord) VALUES (?,?)", [username, password], (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(result)
      });
    })

  }


  //bekreft passord funksjon
  var liktPassord = null;



  /*if (passordInputReg === bekreftPassordInputReg) {
    liktPassord = "passordet matcher"
    document.getElementById("likt_passord").style.color = "#4b6043"
  } else {
    liktPassord = "passordet matcher ikke"
    document.getElementById("likt_passord").style.color = "#8E1600"
  }*/



  async function handleSubmit(event) {
    const response = await fetch('http://localhost:3005')
    const result = await response.json()


    console.log(result)

    setState(result.msg);
    console.log(state)

    event.preventDefault();
  }

  function LoggInn() {
    function handleChange(event) {
      setVerdi(event.target.value);
    }

    return (<>
      {/*logg inn*/}
      <h1>Logg inn</h1>
      <input type="text" placeholder='brukernavn' className='input_text'></input>
      <div className='passord'>
        <input type="password" value={verdi} onChange={handleChange} placeholder='passord' className='input_text'></input>
        <FontAwesomeIcon className='eye_icon' id='eye_icon1' onClick={() => gjoerPassordSynlig()} icon={icon} />
      </div>
      <p id='passordTekst'>{verdi}</p>
      <div className='knapper'>
        <button className='knapper_login' onClick={() => setBrukerLoggetInn(brukerLoggetInn - 2)}><p>Logg Inn</p></button>
        <button className='knapper_login' onClick={() => setBrukerLoggetInn(brukerLoggetInn - 1)}><p>Registrer deg</p></button>
      </div>
    </>)
  }

  function SpeedType() {
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
  function RegistrerBruker() {

    return <>
      <h1>Registrer Bruker</h1>
      <input type="text" id="brukernavn_reg" placeholder='brukernavn' className='input_text'></input>
      <input type="password" id="passord_reg" placeholder='passord' className='input_text'></input>
      <input type="password" placeholder='bekreft passord' className='input_text'></input>
      <p id='likt_passord'>{liktPassord}</p>
      <div className='knapper'>
        <button className='knapper_login' onClick={(e) => registrerBruker(e)}><p>Registrer bruker</p></button>
      </div>
    </>
  }

  if (brukerLoggetInn === 0) {
    return (
      <div className="App">
        <header className="App-header">
          <SpeedType />
        </header>
      </div>
    )
  } else if (brukerLoggetInn === 1) {
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






export default App;
