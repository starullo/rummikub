import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const initialFormValues = {name: '', password: ''}

const Login = () => {

    const [formValues, setFormValues] = useState(initialFormValues)

    const {push} = useHistory();

    const handleChange = evt => {
        evt.preventDefault()
        setFormValues({...formValues, [evt.target.name]: evt.target.value})
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        axios.post('https://rummikub-be.herokuapp.com/auth/login', formValues)
        .then(res=>{
            window.localStorage.setItem('gameToken', res.data.token)
            window.localStorage.setItem('playerId', res.data.playerId)
            // window.localStorage.setItem('playerReady', "true")
            push("/lobby")
            console.log(res)
        })
        .catch(err=>{
            console.log(err.message)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name
                    <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">Password
                    <input
                    type="password"
                    value={formValues.password}
                    onChange={handleChange}
                    name="password"
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login
