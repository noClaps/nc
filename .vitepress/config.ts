import type { LanguageInput } from "@shikijs/types";
import { defineConfig } from "vitepress";
import nc from "./shiki/nc.json" with { type: "json" };

export default defineConfig({
  title: "NC",
  description: "A new language I'm working on",
  cleanUrls: true,
  markdown: {
    math: true,
    shikiSetup: async (shiki) => {
      await shiki.loadLanguage(nc as LanguageInput);
    },
  },
  rewrites: { "README.md": "index.md" },
  lastUpdated: true,
  themeConfig: {
    outline: { level: [2, 6] },
    sidebar: [
      {
        text: "Design",
        base: "/design",
        items: [
          { text: "Async", link: "/async" },
          { text: "Comments", link: "/comments" },
          { text: "Conditionals", link: "/conditionals" },
          { text: "Loops", link: "/loops" },
          { text: "Modules", link: "/modules" },
          { text: "Operators", link: "/operators" },
          { text: "Testing", link: "/testing" },
          { text: "Variables", link: "/variables" },
          {
            text: "Builtin",
            base: "/design/builtin",
            items: [
              { text: "Functions", link: "/functions" },
              { text: "Keywords", link: "/keywords" },
            ],
          },
          {
            text: "Functions",
            base: "/design/functions",
            link: "/",
            items: [
              { text: "Error handling", link: "/error-handling" },
              { text: "Functions as values", link: "/functions-as-values" },
              { text: "Named arguments", link: "/named-arguments" },
              { text: "Overloading", link: "/overloading" },
              { text: "Variadic functions", link: "/variadic" },
            ],
          },
          {
            text: "Types",
            base: "/design/types",
            items: [
              { text: "Array", link: "/array" },
              { text: "Boolean", link: "/boolean" },
              { text: "Byte", link: "/byte" },
              { text: "Character", link: "/character" },
              { text: "Complex", link: "/complex" },
              { text: "Decimal", link: "/decimal" },
              { text: "Enum", link: "/enum" },
              { text: "Error", link: "/error" },
              { text: "Int and BigInt", link: "/int" },
              { text: "Map", link: "/map" },
              { text: "Optional values", link: "/optional" },
              { text: "Range", link: "/range" },
              { text: "String", link: "/string" },
              { text: "Struct", link: "/struct" },
              { text: "Tuple", link: "/tuple" },
              { text: "Type", link: "/type" },
            ],
          },
        ],
      },
    ],
    search: { provider: "local" },
    socialLinks: [{ icon: "github", link: "https://github.com/noClaps/nc" }],
  },
});
