import Note from '../models/Note.js';

export async function  getAllNotes(req, res) {
    try {

        const search = req.query.search || "";

        const mediaType = req.query.mediaType || "";

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 6;

        const skip = (page - 1) * limit;

        

        const filter = {user: req.user.userId};

        if (search) {
            filter.title = {
                $regex : search,
                $options: "i",
            };
        }

        if (mediaType) {
            filter.mediaType = mediaType;
        }

        const totalNotes = await Note.countDocuments(filter) 


        const notes = await Note.find(filter)
        .sort({ createdAt: 1})
        .skip(skip)
        .limit(limit); 
        
        res.status(200).json({
            notes, 
            currentPage: page, 
            totalPages: Math.ceil(totalNotes/limit),
            totalNotes,
        });

    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal Server Error " });
    }

}

export async function getNoteById(req, res) {
    try {{
        const note = await Note.findOne({_id: req.params._id, user: req.user.userId,});

        if (!note) {
            return res.status(404).json({ message: "Notes not found" });
        }
        res.status(200).json(note);

    } 
      }catch (error) {
        console.error("Error fetching note:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createNotes(req, res) {
    try {
        const {title, content} = req.body;

        let mediaUrl = "";
        let mediaType = "";

        if (req.file) {
            if (req.file.mimetype.startsWith("image")) {
                mediaType = "image";

                mediaUrl = `/upload/images/${req.file.filename}`;
            } else if (req.file.mimetype.startsWith("video")) {
                mediaType = "video";

                mediaUrl = `/upload/videos/${req.file.filename}`; 
            }
        }

        const note = new Note({title, content, mediaType, mediaUrl, user: req.user.userId });



        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

export async function updateNotes(req, res) {
    try {
        const {title, content} = req.body;

        const updateData = {
            title,
            content,
        };

        if(req.file) {
            if(req.file.mimetype.startsWith("image")){
                updateData.mediaType = "image";

                updateData.mediaUrl = `/upload/images/${req.file.filename}`;
            } else if ( req.file.mimetype.startsWith("video")) {
                updateData.mediaType = "video";

                updateData.mediaUrl = `/upload/videos/${req.file.filename}`;
            }
        }

        const updatedNote = await Note.findByIdAndUpdate({_id: req.params.id, user: req.user.userId, }, updateData, { new: true });

        if(!updatedNote){
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteNotes(req, res) {
    try {
         const deletedNote = await Note.findByIdAndDelete({_id: req.params.id, user: req.user.userId});

         if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
         }
         res.status(200).json({ message: "Note deleted successfully" });

    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}
