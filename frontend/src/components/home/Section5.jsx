import { formatDate } from "@/utils";
import { Link } from "react-router-dom";
import defaultImage from "/default.png";

const Section5 = (props) => {

    const formattedDate = formatDate(props?.createdAt)
    const image = props?.image?.url || defaultImage

    return <section className="relative">
        <figure>
            <img
                className="object-cover w-full h-[600px] "
                src={image}
                alt="Your Image"
                loading="lazy"
            />
        </figure>

        <div className="absolute top-[0px] left-[50px]">
            <div className="bg-white w-[509px] h-[483px]" />
            <p
                className="text-md absolute top-[236px] left-[39px] leading-[24px] inline-block w-[340px] md:w-[430px] h-[151px]"
                dangerouslySetInnerHTML={{ __html: props?.content.substring(0, 300) }} />
            <div className="absolute top-[200px] left-[39px] w-[332px] h-[22px] text-gray-200">
                <div className="absolute top-[0px] left-[134px] inline-block w-[198px] h-[22px] text-blog font-semibold">
                    <span>{formattedDate}</span>
                </div>
                <div className="absolute top-[11px] left-[121px] rounded-[50%] bg-gray-200 w-[3px] h-[3px] text-blog font-semibold" />
                <Link
                    to={`/author/${props?.user?._id}`}
                    className="hover:underline absolute top-[0px] left-[0px] inline-block w-28 h-[22px] text-blog font-semibold">
                    {props?.user?.username}
                </Link>
            </div>
            <h2
                className="text-xl font-bold absolute top-[105px] left-[39px] inline-block w-[430px] h-[83px] cursor-pointer"
            >
                <Link to={`/posts/${props._id}`}>
                    {props?.title}
                </Link>
            </h2>
            <Link to={`/posts/search?category=${props?.category.name}`} className="absolute top-[50px] left-[39px] text-xl text-white inline-block h-[29px] bg-blog w-fit px-2 rounded-md hover:underline">
                {props?.category?.name}
            </Link>
        </div>
    </section>;
};

export default Section5;
