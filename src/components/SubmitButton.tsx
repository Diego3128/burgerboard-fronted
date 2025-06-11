import type { ReactNode } from "react";

type SubmitButtonProps = {
    children: ReactNode;
    loading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "secondary";
    type?: "submit" | "button";
    handleClick?: () => void;
};

const SubmitButton = ({
    handleClick,
    children,
    loading = false,
    loadingText = 'Sending',
    disabled = false,
    className = "",
    variant = "primary",
    type = "submit",
}: SubmitButtonProps) => {
    const baseStyles =
        "rounded-xl p-5 text-center block w-full font-black mt-7 outline-none transition-all duration-200";
    const variants = {
        primary:
            "bg-yellow-400 text-gray-900 hover:bg-yellow-300 focus:bg-yellow-300 disabled:bg-yellow-300",
        secondary:
            "bg-gray-800 text-white hover:bg-gray-700 focus:bg-gray-700 disabled:bg-gray-600",
    };

    return (
        <button
            onClick={() => handleClick?.()}
            type={type}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${disabled || loading ? "cursor-not-allowed opacity-65" : "cursor-pointer"
                } ${className}`}
        >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <span>{loadingText}</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
};

export default SubmitButton;
