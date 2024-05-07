import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const viewProfile = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(id, { $inc: { viewedProfile: 1 } });

        const viewerUserId = req.user.id;
        await User.findByIdAndUpdate(viewerUserId, { $inc: { impressions: 1 } });

        res.status(200).json({ msg: "Profile viewed successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;

        // Perform a case-insensitive search for users whose firstName or lastName matches the query
        const users = await User.find({
            $or: [
                { firstName: { $regex: new RegExp(query, 'i') } },
                { lastName: { $regex: new RegExp(query, 'i') } }
            ]
        });

        // Send a JSON response with the search results
        res.status(200).json({ users });
    } catch (error) {
        // Handle errors and send an appropriate response
        console.error("Error searching for users:", error);
        res.status(500).json({ message: "An error occurred while searching for users." });
    }
};