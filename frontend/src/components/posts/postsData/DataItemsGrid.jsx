import { Link } from "react-router-dom";
import { FaThumbsUp, FaEye } from '@/assets/icons';
import defaultImage from "/default.png";
import { formatDate } from "@/utils"

const DataItemsGrid = ({ posts, user, handleLikePost, fromSearch }) => {
  // console.log(posts);
  //lg:grid-cols-3
  return <div className={`pt-12 grid gap-8 md:grid-cols-2 ${fromSearch ? "lg:grid-cols-3 xl:grid-cols-4" : null}`}>
    {posts?.map((post) => {
      const formattedDate = formatDate(post?.date)
      const image = post?.image?.url || defaultImage
      const isLiked = post?.likes.includes(user?.id);
      return (
        <div key={post?._id} className="card card-compact bg-base-100 shadow-xl">
          <Link to={`/posts/${post?._id}`}>
            <img src={image} alt={post?.title} className="w-full h-56 object-cover" loading="lazy" />
          </Link>
          <div className="card-body justify-between">

            <div className="flex flex-col-reverse lg:flex-row justify-between lg:items-center lg:space-y-0 space-y-2">
              <Link to={`/posts/search?category=${encodeURIComponent(post?.category?.name)}`} className="text-base bg-blog text-white rounded px-0.5 tracking-wider hover:underline">{post?.category?.name}</Link>
              <div className="flex items-center">
                <Link
                  to={`/author/${post?.user?._id}`}
                  className="hover:underline flex space-x-1 items-center">
                  <figure>
                    <img
                      loading="lazy"
                      src={post?.user?.avatar?.url} alt={post?.title} className="w-8 h-8 object-cover rounded-full"
                    /></figure>
                  <span>{post?.user?.username}</span>
                </Link>{" . "}
                {formattedDate}
              </div>
            </div>

            <div>
              <Link to={`/posts/${post?._id}`}>
                <h4 className="card-title hover:underline font-bold text-base">
                  {post?.title}
                </h4><hr />
                <p className="pt-2" dangerouslySetInnerHTML={{ __html: post?.content.substring(0, 100) }} />
              </Link>
            </div>

            <div className="card-actions justify-between">
              {
                user
                  ? <button
                    className="inline-flex"
                    onClick={() => {
                      handleLikePost(post?._id, "like")
                    }}
                  >
                    <FaThumbsUp className={`mr-0.5 ${isLiked ? "text-blue-700" : "text-gray-500"}`}
                    />
                    {post?.likes?.length || 0}
                  </button>
                  : <Link to="/login" className="inline-flex">
                    <FaThumbsUp className={`mr-0.5 ${isLiked ? "text-blue-700" : "text-gray-500"}`}
                    />
                    {post?.likes?.length || 0}
                  </Link>
              }
              <div className="flex items-center space-x-2">
                <FaEye /> <span>{post?.viewsCount || 0}</span>
              </div>
            </div>

          </div>
        </div>
      );
    })}
  </div>

};

export default DataItemsGrid;