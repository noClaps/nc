import { defineConfig } from "vitepress";

export default defineConfig({
  title: "NC",
  cleanUrls: true,
  markdown: { math: true },
  rewrites: { "README.md": "index.md" },
  lastUpdated: true,
  themeConfig: {
    sidebar: [
      {
        text: "Design",
        items: [
          { text: "Comments", link: "/design/comments" },
          { text: "Functions", link: "/design/functions" },
          { text: "Loops", link: "/design/loops" },
          { text: "Modules", link: "/design/modules" },
          { text: "Operators", link: "/design/operators" },
          { text: "Variables", link: "/design/variables" },
          {
            text: "Conditionals",
            items: [
              {
                text: "If-else statements",
                link: "/design/conditionals/if-else",
              },
              {
                text: "Pattern matching",
                link: "/design/conditionals/pattern-matching",
              },
            ],
          },
          {
            text: "Types",
            items: [
              { text: "Array", link: "/design/types/array" },
              { text: "Boolean", link: "/design/types/boolean" },
              { text: "Character and String", link: "/design/types/string" },
              { text: "Decimal", link: "/design/types/decimal" },
              { text: "Error", link: "/design/types/error" },
              { text: "Int and BigInt", link: "/design/types/int" },
              { text: "Map", link: "/design/types/map" },
              { text: "Optional values", link: "/design/types/optional" },
              { text: "Range", link: "/design/types/range" },
              { text: "Struct", link: "/design/types/struct" },
              { text: "Tuple", link: "/design/types/tuple" },
            ],
          },
        ],
      },
    ],
    search: { provider: "local" },
    socialLinks: [{ icon: "github", link: "https://github.com/noClaps/nc" }],
  },
});
