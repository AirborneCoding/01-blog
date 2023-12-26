
import { Link } from "react-router-dom";
import { useFetchTop5Query } from "@/redux/services/othersServices";


const Categories = () => {
    const { data: top5, isloading } = useFetchTop5Query();
    if (isloading) {
        return <div>load</div>
    }
    const {
        topCategories: categories,
        topHashtags: hashtags
    } = top5 ?? {}
    return (
        <aside className="ml-10">
            <h3 className="text-xl">Top 5 Categories</h3><hr />
            <div className="flex flex-col ">
                {categories?.map((item, index) => (
                    <Link to={`/posts/search?category=${item?.category}`}
                        key={index}
                        className="mx-2 my-2 bg-blog text-white font-semibold rounded text-[18px] hover:underline cursor-pointer w-72 py-2 px-2"
                    >
                        {item?.category}
                    </Link>
                ))}
            </div>
            <h3 className="text-xl mt-16">Top 5 Hashtags</h3><hr />
            <div className="flex flex-col ">
                {hashtags?.map((item, index) => (
                    <Link to={`/posts/search?hashtags=${item?._id}`}
                        key={index}
                        className="mx-2 my-2 bg-blog text-white font-semibold rounded text-[18px] hover:underline cursor-pointer w-72 py-2 px-2"
                    >
                        #{item?._id}
                    </Link>
                ))}
            </div>
        </aside>
    );
};

export default Categories;

