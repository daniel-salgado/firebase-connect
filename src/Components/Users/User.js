import React from 'react';
import './User.css';

const user = (props) => {

    console.log('[User.js]', props);

    const user = props.user;

    return (

        <div className="container">
            <div className="avatar-flip">
                <img src={user.photoURL} />
                <img src={user.photoURL} />
            </div>
            <p>User Logged: {props.authenticated.toString()}</p>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>User creationTime: {user.creationTime}</p>
            <p>User lastSignInTime: {user.lastSignInTime}</p>
            <button className="button" onClick={props.logoutClicked}>Logout</button>

        </div>
    );
};

export default user;