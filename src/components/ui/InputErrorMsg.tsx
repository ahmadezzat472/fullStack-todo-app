interface IProps {
    msg?: string;
}
const InputErrorMsg = ({ msg }: IProps) => {
    return msg ? (
        <span className="block text-red-700 font-semibold text-sm">{msg}</span>
    ) : null;
};

export default InputErrorMsg;