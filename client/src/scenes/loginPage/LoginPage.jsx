import { useState } from 'react';
import Form from './Form';

const LoginPage = () => {
    const [isNonMobileScreens, setIsNonMobileScreens] = useState(false);

    // Function to check if the screen size is non-mobile
    const checkIsNonMobileScreens = () => {
        const screenWidth = window.innerWidth;
        setIsNonMobileScreens(screenWidth >= 1000);
    };

    // Run the check when the component mounts
    useState(() => {
        checkIsNonMobileScreens();
        window.addEventListener('resize', checkIsNonMobileScreens);
        return () => {
            window.removeEventListener('resize', checkIsNonMobileScreens);
        };
    }, []);
    return (

        <div className='flex justify-between'>
            <div className='hidden md:w-1/2 md:block p-5'>
                <img src="/login.jpg" alt="" className="w-full h-auto md:w-full md:h-full object-cover" />
            </div>
            <div className="w-full p-6 md:w-1/2 md:p-8 mx-auto my-8 rounded-xl max-w-xl md:max-h-xl border border-zinc-60 backdrop-blur-3xl bg-white/30 dark:bg-zinc-900">
                <h2 className="text-center font-semibold text-xl md:text-4xl mb-6">
                    Welcome to PalZone!
                </h2>
                <p className='text-center text-lg md:text-2xl mb-6 text-zinc-500'>
                    Tasting the Joy of Connection,<br /> One Crust at a Time
                </p>
                <Form />
            </div>
        </div>
    );
};

export default LoginPage;
