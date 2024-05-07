import { useSelector } from "react-redux";
import UserWidget from "../../widgets/UserWidget";
import MyPostWidget from "../../widgets/MyPostWidget";
import PostsWidget from "../../widgets/PostsWidget";
import FriendListWidget from "../../widgets/FriendListWidget";

const HomePage = () => {
    const { _id, picturePath, friends } = useSelector((state) => state.user);

    return (
        <div className="w-full py-8 flex flex-wrap justify-between">
            <div className="hidden lg:block lg:w-1/4">
                <UserWidget userId={_id} picturePath={picturePath} friends={friends} />
            </div>
            <div className="w-full lg:w-2/5  md:mt-8 lg:mt-0">
                <MyPostWidget picturePath={picturePath} />
                <div className="mb-4"></div>
                <PostsWidget userId={_id} />
            </div>
            <div className="hidden lg:block md:w-1/4 ">
                {/* <div className="hidden lg:block w-full"> */}
                <FriendListWidget userId={_id} />
                {/* </div> */}
            </div>
        </div>
    );
};

export default HomePage;
