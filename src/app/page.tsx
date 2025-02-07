import ChatInterface from "./components/chat-interface";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      <nav className="w-full p-4 bg-black">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">My Portfolio bot</h1>
          <a href="/about" className="text-white">
            About
          </a>
        </div>
      </nav>
      <section className="flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold text-white"></h2>
      <p className="mt-4 text-xl text-white pb-8">Ask me anything about my projects, experience, and skills!</p>
        <ChatInterface />
      </section>
      <footer className="flex flex-col items-center justify-center p-8 bg-black">
        <p className="text-white">Made with ❤️ by Matías Fandiño</p>
        <a href="https://www.linkedin.com/in/matiasfandino/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
          GitHub
        </a>
        <a href="linkedin.com/in/matias-fandino" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
          LinkedIn 
        </a>
      </footer>
    </main>
  );
}
