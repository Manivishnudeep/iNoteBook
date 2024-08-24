import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const host = 'http://localhost:5000'
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name:credentials.name,email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem("token", json.authToken)
            navigate("/")
        }
        else {
            alert('Error in regsitering user')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="name" class="form-label">name</label>
                    <input type="text" name='name' class="form-control" onChange={onChange} required minLength={3} id="name" />
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" required onChange={onChange} name='email' aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" onChange={onChange} required minLength={3} name='password' id="exampleInputPassword1" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
