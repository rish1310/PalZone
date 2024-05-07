import React from 'react'

const UserImage = ({ image, size = "60px" }) => {
    return (
        <div className={`w-${size} h-${size} rounded-full`}>
            <img
                className="object-cover rounded-full"
                alt="user"
                src={`https://palzone-api.vercel.app/assets/${image}`}
            />
        </div>
    );
};

export default UserImage;
