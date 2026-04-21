/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from "@stylexjs/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

const DEFAULT_LIBRARIES = [
  "react",
  "react-dom",
  "react-router-dom",
  "react-native",
  "react-native-reanimated",
  "recoil",
  "react-query",
  "next?(/*)",
  "zod",
  "lodash",
  "axios",
  "superagent",
].join(",");

export default defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
      "@stylexjs": stylex,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      curly: "off",
      "no-case-declarations": "off",
      "no-redeclare": "off",
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
      "nonblock-statement-body-position": "error",
      "prefer-const": "error",
      "no-import-assign": "off",
      quotes: "off",

      "react-hooks/exhaustive-deps": "off",
      "react-hooks/refs": "off",
      "react-hooks/use-memo": "off",
      "react-hooks/components-during-render": "off",
      "react-hooks/static-components": "off",

      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",

      "unused-imports/no-unused-imports": "warn",

      "@stylexjs/valid-styles": "error",

      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "sibling", "parent", "internal", "object", "index", "type"],
          pathGroups: [
            {
              pattern: "*.{css,scss,sass}",
              group: "builtin",
              position: "before",
            },
            {
              pattern: `{${DEFAULT_LIBRARIES}}`,
              group: "builtin",
              position: "before",
            },
            {
              pattern: "react-!(native+(*))",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "{react-native-*,*-react-native}",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "{@/*, @*, @/**/*, @**/*}",
              group: "external",
              position: "after",
            },
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["type"],
          alphabetize: {
            order: "asc",
            orderImportKind: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  prettier,
]);
