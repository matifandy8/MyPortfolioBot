import ChatInterface from "./components/chat-interface";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <nav className="w-full p-4 bg-black">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">My Portfolio bot</h1>
          <a href="/chat" className="text-white">
            About
          </a>
        </div>
      </nav>

      <section className="flex flex-col items-center text-center p-8">
        <h2 className="text-4xl font-bold text-white"></h2>
        <p className="mt-4 text-lg text-white">Ask me anything about my projects, experience, and skills!</p>
      </section>
      <section>
        <ChatInterface />
      </section>
    </main>
  );
}
