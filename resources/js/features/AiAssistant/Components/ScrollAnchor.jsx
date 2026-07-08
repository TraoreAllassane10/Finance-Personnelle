import React, { useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";

const ScrollAnchor = () => {
    const ref = useRef(null);

    const { messages, isTyping } = useChat();

    useEffect(() => {
        ref.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, isTyping]);

    return <div ref={ref} />;
};

export default ScrollAnchor;
