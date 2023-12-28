import { Link } from "react-router-dom";

const SimilarPosts = ({ similarPosts }) => {
  return (
    <article className="flex space-y-4 flex-col mt-10 lg:mt-0">
      <h2 className="text-xl font-bold ">
        similar Posts :
      </h2>
      <hr className="mb-4" />
      {
        similarPosts?.map((post) => {
          //flex justify-between items-center
          return <div key={post._id} className="">

            <div className="">
              <div className="flex space-x-3">
                <Link to={`/author/${post?.user?._id}`} >
                  <img
                    loading="lazy"
                    src={post?.user?.avatar?.url}
                    alt={post?.user?.username}
                    className="h-10 w-10 rounded-full " />
                </Link>
                <div className="flex flex-col text-sm">
                  <Link
                    to={`/author/${post?.user?._id}`}
                    className="text-xs hover:underline"
                  >
                    {post?.user?.username}
                  </Link>
                  <span className="mt-0.5 -ml-1">14 hr. ago</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="mt-3 font-semibold hover:underline mb-2 text-sm">
                <Link to={`/posts/${post?._id}`} >
                  {post.title}
                </Link>
              </h2>
              <figure className="md:ml-2">
                <img
                  loading="lazy"
                  src={post?.image?.url}
                  alt={post?.title}
                  className="w-full h-20 object-cover rounded-lg"
                />
              </figure>
            </div>
            <div className="text-sm space-x-1" >
              <span>{post?.likes} likes</span>{" . "}
              <span>{post?.comments} comments</span>{" . "}
              <span>{post?.viewsCount} views</span>

            </div>
          </div>
        })
      }
    </article>
  );
};

export default SimilarPosts;
