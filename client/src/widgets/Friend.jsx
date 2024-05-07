import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends } from '../state/authSlice';
import { UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch(`https://palzone.onrender.com/users/${_id}/friends`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                dispatch(setFriends({ friends: data }));
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [_id, token, dispatch]);

    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        try {
            const response = await fetch(`https://palzone.onrender.com/users/${_id}/${friendId}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            dispatch(setFriends({ friends: data }));
        } catch (error) {
            console.error('Error patching friend:', error);
        }
    };

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <img src={`https://drive.google.com/thumbnail?id=${userPicturePath}&sz=w1000`} alt="User" className="object-cover w-12 h-12 rounded-full" />
                <div
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                    className="cursor-pointer"
                >
                    <h5 className="text-black font-medium hover:text-zinc-600 dark:text-zinc-100">
                        {name}
                    </h5>
                    <p className="text-zinc-500 text-sm">{subtitle}</p>
                </div>
            </div>
            {_id === friendId ? null : (
                <button
                    onClick={() => patchFriend()}
                    className={`p-2 bg-orange-100 rounded-full ${isFriend ? 'text-orange-700' : 'text-orange-700'}`}
                >
                    {isFriend ? <UserRemoveIcon className="w-5 h-5" /> : <UserAddIcon className="w-5 h-5" />}
                </button>
            )}
        </div>
    );
};

export default Friend;
