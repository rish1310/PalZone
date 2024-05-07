import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state/authSlice";
import Friend from "./Friend";
import { useLocation } from "react-router-dom";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const location = useLocation();
    const isProfile = location.pathname.includes("profile");
    const [friendList, setFriendList] = useState([]);

    const getFriends = async () => {
        const response = await fetch(
            `https://palzone.onrender.com/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        setFriendList(data);
        dispatch(setFriends({ friends: data }));
    };

    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="bg-zinc-100 rounded-lg p-6 dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold mb-6">Pal List</h2>
            <div className="space-y-6">
                {isProfile ?
                    friendList.map((friend) => (
                        <Friend
                            key={friend._id}
                            friendId={friend._id}
                            name={`${friend.firstName} ${friend.lastName}`}
                            subtitle={friend.occupation}
                            userPicturePath={friend.picturePath}
                        />
                    ))
                    : (
                        friends.map((friend) => (
                            <Friend
                                key={friend._id}
                                friendId={friend._id}
                                name={`${friend.firstName} ${friend.lastName}`}
                                subtitle={friend.occupation}
                                userPicturePath={friend.picturePath}
                            />
                        ))
                    )}


            </div>
        </div>
    );
};

export default FriendListWidget;
