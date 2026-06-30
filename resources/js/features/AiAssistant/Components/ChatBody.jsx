import React from "react";
import EmptyState from "./EmptyState";
import SuggestionList from "./SuggestionList";
import { useChat } from "../hooks/useChat";
import Conversation from "./Conversation";

const ChatBody = () => {
    const { messages } = useChat();

    const hasMessages = messages.length > 1;

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
            {hasMessages ? (
                <Conversation />
            ) : (
                <>
                    <EmptyState />
                    <SuggestionList />
                </>
            )}
        </div>
    );
};

export default ChatBody;
