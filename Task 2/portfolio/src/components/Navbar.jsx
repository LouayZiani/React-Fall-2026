function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="#home" className="navbar-name">
          Louay Ziani
        </a>

        <nav className="navbar-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;