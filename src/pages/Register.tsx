import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMsg from "../components/ui/InputErrorMsg";
import { DRegisterInput } from "../data";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";

interface IFormInput {
    username: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>({
        resolver: yupResolver(registerSchema)
    });

    /* ______________ Handler ______________ */
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data)
        setIsLoading(true)

        try {
            const response = await axiosInstance.post("/auth/local/register", data)
            if(response.status == 200) {
                toast.success("You will navigate to the login page after 2 seconds to login.",
                    {
                        position: "bottom-center",
                        duration: 4000,
                        style: {
                            backgroundColor: "black",
                            color: "white",
                            width: "fit-content",
                        },
                    }
                );
            } 
        } catch(error) {
            // console.log(error.response);
            // ** should declare the type of error (typescript)
            const errorObj = error as AxiosError<IErrorResponse>
            toast.error(`${errorObj.response?.data.error.message}`,
                {
                    position: "bottom-center",
                    duration: 4000,
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
    const renderRegisterInputs = DRegisterInput.map( ({name, placeholder, validation, type}, idx) => {
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
        <div className="max-w-md mx-auto">
            <h2 className="text-center mb-4 text-3xl">Register to get access</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {renderRegisterInputs}
                <Button fullWidth isLoading={isLoading}>Register</Button>
            </form>
        </div>
    )
}

export default RegisterPage;

/*
    **** The stages that the request is making:
    1) pending (required) => Loading
    2) response:
        1) fulfilled => success
            OR
        2) rejected => field
*/