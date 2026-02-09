"use strict";

/* Types:
  "link", 
  "copy"
*/

const links = [
  {
    type: "link",
    elemId: "link-twitter",
    name: "Twitter",
    username: "@Stormzulien",
    url: "twitter.com/stormzulien/",
    icon: {
      fileName: "twitter.svg",
      altText: "Twitter Logo"
    },
    title: null,
    shown: true
  },
  {
    type: "link",
    elemId: "link-bsky",
    name: "Bluesky",
    username: "@stormzulien.bsky.social",
    url: "stormzulien.bsky.social",
    icon: {
      fileName: "bluesky.svg",
      altText: "Bluesky Social Logo"
    },
    title: null,
    shown: true
  },
  {
    type: "link",
    elemId: "link-yt",
    name: "YouTube",
    username: "@Stormzulien",
    url: "youtube.com/@stormzulien",
    icon: {
      fileName: "youtube_logo.svg",
      altText: "YouTube Logo"
    },
    title: null,
    shown: true
  },
  {
    type: "copy",
    elemId: "link-discord",
    name: "Discord",
    username: "stormzulien",
    copyContent: "stormzulien",
    copyMsg: "Username Copied",
    icon: {
      fileName: "Discord-Symbol-Blurple.svg",
      altText: "Discord Logo"
    },
    title: "Copy Discord username",
    shown: true
  },
  {
    type: "link",
    elemId: "link-tumblr",
    name: "Tumblr",
    username: "@stormzulien",
    url: "https://stormzulien.tumblr.com/",
    icon: {
      fileName: "tumblr.svg",
      altText: "Tumblr Logo"
    },
    title: null,
    shown: true
  },
  {
    type: "link",
    elemId: "link-github",
    name: "GitHub",
    username: "Stormzulien",
    url: "https://github.com/Stormzulien",
    icon: {
      fileName: "GitHub_Invertocat_Black.svg",
      altText: "GitHub Logo"
    },
    title: null,
    shown: false
  },
  {
    type: "link",
    elemId: "link-linktree",
    name: "Linktree",
    username: "Stormzulien",
    url: "https://linktr.ee/Stormzulien",
    icon: {
      fileName: "linktree.svg",
      altText: "Linktree Logo"
    },
    title: null,
    shown: true
  }
];

export default links;