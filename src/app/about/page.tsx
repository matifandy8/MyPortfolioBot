import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About | Portfolio Bot",
    description:
        "Learn more about the portfolio bot designed to assist recruiters with their recruitment process using AI-powered chatbot technology.",
    keywords: ["portfolio bot", "recruitment chatbot", "AI chatbot", "Next.js", "Hugging Face"],
};

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center mb-8">About</h1>

                <p className="text-lg text-center mb-8">
                    This is a portfolio bot designed to provide recruiters with a personal AI-powered chatbot to streamline their recruitment process.
                    <br />
                    <br />
                    The bot is built using modern technologies like{" "}
                    <strong>Next.js</strong>, <strong>TypeScript</strong>,{" "}
                    <strong>Tailwind CSS</strong>, and <strong>Hugging Face</strong>. It is deployed on{" "}
                    <strong>Vercel</strong> for optimal performance.
                    <br />
                    <br />
                    You can explore the source code on GitHub:{" "}
                    <Link
                        href="https://github.com/matifandy8"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source code on GitHub"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        https://github.com/matifandy8
                    </Link>
                    .
                </p>

                <div className="mt-8 text-center text-sm">
                    Made with ❤️ by{" "}
                    <Link
                        href="https://github.com/matifandy8"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit Matías Fandiño's GitHub profile"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Matías Fandiño
                    </Link>
                </div>

                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        aria-label="Go back to the home page"
                    >
                        GO BACK TO HOME
                    </Link>
                </div>
            </div>
        </div>
    );
}