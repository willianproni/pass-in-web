import nlwUniteIcon from "../assets/nlw-unite-icon.svg";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <div className="flex items-center gap-5">
      <img src={nlwUniteIcon} />

      <nav className="flex items-center gap-5 py-2">
        <NavLink href="">Eventos</NavLink>
        <NavLink href="">Participantes</NavLink>
      </nav>
    </div>
  );
}
