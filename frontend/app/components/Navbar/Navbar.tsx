import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { ModeToggle } from "../ModeToggle/ModeToggle";

const Navbar = () => {
  return (
    <nav className="flex justify-around py-8">
      <div>
        <h4 className="font-roboto font-bold pb-2 text-xl text-primary dark:text-primary-foreground">
          GO URL SHORTENER
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
