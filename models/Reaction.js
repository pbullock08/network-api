const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: Schema.Types.String,
      required: true,
      ref: 'User',
  },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => createdAt.format('MM-DD-YYYY'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;