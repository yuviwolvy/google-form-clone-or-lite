import HomePage from "./components/homepage";
import FormPage from "./components/formpage";
import Preview from "./components/preview";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/form-page/" element={<FormPage />}></Route>
      <Route path="/form-page/:formId" element={<FormPage />}></Route>
      <Route path="/preview/:formId" element={<Preview />}></Route>
    </Routes>
  );
}

export default App;
