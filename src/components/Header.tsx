import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
      <Link href="/">
        <h1 className="text-2xl font-semibold cursor-pointer">Little Project Manager</h1>
      </Link>
      <nav>
        <Button variant="outline">LOGOUT</Button>
      </nav>
    </header>
  );
};

export default Header;
