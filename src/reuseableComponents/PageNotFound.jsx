import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoaderComponent, Loading } from "./LoaderComponent";

const PageNotFound = () => {
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setLoader(true);
        let timer = setTimeout(() => {
            setLoader(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    if (loader) {
        return <LoaderComponent size={"large"} />;
    }

    return (
        <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-[#9810FA] to-[#8200DB] px-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
                {/* Illustration */}
                <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#9810FA] to-[#8200DB] flex items-center justify-center shadow-lg">
                        <span className="text-white text-4xl font-bold">404</span>
                    </div>
                </div>

                {/* Text */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
                <p className="text-gray-500 text-sm mb-6">
                    Oops! The page you’re looking for doesn’t exist or has been moved.
                </p>

                {/* Action */}
                <Link
                    to="/"
                    className="inline-block bg-[#9810FA] hover:bg-[#8200DB] text-white px-6 py-2 rounded-lg transition duration-200 mt-2"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;


// background: linear-gradient(90deg, #9810FA 0%, #8200DB 100%);
