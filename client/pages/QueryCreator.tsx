import { useState } from "react";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function QueryCreator() {

  const [projects, setProjects] = useState("");
  const [customQueryName, setCustomQueryName] = useState("");
  const [customQueryWIQL, setCustomQueryWIQL] = useState("");
  const [starterQueries, setStarterQueries] = useState(false);
  const [toSubfolder, setToSubfolder] = useState(false);
  const [flatQuery, setFlatQuery] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try{
      
      // Add custom query if inputted
      let customQueryObj: { name: string; wiql: string; isFolder?: boolean } | undefined = undefined;
      
      if(customQueryWIQL.trim()){

        // Check that query name is given
        if(!customQueryName.trim()){
          setMessage("Custom Query Name is required if WIQL is provided.");
          setLoading(false);
          return
        }

        // Use given name to create object
        customQueryObj = {
          name: customQueryName.trim(),
          wiql: customQueryWIQL.trim(),
          isFolder: false, 
        };
      }

      const response = await fetch(
        "https://pspc-co-op-projects-axhzgvbze6d9c7b8.eastus-01.azurewebsites.net/query-creator",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projects, customQuery: customQueryObj, starterQueries, toSubfolder, flatQuery,}),
        }
      );

      const data = await response.json();
      setMessage(data.body?.message || "Query created!");
    } catch(err){
      setMessage("Error: " + (err instanceof Error ? err.message : String(err)));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-ado-bg">
      <Header />
      <main className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-ado-text font-inter text-4xl font-bold mb-8 text-center">
            🔍 Query Creator
          </h1>
          <p className="text-ado-text font-inter text-xl mb-4 leading-8 tracking-tight opacity-70">
            Type the project name(s) you wish to add queries to, separated by commas. Optionally, enter a name and WIQL input to add a custom query. Then click Create Query.
          </p>

          <div className="space-y-6">
            {/* Form Inputs */}
              {/* Project Names Input */}
              <div className="space-y-2">
                <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                  Project Name(s)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Example Project 1, Example Project 2"
                  value={projects}
                  onChange={(e) => setProjects(e.target.value)}
                  className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
                />
              </div>

              {/* Custom Query Name */}
              <div className="space-y-2">
                <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                  Custom Query Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Blocked Work Items"
                  value={customQueryName}
                  onChange={(e) => setCustomQueryName(e.target.value)}
                  className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-7 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary"
                />
              </div>

              {/* Custom Query WIQL Input */}
              <div className="space-y-2">
                <label className="text-ado-text font-inter text-15 font-bold leading-7 tracking-tight">
                  Custom Query WIQL
                </label>
                <textarea
                  placeholder="SELECT, FROM, and WHERE Clauses"
                  rows={7}
                  value={customQueryWIQL}
                  onChange={(e) => setCustomQueryWIQL(e.target.value)}
                  onKeyDown={(e) => {
                    // Support indentation
                    if (e.key === "Tab") {
                      e.preventDefault(); 
                      const start = e.currentTarget.selectionStart;
                      const end = e.currentTarget.selectionEnd;
                      const newValue =
                        customQueryWIQL.substring(0, start) +
                        "    " +
                        customQueryWIQL.substring(end);

                      setCustomQueryWIQL(newValue);

                      // Move cursor after inserted spaces
                      setTimeout(() => {
                        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4;
                      }, 0);
                    }
                  }}
                  className="w-full px-5 py-3 bg-white border border-ado-border rounded-lg text-ado-text font-montserrat text-15 leading-5 tracking-tight placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-ado-primary focus:border-ado-primary resize-none"
                />
              </div>

              {/* Left aligned - Place in Subfolder + Starter Queries */}
              <div className="flex items-center space-x-6">
              {/* Starter Queries */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={starterQueries}
                  onChange={(e) => setStarterQueries(e.target.checked)}
                  className="w-5 h-5 cursor-pointer rounded border border-ado-border bg-white accent-ado-primary"
                />
                <span className="text-ado-text font-inter text-15 font-bold">
                  Starter Queries
                </span>
              </label>

              {/* Place in Subfolder */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={toSubfolder}
                  onChange={(e) => setToSubfolder(e.target.checked)}
                  className="w-5 h-5 cursor-pointer rounded border border-ado-border bg-white accent-ado-primary"
                />
                <span className="text-ado-text font-inter text-15 font-bold">
                  Place in Subfolder
                </span>
              </label>

              {/* Flat Query */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flatQuery}
                  onChange={(e) => setFlatQuery(e.target.checked)}
                  className="w-5 h-5 cursor-pointer rounded border border-ado-border bg-white accent-ado-primary"
                />
                <span className="text-ado-text font-inter text-15 font-bold">
                  Flat Query
                </span>
              </label>
            </div>

              {/* Create Query Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-ado-primary text-white font-inter text-17 font-bold leading-8 tracking-tight px-6 py-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-3 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Query"}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.93335 2L14 7.63333L7.93335 13.2667"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="bevel"
                  />
                  <path
                    d="M1 7.4012H13.1333"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="bevel"
                  />
                </svg>
              </button>

              {message && (
                <p className="text-ado-text font-montserrat text-15 mt-2">{message}</p>
              )}
            </div>
          </div>
      </main>
      <Footer />
    </div>
  );
}
