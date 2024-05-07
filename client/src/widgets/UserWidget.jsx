import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    UserCircleIcon,
    PencilIcon,
    LocationMarkerIcon,
    BriefcaseIcon,
} from "@heroicons/react/solid";

const UserWidget = ({ userId, picturePath, friends }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    // const friends = useSelector((state) => state.user.friends);
    const getUser = async () => {
        const response = await fetch(`https://palzone-api.vercel.app/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, [friends]);

    if (!user) {
        return null;
    }

    const { firstName, lastName, location, occupation, viewedProfile, impressions } = user;
    console.log(picturePath)
    return (
        <div className="p-4 bg-zinc-100 rounded-lg dark:bg-zinc-900">
            <div className="flex justify-between items-center pb-2 cursor-pointer" onClick={() => navigate(`/profile/${userId}`)}>
                <div className="flex items-center space-x-4">

                    <img src={`https://drive.google.com/thumbnail?id=${picturePath}&sz=w1000`} className="object-cover rounded-full w-16 h-16" alt="" />
                    <div>
                        <h4 className="font-medium text-lg text-zinc-900 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300">
                            {firstName} {lastName}
                        </h4>
                        <p className="text-sm text-zinc-500">{friends.length} friends</p>
                    </div>
                </div>
                <UserCircleIcon className="h-6 w-6 text-zinc-500" />
            </div>

            <hr className="my-4 border-zinc-200" />

            <div className="py-4">
                <div className="flex items-center gap-4 mb-2">
                    <LocationMarkerIcon className="h-6 w-6 text-zinc-400" />
                    <p className="text-zinc-700 dark:text-zinc-500">{location}</p>
                </div>
                <div className="flex items-center gap-4">
                    <BriefcaseIcon className="h-6 w-6 text-zinc-400" />
                    <p className="text-zinc-700 dark:text-zinc-500">{occupation}</p>
                </div>
            </div>

            <hr className="my-4 border-zinc-200" />

            <div className="py-4">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-zinc-700 dark:text-zinc-500">Who's viewed your profile</p>
                    <p className="text-zinc-900 font-medium dark:text-zinc-100">{viewedProfile}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-zinc-700 dark:text-zinc-500">Impressions of your post</p>
                    <p className="text-zinc-900 font-medium dark:text-zinc-100">{impressions}</p>
                </div>
            </div>

            <hr className="my-4 border-zinc-200" />

            <div className="py-4">
                <p className="text-lg text-zinc-900 font-medium mb-4 dark:text-zinc-100">Social Profiles</p>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-4">

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" width="512" height="512" fill="none" viewBox="0 0 512 512" id="twitter"><g clip-path="url(#clip0_84_15697)"><rect width="512" height="512" fill="#9ca3af" rx="60"></rect><path fill="#fff" d="M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z"></path></g><defs><clipPath id="clip0_84_15697"><rect width="512" height="512" fill="#fff"></rect></clipPath></defs></svg>
                        <div>
                            <p className="text-zinc-900 font-medium dark:text-zinc-100">Twitter</p>
                            <p className="text-zinc-700 dark:text-zinc-500">Social Network</p>
                        </div>
                    </div>
                    <PencilIcon className="h-6 w-6 text-zinc-500" />
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" width="72" height="72" viewBox="0 0 72 72" id="linkedin"><g fill="none" fill-rule="evenodd"><g><rect width="72" height="72" fill="#9ca3af" rx="4"></rect><path fill="#FFF" d="M13.139 27.848h9.623V58.81h-9.623V27.848zm4.813-15.391c3.077 0 5.577 2.5 5.577 5.577 0 3.08-2.5 5.581-5.577 5.581a5.58 5.58 0 1 1 0-11.158zm10.846 15.39h9.23v4.231h.128c1.285-2.434 4.424-5 9.105-5 9.744 0 11.544 6.413 11.544 14.75V58.81h-9.617V43.753c0-3.59-.066-8.209-5-8.209-5.007 0-5.776 3.911-5.776 7.95V58.81h-9.615V27.848z"></path></g></g></svg>
                        <div>
                            <p className="text-zinc-900 font-medium dark:text-zinc-100">Linkedin</p>
                            <p className="text-zinc-700 dark:text-zinc-500">Network Platform</p>
                        </div>
                    </div>
                    <PencilIcon className="h-6 w-6 text-zinc-500" />
                </div>
            </div>
        </div>
    );
};

export default UserWidget;
