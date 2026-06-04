import React from 'react'
import Navbar from '../components/Navbar';
import RateLImitedUI from '../components/RateLImitedUI';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';
import { Link } from 'react-router';
import { PlusIcon } from 'lucide-react';

const Homepage = () => {

    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [mediaFilter, setMediaFilter] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)

    const user = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {

        const fetchNotes = async () => {

            try {
                const endpoint =
  user?.role === "admin"
    ? `/admin/notes?search=${search}&mediaType=${mediaFilter}&page=${page}&limit=6`
    : `/notes?search=${search}&mediaType=${mediaFilter}&page=${page}&limit=6`;

                const res = await api.get(endpoint);
                console.log(res.data);
                setNotes(res.data.notes);
                setTotalPages(res.data.totalPages)
                setIsRateLimited(false);
            } catch (error) {
                console.log("Error Fetching Notes")
                console.log(error);
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes")
                }
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, [search, mediaFilter, page]);
    return (
        <div className="min-h-screen">

            <Navbar />

            <div className="flex justify-end mb-4 p-5">

                <Link
                    to={"/create"}
                    className="btn btn-primary"
                >

                    <PlusIcon className="size-5" />

                    <span className="hidden sm:inline">
                        Create Note
                    </span>

                </Link>

            </div>



            {isRateLimited && <RateLImitedUI />}

            <div className="max-w-7xl mx-auto mt-6 p-4 ">
                {loading && <div> <p className="text-center text-primary py-10">Loading notes...</p> </div>}

                {notes.length === 0 && !isRateLimited && <NotesNotFound />}




                {notes.length > 0 && !isRateLimited && (
                    <div className="flex flex-col md:flex-row gap-4 mb-6">

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search notes..."
                            className="input input-bordered w-full"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }
                            }
                        />


                        {/* Filter */}
                        <select
                            className="select select-bordered"
                            value={mediaFilter}
                            onChange={(e) => {
                                setMediaFilter(e.target.value);
                                setPage(1);
                            }
                            }
                        >
                            <option value="">
                                All Media
                            </option>

                            <option value="image">
                                Images
                            </option>

                            <option value="video">
                                Videos
                            </option>
                        </select>

                    </div>

                )}


                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}

                    </div>
                )}


                {notes.length > 0 && !isRateLimited && (

                    <div className="flex justify-center gap-4 mt-8">

                        <button
                            className="btn"
                            disabled={page === 1}
                            onClick={() =>
                                setPage((prev) => prev - 1)
                            }
                        >
                            Previous
                        </button>

                        <span className="flex items-center">

                            Page {page} of {totalPages}

                        </span>

                        <button
                            className="btn"
                            disabled={page === totalPages}
                            onClick={() =>
                                setPage((prev) => prev + 1)
                            }
                        >
                            Next
                        </button>

                    </div>

                )}


            </div>

        </div>
    )
}

export default Homepage