import { Link } from 'react-router-dom';

const Public = () => {
    const content = (
        <section className="public min-h-screen flex flex-col justify-between items-center ">
            <header>
                <h1 className='text-5xl font-semibold mb-6 text-center'>Welcome to <span className="text-blue-600">Dan D. Repairs!</span></h1>
            </header>
            <main className="public__main text-center flex-grow">
                <p className="text-xl mb-4 font-bold">Located in Beautiful Downtown Foo City, Dan D. Repairs provides a trained staff ready to meet your tech repair needs.</p>
                <div className='flex items-center justify-center gap-8'>
                    <div>
                        <h2 className="text-3xl font-semibold mt-8">Our Location</h2>
                        <address className="public__addr text-lg text-left">

                    Dan D. Repairs<br />
                    555 Foo Drive<br />
                    Foo City, CA 12345<br />
                            <a href="tel:+15555555555" className="underline text-blue-800"> (555) 555-5555</a>
                </address>
                        <p className="text-lg">Owner: Dan Davidson</p>
                    </div>
                    <div>
                        {/* Additional Content */}
                        <div className="mt-8">
                            <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
                            <ul className="text-lg text-left">
                                <li>Phone Repairs</li>
                                <li>Laptop Repairs</li>
                                <li>Tablet Repairs</li>
                                <li>Software Installation</li>
                                <li>Hardware Upgrades</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        {/* Additional Content */}
                        <div className="mt-8">
                            <h2 className="text-3xl font-semibold mb-4">Our Tool's</h2>
                            <ul className="text-lg text-left">
                                <li>Task management</li>
                                <li>Employee directories</li>
                                <li>Boost productivity</li>
                                <li>Role based access</li>
                                <li>With best SOP</li>
                            </ul>
                        </div>
                    </div>
                </div>



            </main>
            <footer className="mt-auto">
                <Link
                    to="/login"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out shadow-blue-200 shadow-sm hover:shadow-lg hover:shadow-blue-300"
                >
                    Employee Login
                </Link>
            </footer>

        </section>
    );
    return content;
}

export default Public;
