
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Learnify</h1>
      <nav>
        <Button variant="outline">Login</Button>
        <Button>Sign Up</Button>
      </nav>
    </header>
  );
};

export default Header;
