import React, { useState } from 'react';

function Register(props) {

    const [formData, setFormData]= useState(null);

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const onsubmit=async(e)=>{
        const obj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        e.preventDefault();
        // api call
        const response = await fetch(`http://localhost:5000/users`, obj);

        if(response.ok){
            alert("User Regsitered");
        }else{
            alert("something went wrong");
        }
    }




    return (
        <form>
            <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input type="text" name='username' className='form-control' onChange={handleChange} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type="text" name='email' className='form-control' onChange={handleChange} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type="password" name='password' className='form-control' onChange={handleChange}/>
            </div>
            <button className='btn btn-primary' onClick={onsubmit}>Register</button>
        </form>
    );
}

export default Register;