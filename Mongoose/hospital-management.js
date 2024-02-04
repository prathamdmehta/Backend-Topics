//Example of Mongoose

import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    details: {
        type: mongoose.Schema.Types.ObjecetId,
        ref: "hospital",
    },
}, {timestamps: true})

export const Hospital = mongoose.model('Hospital', hospitalSchema)