import { Link } from "react-router-dom";
import defaultImg from "/default.png"
const Section3 = (props) => {
    return (
        <section className="rounded section3-children cursor-pointer">
            <Link to={`/posts/${props._id}`}>
                <img
                    className="rounded"
                    src={props?.image?.url || defaultImg}
                    alt={props?.title}
                    loading="lazy"
                />
                <div className="section3-info mb-24">
                    <h3 className="font-extrabold text-white  body-container">
                        {props?.title}
                    </h3>
                    <p style={{ color: 'white' }} className="body-container text-white" dangerouslySetInnerHTML={{ __html: props?.content.substring(0, 150) }} />
                </div>
            </Link>
        </section>
    )

};

export default Section3;
