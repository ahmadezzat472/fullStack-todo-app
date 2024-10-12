// import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { DLoginInput } from "../data";
import InputErrorMsg from "../components/ui/InputErrorMsg";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { IErrorResponse } from "../interfaces";
import { AxiosError } from "axios";

interface IFormInput {
    identifier: string;
    password: string;
}

const LoginPage = () => {
    /* ______________ State ______________ */
    const [isLoading, setIsLoading] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>({
        resolver: yupResolver(LoginSchema)
    });

    /* ______________ Handler ______________ */
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data)
        setIsLoading(true)

        try {
            const response = await axiosInstance.post("/auth/local", data)
            if(response.status == 200) {
                toast.success("You will navigate to the Home page after 2 seconds to login.",
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

                localStorage.setItem("loginUser",JSON.stringify(response.data))
                setTimeout(() => {
                    // ** need to reload page
                    location.replace("/")
                }, 2000);
            } 
        } catch(error) {
            // console.log(error.response);
            // ** should declare the type of error (typescript)
            const errorObj = error as AxiosError<IErrorResponse>
            toast.error(`${errorObj.response?.data.error.message}`,
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
        } finally {
            setIsLoading(false)
        }
    };

    /* ______________ Render ______________ */
    const renderLoginInputs = DLoginInput.map( ({name, placeholder, validation, type}, idx) => {
        return (
            <div key={idx}>
                <Input 
                    type={type}
                    placeholder={placeholder}
                    {...register(name, validation)}
                />
                {errors[name] && <InputErrorMsg msg={errors[name]?.message} />}
            </div>
        )
    })

    return (
        <div>
            <h2 className="text-center mb-3">Login to Contribute</h2>
            <form className="space-y-3 max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
                {renderLoginInputs}

                <Button isLoading={isLoading}>Login</Button>
            </form>
        </div>
    );
};

export default LoginPage;
