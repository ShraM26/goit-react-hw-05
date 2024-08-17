import { NavLink } from "react-router-dom";
import css from './Navigation.module.css'

const Navigation = () => {
 return (
    <header className={css.header}>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => 
            isActive ? `${css.navLink} ${css.activeLink}` : css.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => 
            isActive ? `${css.navLink} ${css.activeLink}` : css.navLink
          }
        >
          Movies
        </NavLink>
      
     </nav>

    </header>
  );
}

export default Navigation;