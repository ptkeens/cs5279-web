import React, { useState, ChangeEvent } from 'react';
import PropTypes from 'prop-types';

export default function Login( setToken  : React.Dispatch<React.SetStateAction<string>>) {

    const [ email, setEmail ] = useState<string>();
    const [ password, setPassword ] = useState<string>();

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        
    }

    return(
        <div className="login-wrapper">
            <h1></h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>E-mail</p>
                    <input type="text" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={(e => setPassword(e.target.value))}/>
                </label>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}