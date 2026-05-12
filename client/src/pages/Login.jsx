import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//axios is used to connect with the backend

function Login() {
    const [formData, setFormData] = useState({ username:'', password:'' });
    const [ error, setError ]= useState('');
    const navigate = useNavigate();

    const Submit = async(e) => {
        e.preventDefault();
        //as we don't want the page to reload on it's own so we use this

        try{
            const res = await axios.post('http://localhost:5001/api/auth/login', formData);
            //this call our backend
            //now we will save the token that we created for persistence

            localStorage.setItem('token', res.data.token);

            //redirect to home page
            navigate('/home');
        }
        catch(err){
            setError(err.response?.data?.msg || 'Login failed, try again!');
        }

        };

        return(
            <div className='flex flex-col items-center justify-center min-h-screen bg-zinc-950"'>
                <form onSubmit={Submit} className='p-8 border border-zinc-800 bg-zinc-900 rounded-lg shadow-xl w-80'>
                    <h2 className="text-2xl font-mono text-center mb-6 text-zinc-100 uppercase tracking-widest">Login</h2>

                    {error && <p className="text-rose-950 text-xs mb-4 text-center">{error}</p>}
                    {/*In this && basically checks if first part is true, it implements the second one */}

                    <input
                    type='text'
                    placeholder='Username'
                    className='w-full p-2 mb-4 bg-pink-100 border border-rose-950 text-white rounded focus:outline-none focus:border-zinc-500'
                    onChange={(e)=> setFormData({...formData, username: e.target.value})}
                    />
                    {/*...formData so we only update that field and not change other data */}

                    <input
                    type='password'
                    placeholder='Password'
                    className='w-full p-2 mb-4 bg-pink-100 border border-rose-950 text-white rounded focus:outline-none focus:border-zinc-500'
                    onChange={(e)=> setFormData({...formData, password: e.target.value})}
                    />

                    <button type='submit' className='w-full py-2 bg-rose-950 text-black-950 font-bold rounded hover:bg-zinc-300 transition-colors'>SUBMIT</button>

                </form>
            </div>
        );

    }
    export default Login;


