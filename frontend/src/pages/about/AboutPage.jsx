import image from "/default.png"
const AboutPage = () => {
    return (
        <div className="bg-blog2 min-h-screen">
            {/* Hero Section */}
            <section className="text-center py-20">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-blog">
                        Welcome to My Blog
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Discover the latest stories, features, and insights from our team.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold text-blog mb-8">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-6 bg-blog2 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Responsive Design</h3>
                            <p className="text-gray-600">
                                Our blog is designed to look great on all devices, ensuring a seamless reading experience.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-6 bg-blog2 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">MERN Stack</h3>
                            <p className="text-gray-600">
                                Built with the MERN stack (MongoDB, Express.js, React, Node.js) for a robust and modern web application.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-6 bg-blog2 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Rich Features</h3>
                            <p className="text-gray-600">
                                Explore a variety of features, including user authentication, comments, and more.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="text-center py-16">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold text-blog mb-8">
                        Meet the Team
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                        {/* Team Member 1 */}
                        <div className="flex-shrink-0">
                            <img
                                src={image}
                                alt="Team Member 1"
                                className="h-24 w-24 object-cover rounded-full"
                            />
                            <p className="mt-2 text-lg font-semibold">John Doe</p>
                            <p className="text-gray-600">Web Developer</p>
                        </div>

                        {/* Team Member 2 */}
                        <div className="flex-shrink-0">
                            <img
                                src={image}
                                alt="Team Member 2"
                                className="h-24 w-24 object-cover rounded-full"
                            />
                            <p className="mt-2 text-lg font-semibold">Jane Smith</p>
                            <p className="text-gray-600">UI/UX Designer</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
