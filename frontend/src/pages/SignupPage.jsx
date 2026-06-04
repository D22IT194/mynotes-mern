import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";


const SignupPage = () => {

  const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await api.post("/auth/signup",
                { name, email, password  }
            );


            localStorage.setItem("token", res.data.token);

            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success("SignUp sucessful");

            navigate("/");
        } catch (error) {
            console.log(error);

            toast.error(error.response?.data?.message || "SignUp Failed");
        } finally {
            setLoading(false);
        }
    };


  return (
    <div>
        
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
        
                        <div className="card w-full max-w-md bg-base-100 shadow-xl">
        
                            <div className="card-body">
        
                                <h2 className="text-3xl font-bold text-center mb-6">
        
                                    SignUp
        
                                </h2>
        
                                <form
                                    onSubmit={handleSignUp}
                                >

                                                                        <div className="mb-4">
        
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="input input-bordered w-full"
                                            value={name}
                                            onChange={(e) =>
                                                setName(
                                                    e.target.value
                                                )
                                            }
                                        />
        
                                    </div>
        
                                    <div className="mb-4">
        
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="input input-bordered w-full"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(
                                                    e.target.value
                                                )
                                            }
                                        />
        
                                    </div>
        
                                    <div className="mb-4">
        
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="input input-bordered w-full"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(
                                                    e.target.value
                                                )
                                            }
                                        />
        
                                    </div>
        
                                    <button
                                        className="btn btn-primary w-full"
                                        disabled={loading}
                                    >
        
                                        {
                                            loading
                                                ? "SignUp in..."
                                                : "SignUp"
                                        }
        
                                    </button>
        
                                </form>
        
                                <p className="text-center mt-4">
        
                                    Already have an account?
        
                                    <Link
                                        to="/login"
                                        className="text-primary ml-2"
                                    >
        
                                        Login
        
                                    </Link>
        
                                </p>
        
                            </div>
        
                        </div>
        
                    </div>

    </div>
  )
}

export default SignupPage