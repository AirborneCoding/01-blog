import { formatDate } from "@/utils";
import { Link } from "react-router-dom";
import defaultImage from "/default.png";

const Section6 = ({ posts }) => {
    const displayedArticles = posts?.slice(16, 22);
    return <section className='grid md:grid-cols-1 lg:grid-cols-3 lg:gap-x-5 gap-y-5 mx-5 my-16 body-container'>
        {displayedArticles?.map((item) => {
            const formattedDate = formatDate(item?.createdAt)
            const image = item?.image?.url || defaultImage
            return (
                <div key={item?._id} className='lg:flex lg:flex-col lg:justify-between  gap-4'> 
                    <figure>
                        <img src={image} alt={item?.title} className='h-56 object-cover w-full' />
                    </figure>
                    <div className='flex flex-col justify-between'>
                        <div className=''>
                            <h2 className={`text-xl font-bolder`}>{item?.title}</h2>
                            <p className="text-md" dangerouslySetInnerHTML={{ __html: item?.content.substring(0, 100) }} />
                        </div>
                        <div>
                            <Link to={`/posts/${item?._id}`} className={`mt-4 flex justify-center items-center my-btn w-full text-center py-1 rounded bg-gray-500 text-white`}>
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            );
        })}
    </section>
};
export default Section6;
//grid grid-cols-2