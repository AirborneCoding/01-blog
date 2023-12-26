import React from "react";
import useCategories from "@/hooks/categories/UseCategory";
import { categoriesImages } from "@/utils";
import { Loading } from "@/helpers";
import { Error } from "@/errors";
import { Link } from "react-router-dom";

const Categories = ({ searchedCategory }) => {
    const { categories,
        categoriesError,
        categoriesLoading,
    } = useCategories();
    if (categoriesLoading) {
        return <Loading />
    }
    if (categoriesError) {
        return <Error />
    }
   
    return (
        <main className="my-16 body-container">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4">
                <div className="hidden" />
                {categories.map((cate) => {
                    const encodedCategoryName = encodeURIComponent(cate?.name);
                    return (
                        <div key={cate?._id} className="card bg-base-100 shadow-xl image-full ">
                            <figure>
                                <img
                                    className='opacity-70 bg-black '
                                    src={categoriesImages.find((c) => c.name === cate.name)?.img}
                                    alt={cate.name}
                                />
                            </figure>

                            <div className="card-body">
                                <Link to={`/posts/search?category=${encodedCategoryName}`} >
                                    <h2 className="card-title btn btn-accent bg-blog hover:text-blog text-white  w-fit">{cate?.name}</h2>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    );
};

export default Categories;



/* 
                        <div key={category._id} className="category-card">
                            <img
                                className="rounded-md"
                                src={categoriesImages.find((c) => c.name === category.name)?.img}
                                alt={category.name}
                            />
                            <p>{category.name}</p>
                        </div>

*/