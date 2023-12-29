import { Link } from "react-router-dom";
import { Loading } from '@/helpers'
import useVerifyEmail from "@/hooks/auth/useVerifyEmail";

const VerifyEmail = () => {

  const {
    data, isLoading, error, isError
  } = useVerifyEmail()


  console.log(data);

  if (isLoading) {
    return (
      <section className="grid place-items-center body-container h-screen">
        <Loading />
      </section>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <section className="grid place-items-center body-container h-screen">
        <h1 className="p-5 bg-blue-500 rounded-md shadow-xl shadow-black text-2xl font-bold">
          Verification Failed
        </h1>
      </section>
    );
  }

  return (
    <section className="grid place-items-center body-container h-screen">
      <>
        <div className="p-5 bg-blue-500 rounded-md shadow-xl shadow-black">
          <p className="text-base ">
            We are thrilled to inform you that your email address has been
            successfully verified. Welcome to our community! 🎉
          </p>
          <br />
          <p className="text-base text-white">
            With your email now verified, you have full access to all the
            features and benefits our platform has to offer. Whether it's
            accessing exclusive content, receiving important updates, or
            engaging with our community, you can now enjoy a seamless
            experience.
          </p>
          <div className="mt-5">
            <Link to="/my_profile" className="btn">
              Go To Profile
            </Link>
          </div>
        </div>
      </>
    </section>
  );
};

export default VerifyEmail;
