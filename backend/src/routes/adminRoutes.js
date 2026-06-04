import express from "express";

import authMiddleware
from "../middleware/authMiddleware.js";

import adminMiddleware
from "../middleware/adminMiddleware.js";

import Note
from "../models/Note.js";

const router = express.Router();

// Admin: Get ALL notes
router.get(
  "/notes",
  authMiddleware,
  adminMiddleware,

  async (req, res) => {

    try {

      const search = req.query.search || "";
      const mediaType = req.query.mediaType || "";

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 6;

      const skip = (page - 1) * limit;

      const filter = {};

      // Search
      if (search) {

        filter.title = {
          $regex: search,
          $options: "i",
        };
      }

      // Media filter
      if (mediaType) {

        filter.mediaType = mediaType;
      }

      const totalNotes =
        await Note.countDocuments(filter);

      const notes =
        await Note.find(filter)
          .populate("user", "name email")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);

      res.status(200).json({

        notes,

        currentPage: page,

        totalPages:
          Math.ceil(totalNotes / limit),

        totalNotes,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

// Admin: Delete ANY note
router.delete(
    "/notes/:id",

    authMiddleware,

    adminMiddleware,

    async (req, res) => {

        try {

            const deletedNote =
                await Note.findByIdAndDelete(
                    req.params.id
                );

            if (!deletedNote) {

                return res.status(404).json({

                    message:
                        "Note not found",
                });
            }

            res.status(200).json({

                message:
                    "Note deleted by admin",
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Internal Server Error",
            });
        }
    }
);

export default router;