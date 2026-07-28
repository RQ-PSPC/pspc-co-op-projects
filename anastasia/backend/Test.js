import { useState } from "react";

export default function Test() {

    const [id, setId] = useState("");
    const [result, setResult] = useState(null);

    async function search() {

        const response = await fetch(
            `http://localhost:3000/api/employee/${id}`
        );

        const data = await response.json();

        setResult(data);
    }

    return (
        <div>
            <h1>Database Test</h1>

            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter Employee ID"
            />

            <button onClick={search}>
                Search
            </button>

            <pre>
                {JSON.stringify(result, null, 2)}
            </pre>
        </div>
    );
}