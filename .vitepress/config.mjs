import { defineConfig } from "vitepress";

const pathify = (text, link) => ({ text, link });

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title       : "Unreally",
  description : "Unreal Engine User Interface Notes",
  themeConfig : {
    // https://vitepress.dev/reference/default-theme-config
    nav : [
      pathify("Home", "/"),
      pathify("About", "/pages/about"),
    ],
    
    logo     : "./logo.png",
    logoLink : "https://github.com/morklympious",
    search   : { provider : "local" },
    sidebar  : [
      {
        text  : "Acquired Knowledge",
        items : [
          {
            text  : "C++",
            link  : "documentation/C++",
            items : [
              pathify("Pointers", "/documentation/C++/pointers"),
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
