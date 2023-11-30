const mongoose = require("mongoose")

const chapterSchema = new mongoose.Schema({
    chapter_title: {
        type: String,
        required: true,
        trim: true
    },
    overview: {
        type: String,
        required: false,
        default: '',
        trim: true
    },
    videos: [{
        video_title: {
            type: String,
            required: true,
            trim: true
        },
        video_overview: {
            type: String,
            required: false,
            deafult: '',
            trim: true
        },
        video_link: {
            type: String,
            required: true,
            trim: true
        },
        video_seeked: {
            type: String,
            required: false,
            default: 0,
            trim: true
        },
        video_duration: {
            type: Number,
            required: true,
            trim: true
        },
        watch_time: {
            type: String,
            required: false,
            default: 0,
            trim: true
        },
        status: {
            type: Boolean,
            default: true
        },
        watched: {
            type: Boolean,
            defalut: false
        },
        watched_at: {
            type: Date,
            defalut: '0000-00-00'
        }
    }],
    status: {
        type: Boolean,
        default: true
    },
    campaign_id: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})


const Chapter = new mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;