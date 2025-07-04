import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";

const NotFoundPage = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-2 bg-white verflow-y-auto">
                    <div className=" max-w-[90%] mx-auto py-8 space-y-10">
                        <div className="flex items-center justify-center h-screen bg-white px-4">
                            <div className="text-center">
                                <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
                                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                                <p className="text-gray-600 mb-6">
                                    Sorry, the page you are looking for doesn’t exist or has been moved.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                                >
                                    <FiArrowLeft className="mr-2" /> Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default NotFoundPage
