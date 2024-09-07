import { Menu, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="header">
      <div className="logo">
        <Image
          onClick={handleHomeClick}
          src="/barlogo.png"
          alt="Logo"
          preview={false}
        />
      </div>
      <Menu className="menu">
        <Menu.Item key="1">
          <Link className="menuItem" to="/add-recipe">Add Recipe</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link className="menuItem" to="/contact-us">Contact Us</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
