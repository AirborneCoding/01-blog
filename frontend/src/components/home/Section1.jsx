import React, { useEffect, useState } from "react";
import { formatDate } from "@/utils";
import { Link } from "react-router-dom";
import defaultImage from "/default.png";
const colorsArray = ["bg-red-300", "bg-green-300", "bg-blue-300", "bg-yellow-300", "bg-purple-300", "bg-orange-300"];

const PostSection = ({ posts }) => {
    const displayedArticles = posts?.slice(0, 4);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedArticles?.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [displayedArticles]);

    const currentArticle = displayedArticles[currentIndex];


    return (
        <section className="relative">
            <div>
                {/* Full-width image */}
                <img
                    src={currentArticle?.image?.url || defaultImage}
                    alt={currentArticle?.title}
                    className="w-full h-[700px] object-cover"
                    loading="lazy"
                />

                {/* Card overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 p-6">
                    <div className="bg-white w-fit p-5">
                        {/* Author details */}
                        <div className="mb-3">
                            <div className="flex space-x-2">
                                <img
                                    src={currentArticle?.user.avatar?.url}
                                    alt={currentArticle?.user?.username}
                                    className="h-10 w-10 rounded-full"
                                />
                                <div>
                                    <p className="text-md font-semibold hover:underline">
                                        <Link to={`/author/${currentArticle?.user?._id}`} >
                                            {currentArticle?.user?.username}
                                        </Link>
                                    </p>
                                    <p className="text-sm text-gray-300 -mt-6">{formatDate(currentArticle?.date)}</p>
                                </div>
                            </div>

                        </div>

                        {/* Post title */}
                        <h2 className="text-3xl font-bold mb-2 hover:underline">
                            <Link to={`/posts/${currentArticle?._id}`} >
                                {currentArticle?.title}
                            </Link>
                        </h2>

                        {/* Post description */}
                        <p
                            className="text-blog mb-4" dangerouslySetInnerHTML={{ __html: currentArticle?.content.substring(0, 150) }}
                        />

                        {/* Hashtags */}
                        <div className="flex space-x-2">
                            {currentArticle?.hashtags?.slice(0, 6)?.map((tag, index) => {
                                const randomColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];
                                return <Link to={`/posts/search?hashtags=${tag}`} key={index} className={`text-base font-bold ${randomColor} text-blog px-2 rounded hover:und`}>
                                    #{tag}
                                </Link>
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PostSection;



















/* 
import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils"
import { Link } from "react-router-dom";
import defaultImage from "/default.png";

const colorsArray = ["bg-red-300", "bg-green-300", "bg-blue-300", "bg-yellow-300", "bg-purple-300", "bg-orange-300"];

const Section1 = ({ posts }) => {
    const displayedArticles = posts?.slice(0, 4);

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedArticles?.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    return <section className="relative h-[550px] lg:h-[700px]">
        {displayedArticles?.map((article, index) => {
            const formattedDate = formatDate(article?.createdAt)
            const image = article?.image?.url || defaultImage
            return <div
                key={index}
                className={`absolute top-0 left-0 right-0 bottom-0 transition-opacity ${currentIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <div
                    className="h-full w-full bg-cover bg-center relative "
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
                    <div className="absolute top-[40px] left-[40px] right-[40px] p-10 text-start bg-white text-black w-[300px] md:w-[500px]">

                        <div className="self-stretch flex flex-col items-start justify-start gap-[24px]">
                            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                                <Link
                                    to={`/author/${article?.user?._id}`}
                                    className="self-stretch relative leading-[20px] font-semibold hover:underline">
                                    <span className="hover:underline">{article?.user?.username || "Unknown"}</span> • {formattedDate}
                                </Link>
                                <h2 className="self-stretch flex flex-row items-start justify-start gap-[16px] text-3xl">
                                    <Link to={`/posts/${article?._id}`} className="flex-1 relative">
                                        {article?.title}
                                    </Link>
                                </h2>
                                <p
                                    className="self-stretch relative leading-[24px]  text-gray-500" dangerouslySetInnerHTML={{ __html: article?.content.substring(0, 150) }}
                                />
                            </div>
                            <div className="self-stretch flex flex-row items-start justify-start gap-[8px] text-center">
                                {
                                    article?.hashtags?.slice(0, 6)?.map((tag, index) => {
                                        const dynamicClass = colorsArray[index % colorsArray.length];
                                        return (
                                            <Link to={`/posts/search?hashtags=${tag}`} key={index} className="flex flex-row items-start justify-start mix-blend-multiply">
                                                <div className={`rounded-2xl ${dynamicClass} flex flex-row items-center justify-center py-0.5 px-2.5`}>
                                                    <div className="relative leading-[20px] font-medium text-blue-900 cursor-pointer">
                                                        {tag}
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })}
    </section>
};

export default Section1;

*/