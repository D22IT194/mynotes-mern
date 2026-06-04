import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const Navbar = () => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login")

        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    }

    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className='flex item-center justify-between'>
                    <h1 className='text-3xl font-bold text-primary font-mono trackig-tight'>
                        MyNotes
                    </h1>


                    <div className="flex items-center gap-4">
                        
                        {/* User Details (Appears exactly on the left side of the logout button) */}
                        <div className="hidden md:flex flex-col items-end">
                            <span className="font-semibold text-sm">
                                {user?.name}
                            </span>
                            <span className="text-xs opacity-70">
                                {user?.email}
                            </span>
                        </div>



                    
                        <button
                            className="btn btn-error"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                    {/* <div className='flex items-center gap-4'>
                        <Link to={"/create"} className='btn btn-primary'>
                            <PlusIcon className="size-5" />
                            <span className='hidden sm:inline'>Create Note</span>
                        </Link>

                    </div> */}

                </div>

            </div>

        </header >
    )
}

export default Navbar