import {z} from "zod";


export const noteSchema = z.object({


    title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .min(3, "Title must be at least 3 characters ")
    .max(100, "Title is to long"),

    content: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .min(5,"Content must be at leat 5 characters")
    .max(500, "Content is to long "),
})