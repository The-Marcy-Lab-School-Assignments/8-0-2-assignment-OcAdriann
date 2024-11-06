import NavBar from "./components/NavBar";
import GifContainer from "./components/GifContainer";
import { useState, useEffect } from "react";

const URL = `/api/gifs`;

function App() {
  const [gifs, setGifs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const doFetch = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }
        const data = await response.json();
        setGifs(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    doFetch();
  }, []);

  return (
    <div>
      <NavBar color="black" title="Giphy Search" />
      <div className="ui container">
        <GifContainer gifs={gifs} />
      </div>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </div>
  );
}

export default App;
