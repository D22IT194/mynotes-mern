import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
     title: {
        type: String,
        required: true
     },
     content: {
        type: String,
        required: true
        },
      mediaUrl:{
         type: String,
         default: ""
        },
      mediaType: {
         type: String,
         enum: ["image", "video", ""],
         default: ""
      },
      user : {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },

     }, 
     {timestamps: true}
);


const Note = mongoose.model('Note', noteSchema)

export default Note;