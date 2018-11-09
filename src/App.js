import React, { Component } from 'react';
import uuid from 'uuid';
import { validate }from 'isemail';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FirstExample />
      </div>
    );
  }
}


class FirstExample extends Component {
    state = {
      field: {
        name:'',
        email:''
      },
      fieldErrors:{},
      people:[]
    }

    clickHandler = () =>{
      const { field ,people} = this.state
      // if(!field.name.length || !field.email.length) {
      //   return
      // }
     
      const newItem = {
        name: field.name,
        email:field.email
      }

      const errors = this.validateInput(newItem);
      this.setState({
        fieldErrors:errors
      })
      if(Object.keys(errors).length) { return }

      this.setState({
        people:people.concat(newItem),
        field:{
          name:'',
          email:''
        }
      })
    }

    validateInput = person =>{
      console.log("called")
      const errors = {};
      if(!person.name) { errors.name ="Name Required" }
      if(!person.email) { errors.email = "Email Required" }
      if(person.email && !validate(person.email)) { errors.email = "Invalid Email" }
      return errors
    }

    changeHandler = (event) =>{
      const field  = this.state.field;
      field[event.target.name] = event.target.value;
      this.setState({field,
        fieldErrors:{}
      })
    }

    render(){
      const {field, people, fieldErrors} = this.state
      return(
        <div className="sign-up-sheet">
          <h1 className="title">Sign Up Sheet</h1>
          <div className="input-area">
            <label htmlFor="name">Name: </label>
            <input name="name" onChange={this.changeHandler} type="text" value={field.name} placeholder="Enter your name"/>
            <span style={{color:'red'}}>{fieldErrors.name}</span>
          </div>
         <div className="input-area">
          <label htmlFor="email">Email: </label>
            <input name="email" onChange={this.changeHandler} type="email" value={field.email} placeholder="Enter your email" />
            <span style={{color:'red'}}>{fieldErrors.email}</span>
         </div>
          <button onClick={this.clickHandler}>Submit</button>
          <h1>People</h1>
          <ul>
            {people.map(person => <li key={uuid.v4()}>{`${person.name} (${person.email})`}</li> )}
          </ul>
        </div>
      )
    }
}

export default App;
