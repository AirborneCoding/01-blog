import React, { useState } from "react";
import { BsFillGridFill, BsList } from '@/assets/icons';
import DataItemsGrid from "./DataItemsGrid";
import DataItemsList from "./DataItemsList"
import { useHandleLikeMutation } from "@/redux/services/postsServices";


const Data = ({ posts, totalData, user }) => {
    const [layout, setLayout] = useState('grid');

    const setActiveStyles = (pattern) => {
        return `text-xl cursor-pointer pl-1.5 btn-circle btn-sm ${pattern === layout
            ? 'bg-gray-100 text-white font-bold'
            : 'btn-ghost text-based-content'
            }`;
    };

    // likes
    const [like] = useHandleLikeMutation()

    const handleLikePost = async (id) => {
        try {
            await like({ id })
        } catch (error) {
            console.log(error);
        }
    }

    return <section className="">
        {/* HEADER */}
        <div className='flex justify-between items-center border-b border-base-300 pb-5'>
            <h4 className='font-medium text-md'>
                {totalData} Article{totalData > 1 && 's'}
            </h4>
            <div className='flex gap-x-2'>
                <button
                    type='button'
                    onClick={() => setLayout('grid')}
                    className={setActiveStyles('grid')}
                >
                    <BsFillGridFill />
                </button>
                <button
                    type='button'
                    onClick={() => setLayout('list')}
                    className={setActiveStyles('list')}
                >
                    <BsList />
                </button>
            </div>
        </div>
        <div className="bg-blog p-0.5 rounded-lg" />
        {/* POSTS */}
        <div>
            {totalData === 0 ? (
                <h5 className='text-2xl mt-16'>
                    Sorry, No Posts matched your search...
                </h5>
            ) : layout === 'grid' ? (
                <DataItemsGrid posts={posts} user={user} handleLikePost={handleLikePost} />
            ) : (
                <DataItemsList posts={posts} user={user} handleLikePost={handleLikePost} />
            )}
        </div>
    </section>;
};

export default Data;