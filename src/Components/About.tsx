import React from "react";

const About: React.FC = () => {
    return (
        <div className="relative min-h-screen text-black flex flex-col">
            {/* Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#ffffff_40%,#6633ee_100%)]"></div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">&lt;About PassOp /&gt;</h1>
                <p className="text-lg leading-relaxed">
                    PassOp is your own secure password manager, helping you store and manage
                    your passwords safely. Our goal is to make password management simple,
                    reliable, and completely secure. Never forget a password again!
                </p>
            </div>

            {/* Footer */}
            <footer className="w-full py-4 text-center text-gray-700 border-t border-gray-300 bg-white/30">
                Created with <span className="text-red-500">❤️</span> & 🍵 by Shivansh
            </footer>
        </div>
    );
};

export default About;
