import React, {useState, useEffect} from 'react'
import axios from "axios"
import {useHistory} from 'react-router-dom'

const db = "http://localhost:4343"

const initialFormValues = {name: "", password: ""}

const Register = () => {
useEffect(()=>{
    axios.get(`${db}/pieces`)
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
})
    
    const [formValues, setFormValues] = useState(initialFormValues)

    const {push} = useHistory();

    const handleChange = evt => {
        evt.preventDefault()
        setFormValues({...formValues, [evt.target.name]: evt.target.value})
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        axios.post(`${db}/auth/register`, formValues)
        .then(res=>{
            window.localStorage.setItem('playerId', res.data.playerId)
            // window.localStorage.setItem('playerReady', "true")
            push('/lobby')
             (res)
        })
        .catch(err=>{
        })
    }

    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name
                    <input
                    type="text"
                    value={formValues.name}
                    onChange={handleChange}
                    name="name"/>
                </label>
                <label htmlFor="password">Password
                    <input
                    type="password"
                    value={formValues.password}
                    onChange={handleChange}
                    name="password"/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register
