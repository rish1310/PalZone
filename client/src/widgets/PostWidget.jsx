import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state/authSlice";
import Friend from "./Friend";
import { HeartIcon, ChatAltIcon, ShareIcon } from '@heroicons/react/outline';
import { HeartIcon as FilledHeart } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const user = useSelector((state) => state.user);
    const fullName = `${user.firstName} ${user.lastName}`;

    const patchLike = async () => {
        const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/posts/${postId}/comment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId, name: fullName, comment: newComment }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setNewComment('');
    };

    return (
        <div className="bg-zinc-100 rounded-lg p-4 dark:bg-zinc-900">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <p className="mt-4">{description}</p>
            {picturePath && (
                <img
                    src={`https://drive.google.com/thumbnail?id=${picturePath}&sz=w1000`}
                    alt="post"
                    className="w-full h-auto mt-4 rounded"
                />
            )}
            <div className="flex justify-between mt-2">
                <div className="flex items-center space-x-4">
                    <button onClick={patchLike} className="flex items-center space-x-1">
                        {isLiked ? (
                            <FilledHeart className="w-6 h-6 text-orange-500" style={{ filter: 'drop-shadow(0 0 2px #fff) drop-shadow(0 0 5px #ed8936) drop-shadow(0 0 15px #ed8936) drop-shadow(0 0 30px #ed8936)' }} />
                        ) : (
                            <HeartIcon className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                        )}
                        <span>{likeCount}</span>
                    </button>
                    <button onClick={() => setIsComments(!isComments)} className="flex items-center space-x-1">
                        <ChatAltIcon className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                        <span>{comments.length}</span>
                    </button>
                </div>
                <button className="flex items-center">
                    <ShareIcon className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                </button>
            </div>
            {isComments && (
                <div className="mt-2">
                    <form onSubmit={handleSubmitComment} className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-orange-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
                        />
                        <button type="submit" className="bg-orange-500 text-white rounded-md px-4 py-2 hover:bg-orange-600 focus:outline-none focus:bg-orange-600">Post</button>
                    </form>
                    {comments.length > 0 && comments.slice().reverse().map((comment, i) => (
                        <div key={`${name}-${i}`}>
                            <hr className="my-2 border-t border-zinc-300" />
                            <div
                                onClick={() => {
                                    navigate(`/profile/${comment.userId}`);
                                    navigate(0);
                                }}
                                className="w-fit cursor-pointer"
                            >
                                <p className="text-black font-medium hover:text-zinc-600 dark:text-zinc-100">{comment.name}</p>

                            </div>
                            <p className="text-zinc-800 m-2 pl-4 dark:text-zinc-200">{comment.comment}</p>
                        </div>
                    ))}
                    <hr className="my-2 border-t border-zinc-300" />
                </div>
            )}
        </div>
    );
};

export default PostWidget;
