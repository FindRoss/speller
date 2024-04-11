function Header({ setMenuOpen }) {
  return (
    <header>
      <div className="wrapper">
        <div className="header__layout">
          <span className="header__menu-icon">
            <i className="fa-solid fa-bars" onClick={() => setMenuOpen(menuOpen => !menuOpen)}></i>
          </span>
          <h1 className="header__title">
            Speller
          </h1>
        </div>
      </div>
    </header>
  )
}
export default Header