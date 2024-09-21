import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { ModeToggle } from "../ModeToggle/ModeToggle";

const Navbar = () => {
  return (
    <nav className="flex justify-around items-center py-6">
      <div className="flex justify-center items-center">
        <h4 className="font-core-sans font-bold text-xl text-primary dark:text-primary-foreground">
          GO TOOLKIT
        </h4>
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSelector />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
