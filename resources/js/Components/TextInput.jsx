import { Mail } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div
            className={
                "rounded-lg border border-gray-300 shadow-sm mt-1" + className
            }
        >
            <input
                {...props}
                type={type}
                ref={localRef}
                className=" outline-none border-none w-full focus:border-none rounded-lg"
            />
        </div>
    );
});
