import { Link } from "react-router-dom";
import { formatDate } from "@/utils"
import defaultImage from "/default.png";
import { FaThumbsUp, FaEye } from '@/assets/icons';

const DataItemsList = ({ posts, user, handleLikePost }) => {

  return <div className="mt-12 grid gap-y-8">
    {
      posts?.map((post) => {
        const formattedDate = formatDate(post?.date)
        const image = post?.image?.url || defaultImage
        const isLiked = post?.likes.includes(user?.id);
        return <div key={post._id} className="card lg:card-side bg-base-100 shadow-xl ">
          <Link to={`/posts/${post._id}`} >
            <figure>
              <img
                src={image} alt={post?.title} className="lg:w-[400px] w-full h-56 object-cover"
              /></figure>
          </Link>

          <div className="card-body flex justify-between">

            <div>
              <div className="flex lg:flex-col lg:items-start justify-between items-center">
                <Link to={`/posts/search?category=${post?.category?.name}`} className="text-base bg-blog text-white rounded px-0.5 tracking-wider lg:mb-1">{post?.category?.name}</Link>
                <div className="flex items-center">
                  <Link
                    to={`/author/${post?.user?._id}`}
                    className="hover:underline flex space-x-1 items-center ">
                    <figure>
                      <img
                        src={post?.user?.avatar?.url} alt={post?.title} className="w-8 h-8 object-cover rounded-full"
                      /></figure>
                    <span>{post?.user?.username}</span>
                  </Link>{" . "}
                  {formattedDate}
                </div>
              </div>
              {/* <hr /> */}
              <div className="mt-5" >
                <Link to={`/posts/${post._id}`}>
                  <h2 className="card-title hover:underline">
                    {post?.title}
                  </h2>
                  {/* <p className="" dangerouslySetInnerHTML={{ __html: post?.content.substring(0, 200) }} /> */}
                </Link>
              </div>
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
      })
    }

  </div>
};

export default DataItemsList;