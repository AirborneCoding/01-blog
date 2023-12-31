import useStats from "@/hooks/dashboard/useStats";
import { Link, useOutletContext } from "react-router-dom";
import Chart from "./Chart"
const Home = () => {
  const {
    totals,
    TotalsLoader,
    isTotalsError,
    totalsError,
  } = useStats()
  const { user } = useOutletContext()

  return <main>
    <section className="my-10 grid grid-cols-1 gap-4 md:grid-cols-5 md:grid-rows-2" >
      <div className="md:raw-span-2 border-2 p-5">
        <p>Total Posts</p>
        <p className="text-center">{totals?.postsCount || 0}</p>
      </div>
      <div className="md:raw-span-2  border-2 p-5">
        <p>Total Views</p>
        <p className="text-center">{totals?.viewsPerMonth || 0}</p>
      </div>

      {
        totals?.mostViewedArticle?.title && (
          <div className="md:col-span-3  border-2 p-5">
            <p>Most viewd article</p>
            <Link to={`/posts/${totals?.mostViewedArticle?._id}`} className="text-center pl-4 hover:underline">{totals?.mostViewedArticle?.title}</Link>
          </div>
        )
      }
    </section>

    {/* CHART */}
    <section>
      <h2 className="font-semibold text-[25px] mb-5">Total Views:</h2>
      {
        user?.isVerified
          ? (
            <>
              <Chart />
            </>
          ) : (
            <>
              <h3 className="text-xl">⚠  Please verify your email to can see visualation data about your posts</h3>
            </>
          )
      }
    </section>

  </main>;
};

export default Home;
