import { Link } from "react-router-dom";
import defaultImage from "/default.png";

const Section4 = ({ posts }) => {
    const displayedArticles = posts?.slice(9, 14);

    return <section className="ac body-container py-8 md:py-10">
        <div className='grid mb-3 md:mb-0 grid-cols-1 lg:grid-cols-2 gap-3'>
            {displayedArticles?.slice(0, 4).map((item) => {
                const image = item?.image?.url || defaultImage
                return <div key={item._id} className='latest-posts h-full cursor-pointer'>
                    <Link to={`/posts/${item?._id}/`}>
                        <img src={image} alt={item?.title} className="h-full md:h-96 md:w-full object-cover rounded" loading="lazy" />
                        <div className="latest-articles">
                            <h5 className='text-xl text-white hover:underline'>{item?.title}</h5>
                            <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: item?.content.substring(0, 100) }} />
                        </div>
                    </Link>
                </div>
            })}
        </div>
        <div className='my-5 lg:my-0'>
            {displayedArticles?.slice(4, 5).map((item) => {
                const image = item?.image?.url || defaultImage
                return <div key={item._id} className='latest-posts h-full cursor-pointer'>
                    <Link
                        to={`/posts/${item?._id}/`}
                    >
                        <img src={image} alt={item?.title} className="h-full object-cover rounded" loading="lazy" />
                        <div className="latest-articles">
                            <h5 className='text-xl text-white hover:underline'>{item?.title}</h5>
                            <p className=" text-gray-400" dangerouslySetInnerHTML={{ __html: item?.content.substring(0, 100) }} />
                        </div>
                    </Link>
                </div>
            })}
        </div>
    </section>
};

export default Section4;