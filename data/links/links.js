"use strict";

const order = [
  "link-test",
  "link-twitter",
  "link-strawpage",
  "link-yt",
  "link-bsky",
  "link-discord", 
  "link-tumblr",
  "link-blogspot",
  "link-github", 
  "link-linktree"
];

/* Types:
  "link", 
  "copy"
*/

const links = [
  {
    type: "link",
    elemId: "link-twitter",
    customStylesClass: "",
    name: "Twitter",
    username: "@Stormzulien",
    url: "twitter.com/stormzulien/",
    icon: {
      fileName: "twitter.svg",
      darkTheme: null,
      altText: "Twitter Logo"
    },
    title: null,
    shown: true
  },
  {
    type: "link",
    elemId: "link-strawpage",
    customStylesClass: "",
    name: "Strawpage",
    username: "stormzulien.straw.page",
    url: "stormzulien.straw.page/",
    icon: {
      fileName: "straw_page.png",
      darkTheme: null,
      altText: "Strawpage Logo"
    },
    title: "My Strawpage!!!",
    shown: true
  },
  {
    type: "link",
    elemId: "link-yt",
    customStylesClass: "yt-link",
    name: "YouTube",
    username: "@Stormzulien",
    url: "youtube.com/@stormzulien",
    icon: {
      fileName: "youtube_logo.svg",
      darkTheme: null,
      altText: "YouTube Logo"
    },
    title: "YouTube",
    shown: true
  },
  {
    type: "link",
    elemId: "link-bsky",
    customStylesClass: "",
    name: "Bluesky",
    username: "@stormzulien.bsky.social",
    url: "stormzulien.bsky.social",
    icon: {
      fileName: "bluesky.svg",
      darkTheme: null,
      altText: "Bluesky Social Logo"
    },
    title: null,
    shown: true
  },
  {
    type: "copy",
    elemId: "link-discord",
    customStylesClass: "",
    name: "Discord",
    username: "stormzulien",
    copyContent: "stormzulien",
    copyMsg: "Username Copied",
    icon: {
      fileName: "discord_light.svg",
      darkTheme: null,
      altText: "Discord Logo"
    },
    title: "Copy Discord username",
    shown: true
  },
  {
    type: "copy",
    elemId: "link-test",
    customStylesClass: "",
    name: "Test",
    username: "username",
    copyContent: "Lorem Ipsum",
    copyMsg: "Content Copied",
    icon: {
      fileName: null,
      darkTheme: null,
      altText: null
    },
    title: null,
    shown: false
  },
  {
    type: "link",
    elemId: "link-tumblr",
    customStylesClass: "",
    name: "Tumblr",
    username: "@stormzulien",
    url: "https://stormzulien.tumblr.com/",
    icon: {
      fileName: "tumblr_light.svg",
      darkTheme: "tumblr_dark.svg",
      altText: "Tumblr Logo"
    },
    title: null,
    shown: true
  },
  {
    type: "link",
    elemId: "link-blogspot",
    customStylesClass: "",
    name: "Blogspot",
    username: "stormzulien.blogspot.com",
    url: "https://stormzulien.blogspot.com/",
    icon: {
      fileName: "blogger.svg",
      darkTheme: null,
      altText: "Blogspot Logo"
    },
    title: "I don't use this much",
    shown: true
  },
  {
    type: "link",
    elemId: "link-github",
    customStylesClass: "",
    name: "GitHub",
    username: "Stormzulien",
    url: "https://github.com/Stormzulien",
    icon: {
      fileName: "github_light.svg",
      darkTheme: "github_dark.svg",
      altText: "GitHub Logo"
    },
    title: null,
    shown: true
  },
  {
    type: "link",
    elemId: "link-linktree",
    customStylesClass: "",
    name: "Linktree",
    username: "Stormzulien",
    url: "https://linktr.ee/Stormzulien",
    icon: {
      fileName: "linktree.svg",
      darkTheme: null,
      altText: "Linktree Logo"
    },
    title: null,
    shown: true
  }
];

order.forEach((id, index) => {
  links.forEach(link => {
    if (id === link.elemId) {
      link.index = index;
    }
  });
});

export default links;