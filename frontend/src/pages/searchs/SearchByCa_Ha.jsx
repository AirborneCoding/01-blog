import { Link, useLocation } from 'react-router-dom';
import { Loading, Pagination } from '@/helpers';
import { formatDate } from '@/utils';
import { FaEye } from '@/assets/icons';
import defaultImage from "/default.png";
import {
    useFetchAllPostsQuery,
} from "@/redux/services/postsServices";

const SearchByCa_Ha = () => {
    window.scrollTo(0, 100)


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const hashtags = searchParams.get('hashtags');

    if (category) {
        var { data, isLoading: cateLoader, isError, refetch, error } = useFetchAllPostsQuery({
            category,
        });
    }
    if (hashtags) {
        var { data, isLoading: hashLoader, isError, refetch, error } = useFetchAllPostsQuery({
            hashtags,
        });
    }


    if (cateLoader || cateLoader) {
        return <Loading />
    }

    if (isError) {
        // console.log(error.status);
        if (error.status === 404) {
            return <main className='body-container min-h-screen'>
                <div className='mt-24 grid place-items-center text-[20px] font-bold'>
                    <h2>No posts found</h2>
                    <Link to="/my_profile/write_post" className='btn btn-primary mt-10 w-72' >Add One</Link>
                </div>
            </main>
        } else {
            return <div>Error fetching data</div>;
        }
    }

    const { posts, pagination } = data || {};
    const { total: totalData, pageCount, page } = pagination ?? {}

    return (
        <main className='body-container min-h-screen'>
            {/* <h2>{totalData}</h2> */}
            <div className='py-12 grid gap-8 md:grid-cols-2 '>
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
                                    <Link to="" className="text-base bg-blog text-white rounded px-0.5 tracking-wider">{post?.category?.name}</Link>
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
            <Pagination
                pageCount={pageCount}
                page={page}
            />
        </main>
    );
};

export default SearchByCa_Ha;
