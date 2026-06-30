import React from "react";
import { useChat } from "../hooks/useChat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ScrollAnchor from "./ScrollAnchor";

const Conversation = () => {
    const { messages, isTyping } = useChat();

    return (
        <>
            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}

            {isTyping && <TypingIndicator />}

            <ScrollAnchor />
        </>
    );
};

export default Conversation;
