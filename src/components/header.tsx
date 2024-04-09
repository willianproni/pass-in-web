import nlwUniteIcon from "../assets/nlw-unite-icon.svg";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <div className="flex items-center gap-5">
      <NavLink to="/">
        <img src={nlwUniteIcon} />
      </NavLink>

      <nav className="flex items-center gap-5 py-2">
        <NavLink to="/">Eventos</NavLink>
        <NavLink to="/ateendee">Participantes</NavLink>
      </nav>
    </div>
  );
}
