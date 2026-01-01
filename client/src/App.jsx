import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.BASE_URL + "/data");
        console.log(import.meta.env.BASE_URL);
        setData(response.data.data);
        console.log("Data fetched from server:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to Binary Project</h1>
      <h2>Data from Server: {data}</h2>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <UserButton />
    </div>
  );
}

export default App;
