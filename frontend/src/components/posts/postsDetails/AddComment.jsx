import React from "react";
import { Link } from "react-router-dom";

const AddComment = ({ user, comments, submitComment, addCommentLoader }) => {
    return <div className="mt-20">
        <Link to="/profile" className="font-bold text-xl">
            {comments?.length} comments
        </Link>
        <hr className="my-1" />
        <form method="POST" className="flex justify-between space-x-1" onSubmit={submitComment}>
            <input
                type="text"
                placeholder="Add a comment..."
                name="text"
                className="w-full border-none bg-neutral bg-opacity-5  px-1 h-10" />

            {
                user ?
                    <button value="intent" name="comment" className="font-bold text-base">
                        {addCommentLoader ? "Loading..." : "Post"}
                    </button>
                    :
                    <Link to="/login" className="font-bold text-base" >
                        Post
                    </Link>
            }
        </form>
    </div>
};

export default AddComment;
