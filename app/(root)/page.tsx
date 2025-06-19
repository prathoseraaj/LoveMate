import axios from "axios";
import React, { useState } from "react";

const Page = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsLoading(true);

    try {
      const result = await axios.post('/api/lovechat', { message });
      setResponse(result.data.response);
    } catch (error) {
      setResponse("Love is complicated... can you try again? ❤️");
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-pink-50">
      <div className="flex flex-col w-full max-w-md p-6 h-[60vh] bg-pink-100 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-pink-700 mb-4">LoveMate ❤️</h1>

        <div className="flex-1 overflow-y-auto mb-4 p-4 bg-white rounded-lg">
          {response || (
            <p className="text-gray-500">Ask me about love and relationships...</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:bg-pink-300 transition-colors"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;