module.exports = {
    env: { browser: true, es2021: true },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
    ],
    settings: {
        react: { version: "detect" },
    },
    rules: {
        "no-undef": "error",
        "react/prop-types": "off",
    },
};
