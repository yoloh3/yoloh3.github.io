import React, { useState } from 'react';
import { PASSWORD } from '../constants';

interface Props {
  onUnlock: () => void;
}

const PasswordGate: React.FC<Props> = ({ onUnlock }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-200 overflow-hidden">
      {/* Cartoon Background Elements */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce">☁️</div>
      <div className="absolute top-20 right-20 text-5xl animate-pulse">☀️</div>
      <div className="absolute bottom-0 w-full h-1/3 bg-green-400 rounded-t-[50%] scale-150 translate-y-10"></div>

      <div className="z-10 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl max-w-sm w-full text-center border-4 border-pink-400 transform transition-all hover:scale-105">
        <h1 className="text-4xl fun-font text-pink-600 mb-2">Love Trip 🏍️</h1>
        <p className="text-gray-600 mb-6 font-bold">Interactive Journey Demo</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter password"
            className="text-center text-lg p-3 rounded-xl border-2 border-pink-300 focus:outline-none focus:border-pink-500 font-mono text-gray-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition active:scale-95 hover:shadow-xl"
          >
            Let's Go! 🚀
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500 font-bold animate-bounce">
            Wrong password! Try: 999
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGate;
