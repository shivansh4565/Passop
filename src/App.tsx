import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Manager from "./Components/Manager";
import About from "./Components/About";     // 👈 create About.tsx
import Contact from "./Components/Contact"; // 👈 create Contact.tsx
// 👈 create PassOp.tsx

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Manager />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
       
      </Routes>
    </Router>
  );
}

export default App;
