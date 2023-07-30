const { User, Thought } = require('../models');

module.exports = {
    // GET all thoughts 
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // CREATE thought 
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'Thought created, but found no user with that username!' })
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // UPDATE a thought 

    // DELETE a thought 

    // CREATE a reaction 

    // DELETE a reaction 
}