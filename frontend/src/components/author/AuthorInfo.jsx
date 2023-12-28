const AuthorInfo = (props) => {
  const {
    authorId,
    // author
    author,
    authorLoader,
    authorError,
  } = props

  if (authorLoader) {
    return <div className="text-center">Loading...</div>
  }

  if (authorError) {
    // console.log(error);
    return <div className="text-center my-5">
      {
        error.status === 404
          ? "No data found"
          : "Something went wrong Please back later..."
      }
    </div>;
  }
  console.log(author);
  return (
    <header className="mb-5">
      <div className="flex space-x-10">
        <figure>
          <img className="person-img" alt={author?.username} src={author?.avatar?.url} loading="lazy" />
        </figure>
        <div className="mt-5" >
          <h2 className="font-bold">{author?.username}</h2>
          <p className="leading-5 mt-2">{author?.bio}</p>
        </div>
      </div>
      <p className="leading-5" dangerouslySetInnerHTML={{ __html: author?.description }} />
    </header>
  );
};

export default AuthorInfo;