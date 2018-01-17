import React, { Component } from 'react';
import './App.css';
import Persons from './Components/Persons/Persons';
import Database from './Database/Database';


class App extends Component {

  state = {
    /*persons: [
      { id: '1', name: 'Daniel', age: 36 },
      { id: '2', name: 'Danielle', age: 29 },
      { id: '3', name: 'Israel', age: 33 }
    ]*/
    persons: []
  };

  addBear(){
    var immediatelyAvailableReference = Database.push('bears', {
      data: {name: 'George', type: 'Grizzly'},
      then(err){
        if(!err){
          console.log(err);
        }
      }
    });
    //available immediately, you don't have to wait for the callback to be called
    var generatedKey = immediatelyAvailableReference.key;
  }

  deletePersonHandler = (personIndex) => {

    //const persons = this.state.persons.slice(); //Copy the original array or
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });

  }

  changeNameHandler = (event, id) => {

    const persons = [...this.state.persons];

    const personIndex = this.state.persons.findIndex(p => { return p.id === id });
    const person = { ...persons[personIndex] };

    person.name = event.target.value;
    persons[personIndex] = person;

    this.setState({ persons: persons });

  }

  componentWillMount() {

    //persons from firebase//persons from state
    this.personRef = Database.syncState('persons', {
      context: this,
      state: "persons"
    });

  }

  componentWillUnmount() {
    Database.removeBinding(this.personRef);
  }


  render() {

    console.log('[App.js] Inside render()');

    const persons = (<Persons
      persons={this.state.persons}
      clicked={this.deletePersonHandler}
      changed={this.changeNameHandler} />);


    return (
      <div className="App">

      <button onClick={this.addBear}>Add Bear Motherfucker</button>
        {persons}
      </div>
    );
  }
}

export default App;
