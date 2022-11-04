import CreateRandomTest from "./pages/req_2_1";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./common.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="create/test/random" element={<CreateRandomTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
