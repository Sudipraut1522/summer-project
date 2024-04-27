const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">
          &copy; 2024 Your Company. All rights reserved.
        </p>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-white">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
