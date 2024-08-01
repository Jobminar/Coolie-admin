import Routing from "./Routing";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="App">
        <Toaster />
        <Routing />
      </div>
    </>
  );
}

export default App;
