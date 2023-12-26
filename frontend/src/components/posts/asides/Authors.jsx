import React from "react";
import { Error } from "@/errors"
import { useFetchAuthorsQuery } from "@/redux/services/authorsServices";
import { Link } from "react-router-dom";

const Authors = () => {
    const { data: authors, isError: authorsError, isLoading: authorsLoader } = useFetchAuthorsQuery();
    if (authorsLoader) {
        return <div className="">loader...</div>
    }
    if (authorsError) {
        return <Error />
    }
    return <aside>
        <h3 className="text-xl">Top 5 authors</h3><hr />
        <div className="flex flex-col space-y-5 mt-5">
            {
                authors.map((author) => {
                    return (
                        <div key={author._id} className="flex  space-x-3" >
                            <figure>
                                <img
                                    src={author?.avatar?.url}
                                    alt={author?.username}
                                    className="rounded-full w-12 h-12"
                                />
                            </figure>
                            <div>
                                <Link to={`/author/${author?._id}`} >
                                    <h5 className="text-base -mb-1 hover:underline">{author?.username}</h5>
                                </Link>
                                <h4 className="text-base">total posts : {author?.postCount}</h4>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    </aside>
};

export default Authors;
