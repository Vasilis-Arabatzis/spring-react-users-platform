import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UsersPage from "./page/UsersPage";
import CreateUserPage from "./page/CreateUserPage";

function App() {
  return (
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/create" element={<CreateUserPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;