import React from 'react'
import Navbar from '../components/Navbar';
import RateLImitedUI from '../components/RateLImitedUI';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

const Homepage = () => {

    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const fetchNotes = async () => {

            try {
                const res = await api.get("/notes");
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.log("Error Fetching Notes")
                console.log(error);
                if(error.response?.status === 429 ) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes")
                }
            } finally {
                setLoading(false);
            }
        };
            fetchNotes();
    }, []);
    return (
        <div className="min-h-screen">

            <Navbar />

            {isRateLimited && <RateLImitedUI />}

            <div className="max-w-7xl mx-auto mt-6 p-4 ">
             {loading && <div> <p className="text-center text-primary py-10">Loading notes...</p> </div>}

                { notes.length === 0 && !isRateLimited &&  <NotesNotFound/>}

             {notes.length > 0 && !isRateLimited  && (
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                      <NoteCard key={note._id} note={note}  setNotes={setNotes}/>
                    ))}
                    
                    </div>
             )}


            </div>

        </div>
    )
}

export default Homepage