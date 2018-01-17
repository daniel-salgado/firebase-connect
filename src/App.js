import React, { Component } from 'react';
import './App.css';
import Persons from './Components/Persons/Persons';
import { base, app, googleProvider } from './Database/Database';
import Auth from './Components/Auth/Auth';
import Login from './Components/Auth/Login';
import User from './Components/Users/User';


class App extends Component {

  state = {
    /*persons: [
      { id: '1', name: 'Daniel', age: 36 },
      { id: '2', name: 'Danielle', age: 29 },
      { id: '3', name: 'Israel', age: 33 }
    ]*/
    persons: [],
    authenticated: false,
    user: null,
    loading: false
  };


  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {

        const loggedUser = {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          photoURL: user.photoURL,
          countLogs: 0
        }

        this.setState({
          authenticated: true,
          loading: false,
          user: loggedUser
        });

      }
      else {
        this.setState({
          authenticated: false,
          loading: false
        });

      }
    })

    console.log('[App.js] componentWillMount', this.state);

    /*this.songsRef = base.syncState('songs', {
      context: this,
      state: 'songs'
    });*/
  }

  /*
  componentWillMount() {

    //persons from firebase//persons from state
    this.personRef = base.syncState('persons', {
      context: this,
      state: "persons",
      asArray: true
    });

  }

  componentWillUnmount() {
    base.removeBinding(this.personRef);
  }
*/


  userLogoutHnadler() {
    app.auth().signOut().then((user, error) => {
      this.setState({ authenticated: false })
      console.log('[App.js] userLogoutHnadler()', this.state, user, error);

    });


  }

  addBear() {
    var immediatelyAvailableReference = base.push('persons', {
      data: { name: 'George', age: 666 },
      then(err) {
        if (!err) {
          console.log(err);
        }
      }
    });
    //available immediately, you don't have to wait for the callback to be called
    var generatedKey = immediatelyAvailableReference.key;

  }

  getBears() {

    console.log('Will get bears');

    /*Database.fetch('persons', {
      context: this,
      asArray: true,
      then(data) {
        console.log(data);
      }
    });*/

    const who = 'persons';

    base.fetch(who, {
      context: this, asArray: true
    }).then(data => {
      console.table(data);
    }).catch(error => {/*handle error*/ });


  }


  deletePersonHandler = (personIndex) => {

    //const persons = this.state.persons.slice(); //Copy the original array or
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });

  }

  changeNameHandler = (event, key) => {

    const persons = [...this.state.persons];

    console.log('persons: ', persons);

    const personIndex = this.state.persons.findIndex(p => { return p.key === key });
    const person = { ...persons[personIndex] };

    console.log('person: ', person);

    person.name = event.target.value;
    persons[personIndex] = person;

    this.setState({ persons: persons });


  }



  render() {

    console.log('[App.js] render', this.state);


    let persons = null;
    let user = null;
    let login = null;

    if (this.state.authenticated) {

      persons = (<Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.changeNameHandler} />);

      user = (<User authenticated={this.state.authenticated} user={this.state.user} logoutClicked={this.userLogoutHnadler} />);

    }
    else {
      login = (<Login />);
    }

    return (


      <div className="App">


        {login}

        {this.state.authenticated ? (<button onClick={this.addBear}>Add Bear Motherfucker</button>) : (null)}
        {this.state.authenticated ? (<button onClick={this.getBears}>Get all bears</button>) : (null)}

        {user}
      </div>

    );
  }
}

export default App;
