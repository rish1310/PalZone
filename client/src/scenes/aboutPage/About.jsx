// About.js

import React from 'react';

const About = () => {
    return (
        <div className="my-8 min-h-screen flex items-center justify-center">
            <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-lg p-10 max-w-3xl w-full">
                <div className="flex justify-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" viewBox="0 0 54.56 54.44">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: 'rgb(255,0,0)', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: 'rgb(200,200,0)', stopOpacity: 1 }} />
                            </linearGradient>
                            <style>
                                {`.cls-1 { fill:none; stroke:url(#gradient); stroke-linecap:round; stroke-linejoin:round; stroke-width:3px; }`}
                            </style>
                        </defs>
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path className="cls-1" d="M29.82,26.11S22.15,27.22,18,23.71" />
                                <path className="cls-1" d="M35.54,18.33S28.89,19.86,25.88,17" />
                                <path className="cls-1" d="M23.42,34.06s-5.93,1.13-8.26-1.56" />
                                <path className="cls-1" d="M9.56,28.8a23,23,0,0,1,32.65-17" />
                                <path className="cls-1" d="M13,45.1A22.93,22.93,0,0,1,9.26,32.5" />
                                <path className="cls-1" d="M13.65,53.44H12.31a3,3,0,0,1-3-3.38l.11-.82L7.69,49a3.77,3.77,0,0,1-2.78-5.62l.9-1.55L4.25,41.3a3.76,3.76,0,0,1-1.51-6.13L3.86,34l-1.2-.81a3.77,3.77,0,0,1,.21-6.38l1.25-.72L3.25,25a3.77,3.77,0,0,1,2.17-6l1.38-.29-.56-1.49A3.77,3.77,0,0,1,10,12.07l1.6.1-.17-1.76a3.77,3.77,0,0,1,4.92-3.94L18,7l.32-1.53a3.76,3.76,0,0,1,6-2.23l1.24.94.86-1.4a3.77,3.77,0,0,1,6.34-.14L33.67,4l1.41-1.24a3.76,3.76,0,0,1,6.05,1.6l.62,1.78,1.79-1A3.76,3.76,0,0,1,49.07,8l.27,2,1.52-.09a2.44,2.44,0,0,1,2.6,2.27l.1,1.45Z" />
                            </g>
                        </g>
                    </svg>
                </div>
                <h2 className="text-4xl font-semibold text-center mb-6">Welcome to PalZone</h2>
                <div className="flex justify-center mb-8">
                    <img
                        src="https://img.freepik.com/free-vector/young-people-spending-time-together_23-2148450834.jpg"
                        alt="PalZone Team"
                        className="rounded-full h-36 w-36 object-cover"
                    />

                </div>
                <p className="text-lg mb-6">
                    PalZone is a vibrant community where people from all walks of life come together to connect, share, and explore common interests.
                </p>
                <p className="text-lg mb-6">
                    Our platform provides a space for meaningful conversations, creative expression, and genuine connections. Whether you're looking for old friends or making new ones, PalZone is here to help you every step of the way.
                </p>
                <p className="text-lg mb-6">
                    Join us today and become part of our ever-growing community. Let's create memories, share experiences, and build friendships that last a lifetime.
                </p>
                <p className="text-lg mb-6">
                    PalZone - Tasting the Joy of Connection, One Crust at a Time.
                </p>
            </div>
        </div>
    );
};

export default About;
