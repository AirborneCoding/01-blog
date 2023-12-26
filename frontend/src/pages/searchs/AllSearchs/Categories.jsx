import { categoriesImages } from "@/utils";
import { Link } from "react-router-dom";

const Categories = ({ categories }) => {
  return <>
    {categories.results.map((cate) => (
      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <figure>
          <img
            src={categoriesImages.find((c) => c.name === cate.name)?.img}
            alt={cate.name} className='opacity-70 bg-black '
          /></figure>
        <div className="card-body">
          <Link to={`/posts/search?category=${cate?.name}`}>
            <h2 className="card-title btn btn-accent bg-blog hover:text-blog text-white  w-fit">{cate?.name}</h2>
          </Link>
        </div>
      </div>
    ))}
  </>;
};

export default Categories;
