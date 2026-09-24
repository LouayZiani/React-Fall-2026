import Navbar from "./components/Navbar";
import ProfileSidebar from "./components/ProfileSideBar";
import Introduction from "./components/Introduction";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="app">

      <Navbar />

      <main className="main-container">

        <ProfileSidebar />

        <div className="main-content">
          <Introduction />
          <Projects />
        </div>

      </main>

      <Footer />

    </div>
  );
}

export default App;