import { AuthorInfo, AuthorPosts } from "@/components";
import UseAuthors from "@/hooks/authors/UseAuthors";

const AuthorPage = () => {
    window.scrollTo(0, 100)
    const {
        authorId,
        // author
        author,
        authorLoader,
        authorError,
        // author posts
        authorPosts,
        authorPostsLoader,
        authorPostsError,
    } = UseAuthors()
    return <>
        <main className="body-container mt-16 py-10">
            <AuthorInfo
                authorId={authorId}
                author={author}
                loader={authorLoader}
                error={authorError}
            />
            <hr />
            <section className="mt-10">
                <div className="text-[25px] underline underline-offset-8">
                    Author Posts {authorPosts?.count}:
                </div>
                <AuthorPosts
                    authorId={authorId}
                    authorPosts={authorPosts}
                    loader={authorPostsLoader}
                    error={authorPostsError}
                />
            </section>
        </main>;
    </>
};

export default AuthorPage;
