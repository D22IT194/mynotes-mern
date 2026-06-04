import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";


const LoginPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await api.post("/auth/login",
                { email, password, }
            );


            localStorage.setItem("token", res.data.token);

            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success("Login sucessful");

            navigate("/");
        } catch (error) {
            console.log(error);

            toast.error(error.response?.data?.message || "Login Failed");
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

                            Login

                        </h2>

                        <form
                            onSubmit={handleLogin}
                        >

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
                                        ? "Logging in..."
                                        : "Login"
                                }

                            </button>

                        </form>

                        <p className="text-center mt-4">

                            Don't have account?

                            <Link
                                to="/signup"
                                className="text-primary ml-2"
                            >

                                Signup

                            </Link>

                        </p>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default LoginPage