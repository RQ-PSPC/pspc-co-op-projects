import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useState } from 'react';
//import { Link } from 'react-router-dom';
//import e from 'express';

export default function Anastasia() {

  const [name, setName] = useState('');

  return (
    <div className="min-h-screen bg-ado-bg">
      <Header />
      <main className="px-4 py-6">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-ado-text font-inter text-4xl font-bold mb-12 text-center">
            🎀 Anastasia's Project 🎀
          </h1>

          <div className="max-w-md mx-auto">
            <label className="block mb-2 font-semibold">
              Enter your name:
            </label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type here..."
              className="w-full p-2 border rounded"
            />
            <p className="mt-4">
              You entered: {name}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
