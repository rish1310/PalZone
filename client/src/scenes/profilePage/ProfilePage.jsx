import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserWidget from "../../widgets/UserWidget";
// import MyPostWidget from "../../widgets/MyPostWidget";
import PostsWidget from "../../widgets/PostsWidget";
import FriendListWidget from "../../widgets/FriendListWidget";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const response = await fetch(`https://palzone.onrender.com/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    if (!user) return null;

    return (
        <div className="w-full md:px-6 py-8 block md:flex gap-8 justify-center">
            <div className="w-full md:w-1/4">
                <UserWidget userId={userId} picturePath={user.picturePath} friends={user.friends} />
                <div className="my-8" />
                <FriendListWidget userId={userId} />
            </div>
            <div className="w-full md:w-3/5">
                <h1 className="md:hidden block text-2xl py-4 text-center mt-4 md:m-0 font-bold text-zinc-900 dark:text-zinc-100">All Posts</h1>
                <PostsWidget userId={userId} isProfile />
            </div>
        </div>
    );
};

export default ProfilePage;
