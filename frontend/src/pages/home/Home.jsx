import { Link, useOutletContext } from "react-router-dom"
import {
    Section1,
    Section2,
    Section3,
    Section4,
    Section5,
    Section6,
} from "@/components";

const Home = () => {
    const { homePosts } = useOutletContext()

    // console.log(homePosts);
    const { posts } = homePosts

    return <main className="pb-16">
        <Section1 posts={posts} />
        <Section2 posts={posts} />
        {posts?.slice(8, 9)?.map((post) => <Section3 key={post._id} {...post} />)}
        <Section4 posts={posts} />
        {posts?.slice(15, 16)?.map((post) => <Section5 key={post._id} {...post} />)}
        <Section6 posts={posts} />

        <div className="text-center">
            <Link to={"/posts"} >
                <button to={"/posts"}
                    className="text-white font-semibold cursor-pointer bg-blog w-80 rounded shadow shadow-white py-3.5"
                >
                    Load More Posts ...
                </button>
            </Link>
        </div>

    </main>;
};

export default Home;
