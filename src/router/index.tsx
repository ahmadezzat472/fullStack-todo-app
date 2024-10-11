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

const isLoggedIn = false
const userData: {email: string} | null = isLoggedIn ? {email: "Ahmed"} : null

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Root Layout */}
            <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
                <Route
                    index
                    element={
                        <ProtectedRoute
                            isAllowed={isLoggedIn}
                            redirectPath="/login"
                            data={userData}
                        >
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                {/* <Route
                    path="/profile"
                    element={
                        <ProtectedRoute
                            isAllowed={isLoggedIn}
                            redirectPath="/login"
                            data={userData}
                        >
                            <h2>Profile page</h2>
                        </ProtectedRoute>
                    }
                /> */}
                {/* <Route
                path="/todos"
                element={
                    <ProtectedRoute
                    isAllowed={isLoggedIn}
                    redirectPath="/login"
                    data={userData}
                    >
                    <TodosPage />
                    </ProtectedRoute>
                }
                /> */}
                <Route
                    path="login"
                    element={
                        <ProtectedRoute
                            isAllowed={!isLoggedIn}
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
                            isAllowed={!isLoggedIn}
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
