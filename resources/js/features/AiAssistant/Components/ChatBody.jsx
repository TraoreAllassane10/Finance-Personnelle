import React from "react";
import EmptyState from "./EmptyState";
import SuggestionList from "./SuggestionList";

const ChatBody = () => {
    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
            <EmptyState />
            <SuggestionList />
        </div>
    );
};

export default ChatBody;
