import LanguageSelector from "../LanguageSelector/LanguageSelector";
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
