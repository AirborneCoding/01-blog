import { Link } from "react-router-dom";

const RegisterMsg = () => {
  return <section className='bg-cover bg-center grid place-items-center h-screen' style={{ backgroundImage: 'url("https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&w=600")' }}>
    <div className="p-5 bg-blog text-white rounded-md shadow-xl shadow-black mx-10">
      <p className="text-base ">
        Thank you for registering. An email has been sent to your email address with a verification link.
        Please check your inbox to verify your account.
      </p>
      <br />
      <p className="text-base text-white">
        You can also login into our projects.
      </p>
      <Link to="/login" className="btn btn-primiary">Login</Link>
    </div>
  </section>
};

export default RegisterMsg;
