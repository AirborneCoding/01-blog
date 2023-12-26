import { Link } from "react-router-dom";
import { formatDate } from "@/utils"
import defaultImage from "/default.png";
const colorsArray = ["bg-red-300", "bg-green-300", "bg-blue-300", "bg-yellow-300", "bg-purple-300", "bg-orange-300"];
const Section2 = ({ posts }) => {

  const displayedArticles = posts?.slice(4, 8);

  return (
    <section className="body-container py-8">
      {/* <h2 className="text-gray-100 text-14xl underline underline-offset-8 mb-10">
        Recent posts
      </h2> */}

      <div className="grid md:grid-cols-2 lg:grid-cols-8 gap-5">
        {displayedArticles?.map((article, index) => {
          const formattedDate = formatDate(article?.createdAt)
          const image = article?.image?.url || defaultImage
          return <div
            key={article._id}
            className={`${index === 0 ? 'lg:col-span-4 lg:row-span-4 ' : ''
              } ${index === 1 ? 'lg:col-span-4 lg:row-span-2 lg:col-start-5 ' : ''
              } ${index === 2
                ? 'lg:col-span-4 lg:row-span-2 lg:col-start-5 lg:row-start-3 '
                : ''
              } ${index === 3 ? 'lg:col-span-8 lg:row-span-3 lg:row-start-5  ' : ''
              }`}
          >
            <div
              className={`${index === 0 ? '' : ''
                } ${index === 1 ? 'lg:grid grid-cols-2 gap-10' : ''
                } ${index === 2
                  ? 'lg:grid grid-cols-2 gap-10 '
                  : ''
                } ${index === 3 ? 'lg:grid grid-cols-2 gap-10' : ''
                }  `}
            >

              <div>
                <img src={image}
                  className={`${index === 0 ? 'w-full overflow-hidden lg:h-[270px] lg:object-cover' : ''
                    } ${index === 1 ? 'w-full lg:h-[270px] overflow-hidden shrink-0 object-cover' : ''
                    } ${index === 2
                      ? 'w-full lg:h-[270px] overflow-hidden shrink-0 object-cover'
                      : ''
                    } ${index === 3 ? 'w-full overflow-hidden lg:h-[270px] lg:object-cover' : ''
                    }`}
                />
              </div>

              <div>

                <div className="self-stretch flex flex-col items-start justify-start ">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                    <div
                      className="self-stretch relative leading-[20px] font-semibold mt-2">
                      <Link
                        to={`/author/${article?.user?._id}`}
                        className="hover:underline"

                      >
                        {article?.user?.username}
                      </Link>
                      • {formattedDate}
                    </div>
                    <h2 className="self-stretch flex flex-row items-start justify-start text-xl">
                      <Link
                        to={`/posts/${article?._id}`}
                        className="hover:underline flex-1 relative font-extrabold">
                        {article?.title}
                      </Link>
                    </h2>
                    <p className="-mt-3.5 self-stretch relative leading-[24px] text-gray-500 text-sm" dangerouslySetInnerHTML={{ __html: article?.content.substring(0, 150) }} />
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start gap-[8px] text-center">

                    {
                      article?.hashtags?.slice(0, 6)?.map((tag, index) => {
                        const dynamicClass = colorsArray[index % colorsArray.length];
                        return (
                          <div key={index} className="flex flex-row items-start justify-start mix-blend-multiply">
                            <Link to={`/posts/search?hashtags=${tag}`} className={`rounded-2xl ${dynamicClass} flex flex-row items-center justify-center py-0.5 px-2.5`}>
                              <div className="relative leading-[20px] font-medium text-blue-900 cursor-pointer hover:underline">
                                #{tag}
                              </div>
                            </Link>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
    </section>
  )
};

export default Section2;

