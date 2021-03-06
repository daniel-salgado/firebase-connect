import React, { Component } from 'react'
import { app, googleProvider, } from '../../Database/Database';
import { auth } from 'firebase';

const loginStyles = {
    width: "90%",
    maxWidth: "315px",
    margin: "20px auto",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
};

class Login extends Component {
    constructor() {
        super()
        this.authWithGoogle = this.authWithGoogle.bind(this);
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this);

        this.state = {
            redirect: false,
            user: null,
            authenticated: false
        };
    }

    authWithGoogle() {

        console.log("We're authing with Google");

        app.auth().signInWithPopup(googleProvider)
            .then((result, error) => {
                if (error) {
                    //this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Google" })
                    alert("Unable to sign in with Google");
                } else {
                    this.setState({ redirect: true, authenticated: true });
                    console.log('[Login.js] authWithGoogle().result', result);
                    console.log('[Login.js] authWithGoogle().result.user', result.user);
                    console.log('[Login.js] authWithGoogle().result.credential', result.credential);
                    console.log('[Login.js] authWithGoogle().auth.currentUser', auth.currentUser);
                }
            });
    }

    authWithEmailPassword(event) {
        event.preventDefault()
        console.log("We're authing with password")
        console.table([{
            email: this.emailInput.value,
            password: this.passwordInput.value,
        }])
    }

    render() {



        return (
            <div style={loginStyles}>
                <button style={{ width: "100%" }} className="pt-button pt-intent-primary" onClick={() => this.authWithGoogle()}>Log In with Google</button>
                <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
                <form onSubmit={(event) => this.authWithEmailPassword(event)}>
                    <div style={{ marginBottom: "10px" }} className="pt-callout pt-icon-info-sign">
                        <h5>Note</h5>
                        If you don't have an account already, this form will create your account.
                    </div>
                    <label className="pt-label">
                        Email
                    <input style={{ width: "100%" }} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
                    </label>
                    <label className="pt-label">
                        Password
                    <input style={{ width: "100%" }} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
                    </label>
                    <input style={{ width: "100%" }} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>
                </form>
            </div>
        )



    }
}

export default Login