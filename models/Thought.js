const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a course model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,

        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (createdAt) => createdAt.format('MM-DD-YYYY'),
        },
        username: {
            type: Schema.Types.String,
            required: true,
            ref: 'User',
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount').get(function () {
        return this.reactions.length
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;