import * as yup from "yup";

export const registerSchema = yup.object({
    username: yup.string()
        .required("username is required")
        .min(5, "username should be at-least 5 characters"),
    email: yup.string()
        .required("email is required")
        .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "emai not valid"),
    password: yup.string()
        .required("password is required")
        .min(6, "password should be at-least 6 characters")
}).required();