import { defineConfig } from "vitepress";

const pathify = (text, link) => ({ text, link });

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title       : "Unreally",
  description : "Unreal Engine User Interface Notes",

  head : [
    [
      "link",
      {
        rel  : "icon",
        href : "/favicon.png",
      },
    ],
    [
      "script",
      {
        async : true,
        src   : "https://www.googletagmanager.com/gtag/js?id=G-R22FRRDY0G",
      },
    ],
    [
      "script",
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-R22FRRDY0G');",
    ],
  ],
  
  themeConfig : {
    // https://vitepress.dev/reference/default-theme-config
    nav : [
      pathify("Home", "/"),
      pathify("About", "/pages/about"),
    ],
    
    logo     : "./logo.png",
    logoLink : "/",
    search   : { provider : "local" },
    sidebar  : {
      "/notes/" : {
        text  : "Acquired Knowledge",
        items : [
          {
            text  : "Unreal",
            link  : "notes/unreal",
            items : [
               pathify("Pointers", "/notes/unreal/pointers"),
              {
                text  : "Common UI",
                link  : "notes/unreal/common-ui",
                items : [
                  pathify("Common Action Widget", "/notes/unreal/common-ui/common-action-widget"),
                ],
              },
              {
                text  : "Concepts",
                items : [
                  pathify("The Local Player", "/notes/unreal/concepts/local-player"),
                  pathify("The Player Controller", "/notes/unreal/concepts/player-controller"),
                ],
              },
            ],
          },
        ],
      },
      "/journal/" : {
        text  : "Thoughts, I guess",
        items : [
           pathify("World Awareness & Getters", "/journal/15.10.25-static-world-aware-getter"),
        ],
      },
    },

    socialLinks : [
      { icon : "github", link : "https://github.com/morklympious/unreally" },
    ],

    lastUpdated : {
      text          : "Painstakingly updated",
      formatOptions : {
        dateStyle : "full",
        timeStyle : "medium",
      },
    },
  },
});
