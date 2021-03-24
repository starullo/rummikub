import React, {useState} from 'react'
import axios from "axios"
import {useHistory} from 'react-router-dom'

const initialFormValues = {name: "", password: ""}

const Register = () => {

    
    const [formValues, setFormValues] = useState(initialFormValues)

    const {push} = useHistory();

    const handleChange = evt => {
        evt.preventDefault()
        setFormValues({...formValues, [evt.target.name]: evt.target.value})
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        console.log(formValues)
        axios.post('http://localhost:4343/auth/register', formValues)
        .then(res=>{
            push('/lobby')
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
