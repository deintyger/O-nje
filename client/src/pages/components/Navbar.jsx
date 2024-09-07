import { Menu, Image } from "antd";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="header">
      <div className="logo">
        <Image src="/barlogo.png" alt="Logo" preview={false} />
      </div>
      <Menu className="menu">
        <Menu.Item key="1">
          <Link className="menuItem" to="/add-recipe">Add Recipe</Link>
        </Menu.Item>
        <Menu.Item className="menuItem" key="2">
          <Link className="menuItem" to="/contact-us">Contact Us</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
