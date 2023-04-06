import React, { useState } from 'react';

function Login(props) {

    const [formData, setFormData]= useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`, {method: "GET"});
        if(response.ok){
            const checkUser =await response.json();
            if(checkUser.length > 0){
                setMessage("Logged in successfully");
            }
            else{
                setMessage("Email/Password mismatch");
            }
        }
        else{
            setMessage("Please try again");
        }
    }

    return (
        <form>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type="text" name='email' className='form-control' onChange={handleChange} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type="password" name='password' className='form-control' onChange={handleChange}/>
            </div>
            <p>{message}</p>
            <button className='btn btn-primary' onClick={onSubmit}>Login</button>
        </form>
    );
}

export default Login;