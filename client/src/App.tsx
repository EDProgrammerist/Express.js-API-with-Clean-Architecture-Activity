import { useEffect, useState } from "react";
import "./App.css";

type HealthResponse = {
  status: string;
  message: string;
  timestamp: string;
};

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiUrl =
      import.meta.env.VITE_API_URL ?? "http://localhost:7000";

    fetch(`${apiUrl}/api/health`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("The API returned an error.");
        }

        return response.json() as Promise<HealthResponse>;
      })
      .then((data) => {
        setHealth(data);
      })
      .catch((requestError: Error) => {
        setError(requestError.message);
      });
  }, []);

  return (
    <main>
      <h1>React + Express Application</h1>

      {!health && !error && <p>Checking the API...</p>}

      {health && (
        <section>
          <p>API status: {health.status}</p>
          <p>{health.message}</p>
          <p>{health.timestamp}</p>
        </section>
      )}

      {error && <p>API error: {error}</p>}
    </main>
  );
}

export default App;