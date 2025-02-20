// make the lebel white on theme ternary condition. also implement the ternary operation to make the input's bg transparent and base-100
import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { ThemeContext } from '../Provider/ThemeProvider';
import axios from 'axios';

const Login = () => {
    const { logInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, setTheme, handleToggle } = useContext(ThemeContext)
    const { logInGoogle } = useContext(AuthContext)

    const handleGoogleLogin = () => {
        logInGoogle()
            .then(res => {
                Swal.fire({
                    title: "Successfully☺️",
                    text: "Successfully Loged in.",
                    icon: "success"
                });
                navigate(location?.state ? location.state : '/')
                const user = { Name: res.user.displayName, email: res.user.email }
                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(data => {
                        console.log(data)
                    })
            })
            .catch(error => {
                Swal.fire({
                    title: error.message,
                    icon: "error"
                });
            })
    }

    return (
        <div className={`${theme === 'light' ? 'bg-[#111827] text-white' : 'bg-base-100 text-black'} shadow-md fixed top-0 w-full`}>
            <div className="hero min-h-screen">
                <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-12 justify-items-end">
                    {/* Image Section */}
                    <div className="order-2 lg:order-first text-center lg:text-left w-full">
                        <img
                            className='w-10/12'
                            src="https://i.ibb.co.com/jk56WZQS/514bb4ea-bdd6-47f0-89c7-afb30518063e-removebg-preview.png" alt="Blood Donation" />
                    </div>

                    {/* Login Form */}
                    <div className={`${theme === 'light' ? 'bg-[#1f2937] !text-white' : 'bg-base-100 text-black'} card bg-base-100 w-11/12 shadow-2xl mt-20 md:mt-0`}>
                        <form className="card-body pb-0">
                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className={`${theme === 'light' ? 'text-white' : 'text-black'} label-text`}>Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="bg-transparent border-1 border-[#374151] focus:border-[#374151] input input-bordered"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className={`${theme === 'light' ? 'text-white' : 'text-black'} label-text`}>Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    className="bg-transparent border-1 border-[#374151] focus:border-[#374151] input input-bordered"
                                    required
                                />
                                <label className="label flex justify-between">
                                    <NavLink to="/register" className={`${theme === 'light' ? 'text-white' : 'text-black'} hover:!text-white label-text-alt link link-hover font-semibold`}>
                                        Register
                                    </NavLink>
                                </label>
                            </div>

                            {/* Login Button */}
                            <div className="form-control mt-6 pb-5">
                                <button className="btn bg-white hover:bg-white text-black border-0">
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="form-control p-8 pt-0">
                            <button onClick={handleGoogleLogin} className="btn bg-white hover:bg-white text-black border-0">
                                LogIn with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
