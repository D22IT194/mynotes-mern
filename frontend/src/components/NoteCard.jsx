import React from 'react'
import { Link } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';

const NoteCard = ({ note, setNotes }) => {

    const handleDelete = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter(notes => notes._id !== id));
            toast.success("Note deleted successfully");
        } catch (error) {
            console.log("Error deleting note", error);
            toast.error("Failed to delete note");
        }


    }
    return (
        <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
            <div className="card-body">

                {note.mediaType === "image" && (
                    <img
                        src={`http://localhost:5001${note.mediaUrl}`}
                        alt={note.title}
                        className = "w-full h-52 object-cover rounded-xl"
                    />
                )}

                {note.mediaType === "video" && (
                    <video
                        controls
                        className="w-full h-52 rounded-xl object-cover"
                    >
                        <source
                            src={`http://localhost:5001${note.mediaUrl}`}
                        />
                    </video>
                )}
                <h2 className="card-title text-base-content">{note.title}</h2>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-2">
                        <PenSquareIcon className="size-4" />
                        <button className="btn btn-ghost btn-xs text-error" onClick={(e) => {
                            handleDelete(e, note._id)
                        }}>
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard