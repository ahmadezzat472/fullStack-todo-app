import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import HomePage from "../pages";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/errors/ErrorHandler";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

/* _________________ local Storage _________________ */
const getUserData = localStorage.getItem("loginUser")
const userData = getUserData ? JSON.parse(getUserData) : null;
console.log(userData);

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Root Layout */}
            <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
                <Route
                    index
                    element={
                        <ProtectedRoute
                            isAllowed={userData}
                            redirectPath="/login"
                            data={userData}
                        >
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute
                            isAllowed={userData}
                            redirectPath="/login"
                            data={userData}
                        >
                            <h2>Profile page</h2>
                        </ProtectedRoute>
                    }
                />
                <Route
                path="/todos"
                element={
                    <ProtectedRoute
                    isAllowed={userData}
                    redirectPath="/login"
                    data={userData}
                    >
                        <h1> todos </h1>
                    </ProtectedRoute>
                }
                />
                <Route
                    path="login"
                    element={
                        <ProtectedRoute
                            isAllowed={!userData}
                            redirectPath="/"
                            data={userData}
                        >
                            <LoginPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="register"
                    element={
                        <ProtectedRoute
                            isAllowed={!userData}
                            redirectPath="/login"
                            data={userData}
                        >
                            <RegisterPage />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </>
    )
)

export default router;
