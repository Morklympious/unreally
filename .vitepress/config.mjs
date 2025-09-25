import { defineConfig } from "vitepress";

const pathify = (text, link) => ({ text, link });

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title       : "Unreally",
  description : "Unreal Engine User Interface Notes",
  themeConfig : {
    // https://vitepress.dev/reference/default-theme-config
    nav : [
      { text : "Home", link : "/" },
    ],
    search  : { provider : "local" },
    sidebar : [
      {
        text  : "Acquired Knowledge",

        items : [
          {
            text      : "C++",
            link      : "documentation/C++",
            collapsed : true,
            items     : [
              pathify("Pointers", "/documentation/C++/pointers"),
            ],
          },
        ],
      },
      {
        text      : "Journal",
        collapsed : true,
        items     : [
          {
            text  : "Bullshit",
            items : [
              
            ],
          },
        ],
      },
    ],

    socialLinks : [
      { icon : "github", link : "https://github.com/morklympious/unreally" },
    ],
  },
});
