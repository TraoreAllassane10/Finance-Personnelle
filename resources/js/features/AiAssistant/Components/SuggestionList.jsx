const suggestions = [
    "Comment économiser chaque mois ?",

    "Analyse mes dépenses",

    "Créer un budget",

    "Comment réduire mes dépenses alimentaires ?",
];

const SuggestionList = () => {
    return (
        <div className="mt-6 space-y-3">
            {suggestions.map((suggestion) => (
                <button
                    key={suggestion}
                    className="w-full rounded-xl border bg-white px-4 py-3 text-left text-sm transition hover:bg-blue-50 hover:border-blue-500"
                >
                    {suggestion}
                </button>
            ))}
        </div>
    );
};

export default SuggestionList;
