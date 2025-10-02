import React from "react";

const Contact: React.FC = () => {
    return (
        <div className="relative min-h-screen text-black flex items-center justify-center">
            {/* Background radial gradient */}
            <div className="absolute inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_10%,#ffffff_40%,#6633ee_100%)]"></div>

            {/* Content */}
            <div className="text-center p-6 max-w-md w-full space-y-4">
                <h1 className="text-4xl font-bold mb-4">&lt;Contact /&gt;</h1>
                <p className="text-lg mb-4">Have questions or feedback? Reach out to us!</p>

                <form className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="p-2 rounded-md text-black outline-none border border-gray-300"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="p-2 rounded-md text-black outline-none border border-gray-300"
                    />
                    <textarea
                        placeholder="Your Message"
                        className="p-2 rounded-md text-black outline-none border border-gray-300 resize-none h-24"
                    />
                    <button
                        type="submit"
                        className="bg-[#6633ee] hover:bg-[#8259f3] text-white py-2 rounded-md transition-colors duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
