module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        // отступы
        indent: ["error", 4],
        // точки с запятыми
        semi: [2, "always"],
        // пробелы перед объявлением функции
        "space-before-function-paren": ["error", "never"],
        // двойные кавычки
        quotes: ["error", "double", { allowTemplateLiterals: true }]
    }
};
