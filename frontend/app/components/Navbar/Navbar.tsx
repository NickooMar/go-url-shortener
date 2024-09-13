import LanguageSelector from "../LanguageSelector/LanguageSelecto";
import { ModeToggle } from "../ModeToggle/ModeToggle";

const Navbar = () => {
  return (
    <nav className="flex justify-end">
      <div className="p-2">
        <LanguageSelector />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
