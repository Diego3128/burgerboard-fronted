type FormErrorMessagesProps = {
    errors?: string[];
};

const FormErrorMessages = ({ errors }: FormErrorMessagesProps) => {
    if (!errors || errors.length === 0) return null;

    return (
        <div className="text-red-600 text-sm mt-1 space-y-4 p-2 bg-red-100 rounded-lg animate-popIn">
            {errors.map((error, index) => (
                <p className="pl-2 border-l-4 border-r-red-600 " key={index}>{error}</p>
            ))}
        </div>
    );
};

export default FormErrorMessages;
