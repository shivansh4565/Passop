import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-[#8259f3] text-white px-6 py-4 shadow-md rounded-3xl mt-2">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo / Brand */}
                <h1 className="text-2xl font-bold">&lt;PassOp /&gt;</h1>

                {/* Links */}
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="hover:text-yellow-300 transition-colors duration-200">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-yellow-300 transition-colors duration-200">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-yellow-300 transition-colors duration-200">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
