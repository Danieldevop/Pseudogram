import React, { Component } from 'react';
import firebase from 'firebase'
import FileUpload from './FileUpload'
import './App.css';

class App extends Component {
  state = {
    user: null,
    pictures: []
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })

    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      })
    })
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  handleLogout() {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  handleUpload = event => {

    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`/photos/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

      this.setSate({
        uploadValue: percentage,
      })
    },

      error => {
        console.log(error.message)
      },

      () => {
        const record = {
          photoURL: this.state.user.photoURL,
          displayName: this.state.user.displayName,
          image: task.snapshot.downloadURL
        }

        const dbRef = firebase.database().ref('pictures')
        const newPicture = dbRef.push()
        newPicture.set(record)

      })
  }

  renderLoginButton() {
    if (this.state.user) {
      return (
        <div>
          <img width={200} src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola {this.state.user.displayName}</p>
          <button onClick={this.handleLogout}>Salir</button>
          <br />
          <FileUpload
            onUpload={this.handleUpload}
          />
          {
            this.state.pictures.map(picture => (
              <div>
                <img src={picture.image} alt="" width="300" />
                <br />
                <img src={picture.photoURL} alt={picture.displayName} width="50" />
                <br />
                <span>{picture.displayName}</span>
              </div>
            )).reverse()
          }
        </div>
      )
    }
    else {
      return (
        <button onClick={this.handleAuth}>Login with Google</button>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pseudogram</h1>
        </header>
        <div className="App-intro">
          {this.renderLoginButton()}
        </div>
      </div>
    );
  }
}

export default App;
