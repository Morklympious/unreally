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
    logoLink : "https://unreally.site",
    search   : { provider : "local" },
    sidebar  : [
      {
        text  : "Acquired Knowledge",
        items : [
          {
            text  : "C++",
            link  : "notes/cpp",
            items : [
              pathify("Pointers", "/notes/cpp/pointers"),
            ],
          },
          {
            text  : "Unreal",
            link  : "notes/unreal",
            items : [
              {
                text  : "Common UI",
                link  : "notes/unreal/common-ui",
                items : [
                  pathify("Common Action Widget", "/notes/unreal/common-ui/common-action-widget"),
                ],
              },
            ],
          },
        ],
      },
    ],

    socialLinks : [
      { icon : "github", link : "https://github.com/morklympious/unreally" },
    ],

    lastUpdated : {
      text          : "Updated at",
      formatOptions : {
        dateStyle : "full",
        timeStyle : "medium",
      },
    },
  },
});
