
const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Learnify. All rights reserved.</p>
       <div className="text-center text-xs mt-4">
          Email: info@little.pm Privacy Policy Terms of Use
          <div className="flex items-center justify-center gap-4 mt-2">
            Connect with us
            <span>Y</span>
            <span>I</span>
            <span>in</span>
            <span>f</span>
          </div>
        </div>
    </footer>
  );
};

export default Footer;

