import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="max-w-lg mx-auto mt-7 mb-20 px-3 py-5 rounded-md">
            <ul className="flex items-center justify-between">
                <li className="text-black duration-200 font-semibold text-lg">
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                <li className="text-black duration-200 font-semibold text-lg">
                    <NavLink to="/register">
                        Register
                    </NavLink>
                </li>
                <li className="text-black duration-200 font-semibold text-lg">
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;