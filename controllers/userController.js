const { User, Thought } = require('../models');

module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // GET single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('thoughts')
                .populate('friends')
                .populate('reactions')
                .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // POST a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // UPDATE a user 
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE a user and their thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            }
            const thought = await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and thoughts deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // ADD a new friend to user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE a friend from user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};