import { Link, useOutletContext } from "react-router-dom";
import { formatDate } from "@/utils";
import defaultImage from "/default.png";
import { Pagination } from "@/helpers";
import { FaThumbsUp, FaEye } from '@/assets/icons';

const AuthorPosts = (props) => {
  const {
    authorPosts,
    authorPostsLoader,
    authorPostsError,
  } = props

  // TODO
  if (authorPostsLoader) {
    return <div className="loading-circle"></div>;
  }

  if (authorPostsError) {
    // console.log(error);
    return <div className="text-center my-5">
      {
        error.status === 404
          ? "No data found"
          : "Something went wrong Please back later..."
      }
    </div>;
  }

  const { posts, pagination } = authorPosts || [];
  const { pageCount, page } = pagination || [];


  return (
    <>
      <div className='pt-12 grid gap-8 md:grid-cols-2 '>
        {posts?.map((post) => {
          const formattedDate = formatDate(post?.date)
          const image = post?.image?.url || defaultImage
          return (
            <div key={post?._id} className="card card-compact bg-base-100 shadow-xl">
              <Link to={`/posts/${post?._id}`}>
                <img src={image} alt={post?.title} className="w-full h-80 object-cover" loading="lazy" />
              </Link>
              <div className="card-body justify-between">

                <div className="flex justify-between items-center">
                  <Link to={`/posts/search?category=${post?.category?.name}`} className="text-base bg-blog text-white rounded px-0.5 tracking-wider">{post?.category?.name}</Link>
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
                    <h2 className="card-title hover:underline font-bold">
                      {post?.title}
                    </h2><hr />
                    <p className="pt-2" dangerouslySetInnerHTML={{ __html: post?.content.substring(0, 100) }} />
                  </Link>
                </div>

                <div className="card-actions justify-between">

                  <div className="flex items-center space-x-2">
                    <FaEye /> <span>{post?.viewsCount || 0}</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
      <Pagination pageCount={pageCount} page={page} />
    </>
  )
};

export default AuthorPosts;