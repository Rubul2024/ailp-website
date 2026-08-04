import "./Header.css";

export default function Header() {
  return (
    <header className="header">

      <div className="container header-container">

        {/* Logo */}

        <div className="logo">

          <span className="logo-text">
            AILP
          </span>

        </div>

        {/* Navigation */}

        <nav>

          <ul className="nav-links">

            <li><a href="/">Home</a></li>

            <li><a href="/about">About</a></li>

            <li><a href="/leadership">Leadership</a></li>

            <li><a href="/gallery">Gallery</a></li>

            <li><a href="/news">News</a></li>

            <li><a href="/contact">Contact</a></li>

          </ul>

        </nav>

        {/* Join Button */}

        <a href="/join" className="join-btn">

          Join Now

        </a>

      </div>

    </header>
  );
}