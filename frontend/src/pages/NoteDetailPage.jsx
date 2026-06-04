import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [media, setMedia] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching note", error);
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };


  const handleSave = async () => {
    if (!note.title || !note.content) {
      toast.error("Please fill in all fields");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("title", note.title);
      formData.append("content", note.content);

      if (media) {
        formData.append("media", media);
      }


      await api.put(`/notes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },

      }
      );

      toast.success("Notes Updated SuccessFully")
      navigate("/")
    } catch (error) {
      console.log("Error saving the note : ", error);

      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.message);
        })

      } else {
        toast.error("Failed to update note")
      }

    }
    finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className='btn btn-ghost'>
              <ArrowLeftIcon />
              back to Notes
            </Link>
            <button onClick={handleDelete} className='btn btn-error'>
              <Trash2Icon className='size-5' />
              Delete Notes
            </button>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body">

              {note.mediaType === "image" && (
                <img
                  src={`http://localhost:5001${note.mediaUrl}`}
                  alt={note.title}
                  className="w-full h-72 object-cover rounded-xl mb-4"
                />
              )}{note.mediaType === "video" && (
                <video
                  controls
                  className="w-full h-72 rounded-xl mb-4"
                >
                  <source
                    src={`http://localhost:5001${note.mediaUrl}`}
                  />
                </video>
              )}



              {/* Title Field */}
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full text-md font-medium"
                  placeholder="Title"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              {/* Content Field */}
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text font-medium">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-40 font-medium"
                  placeholder="Content"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="form-control w-full mb-4">

                <label className="label">
                  <span className="label-text font-medium">
                    Upload Image / Video
                  </span>
                </label>

                <input
                  type="file"
                  accept="image/*,video/*"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => setMedia(e.target.files[0])}
                />

              </div>

              {/* Action Button */}
              <div className="card-actions justify-end">
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="loading loading-spinner loading-xs color-primary"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>

            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage