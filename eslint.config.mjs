/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import nextPlugin from "@next/eslint-plugin-next";
import stylex from "@stylexjs/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier/flat";
import taeyoon from "eslint-config-taeyoon/react";
import globals from "globals";

export default defineConfig([
  globalIgnores([".next/**", ".yarn/**", "out/**", "build/**", "next-env.d.ts"]),
  ...taeyoon,
  nextPlugin.configs["core-web-vitals"],
  {
    plugins: {
      "@stylexjs": stylex,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/use-memo": "off",
      "react-hooks/components-during-render": "off",
      "react-hooks/static-components": "off",

      "@stylexjs/valid-styles": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  prettier,
]);
