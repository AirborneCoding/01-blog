import { Loading, Pagination } from '@/helpers';
import useSearch from "@/hooks/search/useSearch";
import { Link } from "react-router-dom";
import PostsData from "@/components/posts/postsData/DataItemsGrid"
import { useSelector } from "react-redux"
import Categories from './Categories';
import Authors from './Authors';

const AllSearchs = () => {
  const { user } = useSelector(state => state.auth)
  const {
    searchedQuery,
    searchData, isLoading, isError, error
  } = useSearch()



  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    // console.log(error.status);
    if (error.status === 404) {
      return <main className='body-container min-h-screen'>
        <div className='mt-24 grid place-items-center text-[20px] font-bold'>
          <h2>No posts found</h2>
          <Link to="/" className='btn btn-primary mt-10 w-72' >Back Home</Link>
        </div>
      </main>
    } else {
      return <div>Error fetching data</div>;
    }
  }
  const { posts, categories, authors, pagination } = searchData ?? {};
  const { total: totalData, pageCount, page } = pagination ?? {}
  // console.log(posts);
  if ((posts?.count === 0) && (categories?.count === 0) && (authors?.count === 0)) {
    return <main className='body-container my-16 min-h-screen text-center'>
      <h2 className='text-[20px] bg-blog text-white py-5 rounded shadow-md shadow-black'>
        😞 No results matched your search : <span className='underline'>{searchedQuery}</span>
      </h2>
    </main>
  }

  return <main className="my-16 body-container min-h-screen" >
    {/* authors */}
    {
      authors?.count > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">{authors?.count} Search Results - Authors</h2>
          <Authors authors={authors} />
        </section>
      )
    }
    {/* categories */}
    {
      categories?.count > 0 && (
        <section className='my-10'>
          <h2 className="text-2xl font-bold mb-4">{categories?.count} Search Results - Authors</h2>
          <Categories categories={categories} />

        </section>
      )
    }
    {/* posts */}
    {
      posts?.count > 0 && (
        <section>
          <h2 className='text-2xl font-bold mb-4'>{posts?.count}  Posts found</h2>
          <PostsData
            user={user}
            posts={posts?.results}
            fromSearch={true}
          />
        </section>
      )
    }

    <Pagination
      pageCount={pageCount}
      page={page}
    />
  </main>;
};

export default AllSearchs;





/* 
import React, { useState } from "react";
import useSearch from "@/hooks/search/useSearch";
import { Loading, Pagination } from '@/helpers';
import { Link } from "react-router-dom";
import PostsData from "../../../components/posts/postsData/DataItemsGrid";
import Categories from './Categories';
import Authors from './Authors';
import { useSelector } from "react-redux";

const AllSearchs = () => {
  const { user } = useSelector(state => state.auth);
  const {
    searchedQuery,
    searchData, isLoading, isError, error
  } = useSearch();

  const [resultType, setResultType] = useState('posts'); 

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    if (error.status === 404) {
      return (
        <main className='body-container min-h-screen'>
          <div className='mt-24 grid place-items-center text-[20px] font-bold'>
            <h2>No posts found</h2>
            <Link to="/" className='btn btn-primary mt-10 w-72'>Back Home</Link>
          </div>
        </main>
      );
    } else {
      return <div>Error fetching data</div>;
    }
  }

  const { posts, categories, authors, pagination } = searchData ?? {};
  const { total: totalData, pageCount, page } = pagination ?? {};

  if ((posts?.count === 0) && (categories?.count === 0) && (authors?.count === 0)) {
    return (
      <main className='body-container my-16 min-h-screen text-center'>
        <h2 className='text-[20px] bg-blog text-white py-5 rounded shadow-md shadow-black'>
          😞 No results matched your search : <span className='underline'>{searchedQuery}</span>
        </h2>
      </main>
    );
  }

  return (
    <main className="my-16 body-container min-h-screen">
      <div className="flex mb-8 space-x-4">
        {
          posts?.count !== 0 && (
            <button
              onClick={() => setResultType('posts')}
              className={`btn ${resultType === 'posts' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Posts ({posts?.count})
            </button>
          )
        }

        {
          authors?.count !== 0 && (
            <button
              onClick={() => setResultType('authors')}
              className={`btn ${resultType === 'authors' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Authors ({authors?.count})
            </button>
          )
        }
        {
          categories?.count !== 0 && (
            <button
              onClick={() => setResultType('categories')}
              className={`btn ${resultType === 'categories' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Categories ({categories?.count})
            </button>
          )
        }

      </div>

      {resultType === 'authors' && authors?.count > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">{authors?.count} Search Results - Authors</h2>
          <Authors authors={authors} />
        </section>
      )}

      {resultType === 'categories' && categories?.count > 0 && (
        <section className='my-10'>
          <h2 className="text-2xl font-bold mb-4">{categories?.count} Search Results - Categories</h2>
          <Categories categories={categories} />
        </section>
      )}

      {resultType === 'posts' && posts?.count > 0 && (
        <section>
          <h2 className='text-2xl font-bold mb-4'>{posts?.count}  Posts found</h2>
          <PostsData
            user={user}
            posts={posts?.results}
            fromSearch={true}
          />
        </section>
      )}

      <Pagination
        pageCount={pageCount}
        page={page}
      />
    </main>
  );
};

export default AllSearchs;


*/