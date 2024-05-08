import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state/authSlice";
import { PaperClipIcon, PhotographIcon, VideoCameraIcon, MicrophoneIcon, DotsHorizontalIcon } from '@heroicons/react/outline';
import PulseLoader from 'react-spinners/PulseLoader';

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [loading, setLoading] = useState(false);

    const handlePost = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`https://palzone.onrender.com/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
        setLoading(false);
    };

    return (
        <div className="bg-zinc-100 rounded-lg p-4 dark:bg-zinc-900">
            <div className="flex justify-between items-center">
                <img src={`https://drive.google.com/thumbnail?id=${picturePath}&sz=w1000`} alt="User" className="min-w-12 min-h-12 w-12 h-12 rounded-full object-cover" />
                <input
                    placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    className="w-full ml-6 bg-zinc-200 rounded-full p-4 focus:outline-none dark:bg-zinc-800 dark:text-zinc-100"
                />
            </div>
            {isImage && (
                <div
                    className={`border border-zinc-400 rounded mt-4 p-4`}
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className={`border-dashed border-2 border-red-500 p-4 cursor-pointer`}>
                                <input {...getInputProps()} />
                                {!image ? (
                                    <p>Add Image Here</p>
                                ) : (
                                    <div className="flex justify-between items-center">
                                        <img src={URL.createObjectURL(image)} alt="Uploaded" className="h-20 w-20 object-cover rounded" />
                                        <p>{image.name}</p>
                                        <PaperClipIcon className="h-5 w-5" />
                                    </div>
                                )}
                            </div>
                        )}
                    </Dropzone>
                </div>
            )}

            <div className="mt-4 border-t border-zinc-300 pt-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-primary-500 cursor-pointer" onClick={() => setIsImage(!isImage)}>
                        <PhotographIcon className="h-5 w-5" />
                        <span className="hidden md:block ml-2">Attach File</span>
                    </div>

                    <div className="flex items-center text-primary-500 cursor-pointer">
                        <VideoCameraIcon className="h-5 w-5" />
                        <span className="hidden md:block ml-2">Clip</span>
                    </div>

                    <div className="flex items-center text-primary-500 cursor-pointer">
                        <PaperClipIcon className="h-5 w-5" />
                        <span className="hidden md:block ml-2">Attachment</span>
                    </div>

                    {/* <div className="flex items-center text-primary-500 cursor-pointer">
                        <MicrophoneIcon className="h-5 w-5" />
                        <span className="hidden md:block ml-2">Audio</span>
                    </div> */}

                    <button
                        disabled={!post}
                        onClick={handlePost}
                        className={`px-4 py-2 rounded-full bg-orange-600 text-white font-medium focus:outline-none ${!post && 'opacity-50 cursor-not-allowed'} ${post && 'hover:bg-orange-500'}`}
                    >
                        POST
                    </button>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <PulseLoader color="orange" loading={loading} size={10} />
            </div>
        </div>
    );
};

export default MyPostWidget;
