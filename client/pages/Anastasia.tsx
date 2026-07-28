import { Header } from '../components/Header';
import { AnastasiaFooter } from '../components/AnastasiaFooter';
import { useState } from 'react';

export default function Anastasia() {
  const [projectName, setProjectName] = useState('');
  const [controls, setControls] = useState<string[]>([]);


  // Button to get the controls using the project name
 async function getControls() {
  try {

    const response = await fetch(
      `/api/projects/${projectName}`
    );

    const data = await response.json();

    setControls(data.controls || []);

  } catch (error) {
    console.error("FULL ERROR:", error);
  }
}











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
              Enter your project name:
            </label>

            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name..."
              className="w-full p-2 border rounded"
            />

            <button
              onClick={getControls}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Get controls
            </button>

            <ul className="mt-4">
              {controls.map((control, index) => (
                <li key = {index}>
                  {control}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <AnastasiaFooter />
    </div>
  );
}