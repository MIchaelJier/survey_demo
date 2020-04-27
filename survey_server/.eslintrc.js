module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-console": 0,
        "no-unused-vars": "error",
        "no-use-before-define": "error",
        // "linebreak-style": [
        //     "error",
        //     "unix"
        // ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "curly": ["error", "all"],
        "default-case": "error",
        "no-else-return": "error",
        "no-empty-function": "error",
        "no-implicit-coercion": "error",
        "no-invalid-this": "error",
        "no-loop-func": "error",
        "no-multi-spaces": "error",
        "no-new-func": "error",
        "no-useless-return": "error",
        "global-require": "error",
        "no-path-concat": "error",
        "no-sync": "error",
        "array-bracket-spacing": [
            "error",
            "never" 
        ],
        "block-spacing": [
            "error",
            "always"
        ],
        "brace-style": [
            "error",
            "1tbs"
        ],
        "camelcase": "error",
        "comma-dangle": [
            "error",
            "always-multiline"
        ],
        "comma-spacing": [
            "error",
            { "before": false, "after": true }
        ],
        "comma-style": [
            "error",
            "last"
        ],
        "key-spacing": [
            "error", 
            { "beforeColon": false, "afterColon": true }
        ],
        "lines-around-comment": [
            "error",
            { "beforeBlockComment": true }
        ],
        "newline-after-var": [
            "error",
            "always"
        ],
        "newline-before-return": "error",
        "no-multi-assign": "error",
        "max-params": [1, 3],
        "new-cap": [
            "error",
            {
                "newIsCap": true,
                "capIsNew": false
            }
        ],
        "no-multiple-empty-lines": [
            "error",
            {
                "max": 2
            }
        ],
        "no-shadow-restricted-names": "error",
        "no-undef-init": "error",
        "keyword-spacing": "error",
        "space-before-blocks": [
            "error",
            "always"
        ]
    }
};