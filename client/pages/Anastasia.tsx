import { Header } from '../components/Header';
import { AnastasiaFooter } from '../components/AnastasiaFooter';
import { useState } from 'react';

export default function Anastasia() {
  const [projectName, setProjectName] = useState('');
  const [control, setControl] = useState("");
  const [controls, setControls] = useState<string[]>([]);
  const [rows, setRows] = useState([{ control: "", status: "Choose an option",},]);

  const [message, setMessage] = useState("");
  


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

    
  const updateRow = (
    index: number,
    field: "control" | "status",
    value: string
  ) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const submitRows = () => {
  console.log(rows);

  setRows([
    { control: "", status: "Choose an option" }]);

  setMessage("✅ Controls submitted successfully!");

  setTimeout(() => {
    setMessage("");
  }, 3000);
  };

    const addRow = () => {
      setRows([
        ...rows,
        {
          control: "",
          status: "Choose an option"
        }
      ]);
    };












  return (
    <div className="min-h-screen bg-ado-bg">
      <Header />

      <main className="px-4 py-6">
        <div className="max-w-4xl mx-auto text-left">

          <h1 className="text-ado-text font-inter text-4xl font-bold mb-12 text-center">
            Risk Assessment Program
          </h1>
          <h2 className="text-ado-text font-inter text-1xl font-bold italic mb-9 text-center">
            RAP by 🎀 Anastasia Sadovskyy 🎀
          </h2>


        <p className="text-ado-text font-inter text-1xl mb-9 text-center">
          EXPLANATION TEXT GOES HERE
          </p>

  

    <div className="flex items-center gap-4 mb-5">
      <p className="flex-1 text-center">
        Input your controls
      </p>
      <p className="w-48 text-center">
        Indicate their status
      </p>
    </div>
    
    {rows.map((row, index) => (
      <div
        key={index}
        className="flex items-center gap-4 mb-3">
        <input
          type="text"
          value={row.control}
          onChange={(e) =>
            updateRow(index, "control", e.target.value)
          }
          placeholder="Enter control..."
          className="flex-1 p-2 border rounded"
        />

        <select
          value={row.status}
          onChange={(e) =>
            updateRow(index, "status", e.target.value)
          }
          className={`p-2 rounded text-white font-semibold
            ${
              row.status === "Met" ? "bg-green-600" :
              row.status === "Partially Met" ? "bg-yellow-500 text-black"  :
              row.status === "Not Met" ? "bg-red-600" :
              "bg-gray-400 text-white"
            }
          `}
        >
          <option value="Choose an option">
            Choose an option
          </option>
          <option value="Met">
            Met
            </option>
          <option value="Partially Met">
            Partially Met
          </option>
          <option value="Not Met">
            Not Met
          </option>
        </select>
      </div>
    ))}

    <div className="flex gap-3 mt-4">
      <button
        onClick={addRow}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Row
      </button>

      <button
        onClick={submitRows}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Submit
      </button>
    </div>

    {message && (
      <p className="mt-4 text-green-600 font-semibold">
        {message}
      </p>
    )}
    </div>
      </main>

      <AnastasiaFooter />
    </div>
  );
}