import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state/authSlice";
import { useNavigate } from "react-router-dom";
import { SearchIcon, ChatIcon, BellIcon, QuestionMarkCircleIcon, MoonIcon, SunIcon, HomeIcon } from "@heroicons/react/outline";
import '../../index.css'

const Navbar = () => {
    const isAuth = Boolean(useSelector((state) => state.token));
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Getting the dark mode preference from local storage
        const darkMode = localStorage.getItem('darkMode');
        return darkMode ? JSON.parse(darkMode) : false;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const userProfilePicture = `https://drive.google.com/thumbnail?id=${user?.picturePath}&sz=w1000` || "";
    const [themeMode, setThemeMode] = useState("light")
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    useEffect(() => {
        isDarkMode ? setThemeMode('dark') : setThemeMode('light');
    }, [isDarkMode]);

    useEffect(() => {
        // Update local storage with the current dark mode preference
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        document.querySelector('html').classList.remove("light", "dark")
        document.querySelector('html').classList.add(themeMode)
    }, [themeMode])

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogout = () => {
        console.log("Logging out...");
        dispatch(setLogout());
        setIsDarkMode(false);
    };
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest(".dropdown")) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isSearchOpen && !event.target.closest(".dropdown")) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchOpen]);
    const handleSearch = async () => {
        try {
            const response = await fetch(`https://palzone-api.vercel.app/users/search?query=${searchQuery}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setSearchResults(data.users);
        } catch (error) {
            console.error("Error searching for users:", error.message);
        }
    };
    // console.log(searchResults);

    return (
        <>

            {isAuth ? (
                <div className='fixed top-0 left-0 right-0 z-10 flex justify-between space-x-7 bg-zinc-200 py-4 px-[6%] border-0 border-b-2 border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800'>
                    <div className="flex space-x-3">
                        <div className="flex items-center cursor-pointer" onClick={() => navigate("/home")}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 54.56 54.44">
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
                        <h1
                            className="hidden md:block font-bold text-2xl bg-gradient-to-br text-transparent bg-clip-text from-red-900 via-red-500 to-yellow-300 cursor-pointer pt-1 hover:from-red-700 hover:via-red-400 hover:to-yellow-200 "
                            onClick={() => navigate("/home")}
                        >
                            PalZone
                        </h1>


                    </div>
                    <div className="flex items-center bg-zinc-300 rounded-2xl p-2 space-x-2 dark:bg-zinc-800">
                        <div className="flex">
                            <input
                                className="pl-3 bg-transparent outline-none flex-grow md:w-fit w-full"
                                placeholder="Search Pals..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                        setIsSearchOpen(true);
                                    }
                                }}
                            />
                            <button onClick={() => {
                                handleSearch();
                                toggleSearch();
                            }}>
                                <SearchIcon className="h-6 w-6 mx-4 dark:text-white" />
                            </button>
                            {isSearchOpen && searchResults.length > 0 && (
                                <div className="absolute cursor-pointer z-10 mt-10 min-w-56 w-fit bg-white rounded-md shadow-md dark:bg-zinc-800">
                                    <ul>
                                        {searchResults.map((result) => (
                                            console.log(result.firstName),
                                            <li key={result._id} className="flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700 px-4 py-2"
                                                onMouseDown={() => { navigate(`/profile/${result._id}`); navigate(0); }}>
                                                <img src={`https://drive.google.com/thumbnail?id=${result.picturePath}&sz=w1000`} alt="Profile Picture" className="h-8 w-8 min-w-8 min-h-8 object-cover p-0 rounded-full mr-2 " />
                                                {result.firstName} {result.lastName}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                    </div>


                    <div className="hidden md:flex space-x-4">
                        <label className="theme-switch pt-2">
                            <input type="checkbox" className="theme-switch__checkbox" checked={isDarkMode} onChange={handleToggle} />
                            <div className="theme-switch__container">
                                <div className="theme-switch__clouds"></div>
                                <div className="theme-switch__stars-container">

                                </div>
                                <div className="theme-switch__circle-container">
                                    <div className="theme-switch__sun-moon-container">
                                        <div className="theme-switch__moon">
                                            <div className="theme-switch__spot"></div>
                                            <div className="theme-switch__spot"></div>
                                            <div className="theme-switch__spot"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </label>
                        {/* <button>
                            <ChatIcon className="h-6 w-6 text-zinc-700 dark:text-white" />
                        </button>
                        <button>
                            <BellIcon className="h-6 w-6 text-zinc-700 dark:text-white" />
                        </button> */}
                        <button>
                            <QuestionMarkCircleIcon className="h-6 w-6 text-zinc-700 dark:text-white" onClick={() => navigate("/about")} />
                        </button>
                        <div className="relative cursor-pointer">
                            <div className="flex items-center justify-between bg-none hover:border-zinc-500 pt-1 rounded leading-tight focus:outline-none focus:shadow-outline dark:text-white" onClick={toggleDropdown}>
                                <img src={userProfilePicture} alt="Profile Picture" className="h-8 w-8 min-w-8 min-h-8 object-cover p-0 rounded-full mr-2 border bg-gradient-to-br border-transparent bg-clip-border from-red-900 via-red-500 to-yellow-300" />


                                <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" style={{
                                    width: '1.666015625em',
                                    height: '1em',
                                    verticalAlign: 'middle',
                                    fill: 'currentColor',
                                    overflow: 'hidden',
                                    minWidth: '1.666015625em',
                                }} viewBox="0 0 1706 1024" version="1.1"><path d="M782.02272703 706.46395178L457.91614086 317.53604822h648.21317271z" />
                                </svg>

                            </div>

                            {isOpen && (
                                <div className="absolute z-10 mt-1 min-w-24 bg-white border border-zinc-400 rounded shadow-md dark:bg-zinc-700 dark:text-zinc-100 right-1/4">
                                    <ul>
                                        <li className="hover:bg-zinc-100 dark:hover:bg-zinc-500 px-4 py-2" onMouseDown={() => { navigate(`/profile/${user._id}`); navigate(0); }}>Profile</li>
                                        <li className="hover:bg-zinc-100 dark:hover:bg-zinc-500 px-4 py-2" onMouseDown={handleLogout}>Log Out</li>
                                    </ul>
                                </div>
                            )}
                        </div>



                    </div>

                    <div className="md:hidden">
                        <div className="fixed z-10 bottom-0 left-0 right-0 bg-zinc-300 bg-opacity-85 backdrop-blur-sm shadow-md p-3 dark:bg-zinc-900 dark:bg-opacity-85 dark:backdrop-blur-sm">
                            <div className="flex flex-row space-x-4 justify-around">
                                <button onClick={() => navigate("/home")} className="text-zinc-600 dark:text-white">
                                    <HomeIcon className="h-6 w-6" />
                                </button>
                                {/* <button onClick={() => navigate("/chat")} className="text-zinc-600 dark:text-white">
                                    <ChatIcon className="h-6 w-6" />
                                </button> */}
                                <div className="flex items-center justify-center bg-none hover:border-zinc-500 rounded leading-tight focus:outline-none focus:shadow-outline dark:text-white" onClick={toggleDropdown}>
                                    <img src={userProfilePicture} alt="Profile Picture" className="h-8 w-8 object-cover rounded-full border bg-gradient-to-br border-transparent bg-clip-border from-red-900 via-red-500 to-yellow-300" />
                                </div>
                                {isOpen && (
                                    <div className="absolute z-10 mt-1 w-1/2 bottom-full bg-white border border-zinc-400 rounded shadow-md dark:bg-zinc-700 dark:text-zinc-100">
                                        <ul>
                                            <li className="hover:bg-zinc-100 px-4 py-2" onMouseDown={() => { navigate(`/profile/${user._id}`); navigate(0); }}>Profile</li>
                                            <li className="hover:bg-zinc-100 px-4 py-2" onMouseDown={handleLogout}>Log Out</li>
                                        </ul>
                                    </div>
                                )}
                                {/* <button onClick={() => navigate("/notifications")} className="text-zinc-600 dark:text-white">
                                    <BellIcon className="h-6 w-6" />
                                </button> */}
                                <button>
                                    <QuestionMarkCircleIcon className="h-6 w-6 text-zinc-700 dark:text-white" onClick={() => navigate("/about")} />
                                </button>
                                <button onClick={() => { setIsDarkMode(!isDarkMode); dispatch(setMode()) }} className="text-zinc-600 dark:text-white transition-opacity duration-1000">
                                    {isDarkMode ? <MoonIcon className="h-6 w-6 " /> : <SunIcon className="h-6 w-6" />}
                                </button>

                            </div>

                        </div>
                    </div>


                </div >
            ) :
                <div className='absolute top-0 left-0 right-0 z-10 flex justify-center space-x-3 bg-zinc-200 py-4 px-[6%] border-0 border-b-2 border-zinc-300'>
                    <div className="flex items-center cursor-default" onClick={() => navigate("/home")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 54.56 54.44">
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
                    <h1
                        className="font-bold it text-2xl md:text-3xl bg-gradient-to-br text-transparent bg-clip-text from-red-900 via-red-500 to-yellow-300 cursor-default pt-1 "
                    >
                        PalZone
                    </h1>
                </div>
            }
        </>

    );
};

export default Navbar;
