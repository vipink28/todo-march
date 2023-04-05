import React from 'react';

function Login(props) {
    return (
        <form>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type="text" name='email' className='form-control' />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type="password" name='password' className='form-control' />
            </div>
            <button className='btn btn-primary'>Login</button>
        </form>
    );
}

export default Login;