import { NavLink, useLocation } from "react-router-dom";
import Button from "./ui/Button";
import toast from "react-hot-toast";

/* _________________ local Storage _________________ */
const getUserData = localStorage.getItem("loginUser")
const userData = getUserData ? JSON.parse(getUserData) : null;

const Navbar = () => {
    const {pathname} = useLocation();

    const onLogout = () => {
        localStorage.removeItem("loginUser")
        toast.success("You will navigate to the Login page after 2 seconds to login.",
            {
                position: "bottom-center",
                duration: 2000,
                style: {
                    backgroundColor: "black",
                    color: "white",
                    width: "fit-content",
                },
            }
        );
        setTimeout(function() {
            location.replace(pathname)
        }, 2000);
    }

    return (
        <nav className="max-w-lg mx-auto mt-7 mb-20 px-3 py-5 rounded-md">
            <ul className="flex items-center justify-between">
                <li className="text-black duration-200 font-semibold text-lg">
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                {
                    userData ? (
                        <div className="flex items-center text-indigo-600 space-x-4">
                            <li className="duration-200 text-lg">
                                <NavLink to="/todos">todos</NavLink>
                            </li>
                            <Button 
                                className="bg-indigo-500 text-white p-2 rounded-md cursor-pointer"
                                onClick={onLogout}
                            >
                                Logout
                            </Button>
                        </div> 
                    ) : (
                        <div className="flex items-center space-x-3">
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
                        </div>
                    )
                }

                
            </ul>
        </nav>
    );
};

export default Navbar;