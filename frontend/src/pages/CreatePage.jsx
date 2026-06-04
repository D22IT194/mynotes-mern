import React from 'react'
import { Link } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';
import { useNavigate } from 'react-router';

const CreatePage = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setloading] = useState(false);
  const [media, setMedia] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }

    setloading(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);

      if (media) {
        formData.append("media", media);
      }

      await api.post("/notes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      
        if (error.response?.data?.errors){

          error.response.data.errors.forEach((err) => {
            toast.error(err.message);
          })
        }

      else if (error.response?.status === 429) {
        toast.error("You are creating notes too fast. Please wait a moment and try again.", {
          duration: 4000,
          icon: "⏳",
        })
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setloading(false);

    }




  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="conatainer mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
        </div>

        <div className="max-w-2xl mx-auto bg-base-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-primary">Create a New Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-base-content mb-1">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full" placeholder="Enter note title" />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-base-content mb-1">Content</label>
              <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="textarea textarea-bordered w-full" placeholder="Enter note content" rows={6}></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-base-content mb-1">
                Upload Image / Video
              </label>

              <input
                type="file"
                accept="image/*,video/*"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setMedia(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Note"}
            </button>
          </form>
        </div>
      </div>


    </div>
  )
}

export default CreatePage