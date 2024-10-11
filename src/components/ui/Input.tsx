import { InputHTMLAttributes, Ref, forwardRef  } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
    return (
        <input
            ref={ref}
            className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-[#149eca] rounded-lg px-3 py-3 text-md w-full bg-transparent"
            {...rest}
        />
    );
});

export default Input;


/*
    ** Since you're using a custom Input component in your form, 
    the react-hook-form library might be trying to forward a ref to it. 
    However, function components can't receive refs directly unless you wrap them with React.forwardRef.

    ** To fix this issue, you need to modify the Input component to use React.forwardRef. 
    This allows the ref to be properly passed down to the underlying <input> element.



*/
