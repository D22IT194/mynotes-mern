import React from 'react'
import { Link } from 'react-router'

const NotesNotFound = () => {
    return (
        <div className="text-center py-10 text-primary text-lg font-medium"> 
            <div className="mb-4 flex items-center justify-center text-xl">
                No notes found.
            </div>
            <p className="text-base-content/70">It seems you haven't created any notes yet. Click on the "Create Your First Note" button to add your first note!</p>
            <div>
                <button className="btn btn-primary mt-6" >
                  <Link to="/create" className="flex items-center gap-2">
                    <span className="hidden sm:inline">Create Your First Note</span>
                  </Link>                    
                </button>
            </div>


        </div>
    )
}

export default NotesNotFound