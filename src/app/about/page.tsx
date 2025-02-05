import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
    title: "About",
    description: "About page of my portfolio bot",
};

export default function About() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">About</h1>
                <p className="text-lg">
                    This is a portfolio bot that give to recruiters a personal chatbot
                    to help them with their recruitment process.
                    <br />
                    <br />
                    The bot is built with Next.js, TypeScript, Tailwind CSS,Hugging Face and deployed on Vercel.
                    <br />
                    You can find the source code on GitHub: <Link href="https://github.com/matifandy8" target="_blank" rel="noopener noreferrer">https://github.com/matifandy8</Link>
                    .
                </p>

                <p className="mt-8 text-center text-sm">
                    Made with ❤️ by{" "}
                    <Link href="https://github.com/matifandy8" target="_blank" rel="noopener noreferrer"> Matías fandiño</Link>
                </p>

                <Link href="/" target="_blank" rel="noopener noreferrer">
                    GO BACK TO HOME
                </Link>

            </div>
        </div>
    );
}

