import Routing from "./Routing";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
        limit={1}
        position="top-right"
      />
      <Routing />
    </div>
  );
}

export default App;
