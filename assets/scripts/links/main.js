"use strict";

import doc from "../doc.js";
import globalConfig from "../../../data/global_config.js";
import links from "../../../data/links/links.js";
import formatUrl from "../utils/format_url.js";

const sources = {
  dataDir: "/data/",
  assetsDir: "/assets/",
  socialIconsDir: "media/images/icons/social_icons/",
  homeIcon: {
    light: "/assets/media/images/icons/ui/home_icon_black.svg",
    dark: "/assets/media/images/icons/ui/home_icon_white.svg"
  },
  twitX: {
    twitter: "twitter.svg",
    twitterX: "twitter_x.svg"
  }, 
  twtLink: "https://twitter.com/stormzulien",
  twtXLink: "https://x.com/stormzulien"
}

const linksList = doc.qs("#links-list");


// for special styles on each link

if (globalConfig.customLinkStyles) {
  doc.head.innerHTML += `<link rel="stylesheet" href="${sources.dataDir}links/links_custom_styles.css">`;
}


// Backdrop clouds

function generateClouds() {
  // Generates the clouds in the backdrop

  const decoClouds = doc.qs("#deco-clouds");
  for (let i = 0; i < 6; i++) {
    const cloud = doc.createElement("img");
      cloud.id = `cloud-${i}`;
      cloud.alt = "Cloud";
      cloud.draggable = false;
      cloud.src = `${sources.assetsDir}media/images/clouds/cloud_${i}.svg`;
    
    decoClouds.appendChild(cloud);
  }
}

generateClouds();


// Generate all the links from links.js

const linkIndex = [];
const ordered = [];

links.forEach(link => {
  linkIndex.push(link.index);
});

linkIndex.sort();

linkIndex.forEach(num => {
  let foundLink;
  links.forEach(link => {
    if (num === link.index) {
      foundLink = link;
    }
  });

  ordered.push(foundLink);
});

// console.log(ordered);

ordered.forEach(link => {

  if (link.shown) {
    const formattedUrl = formatUrl(link.url)

    let lightIcon = link.icon.fileName || "default.svg";;
    let darkIcon = link.icon.darkTheme || lightIcon;

    const li = doc.createElement("li");
    const a = doc.createElement("a");
      a.id = link.elemId;
      a.tabIndex = 0;
      a.classList.add("social-link");

      if (link.title) {
        a.title = link.title;
      } else if (link.url) {
        a.title = `Go to "${formattedUrl}"`;
      } else {
        a.title = link.name;
      }

      if (link.customStylesClass) {
        a.classList.add(link.customStylesClass);
      }

      if (link.type === "link") {
        a.href = formattedUrl;
        a.target = "_blank";
      } else if (link.type === "copy") {
        a.classList.add("js-link-copy");
      }

    const divSocialIconContainer = doc.createElement("div");
      divSocialIconContainer.classList.add("social-icon-container");

    const icon = doc.createElement("img");
      icon.classList.add("social-icon");
      icon.draggable = false;
      icon.src = sources.assetsDir + sources.socialIconsDir + (isDarkTheme() ? darkIcon : lightIcon);
      icon.alt = link.icon.altText || 'Icon';

    const divContentRight = doc.createElement("div");
      divContentRight.classList.add("content-right");
    
    const spanPlatformName = doc.createElement("span");
      spanPlatformName.classList.add("platform-name");
      spanPlatformName.innerText = link.name;

    const spanUsername = doc.createElement("span");
      spanUsername.classList.add("username");
      spanUsername.innerText = link.username;

    // Build

    divSocialIconContainer.appendChild(icon);
    divContentRight.appendChild(spanPlatformName);
    divContentRight.appendChild(spanUsername);
    a.appendChild(divSocialIconContainer);
    a.appendChild(divContentRight);
    li.appendChild(a);

    linksList.appendChild(li);
  }
});


// For all links with type: "copy":

const jsLinkCopy = doc.qsa(".js-link-copy");

jsLinkCopy.forEach(element => {
  const elementId = element.id;

  let copyContent = "";
  let copyMsg = "Copied!";
  let initialContent = "";

  links.forEach(link => {
    if (link.elemId === elementId) {
      copyContent = link.copyContent;
      copyMsg = link.copyMsg;
      initialContent = link.username;
    }
  });

  element.addEventListener("click", () => {
    const elem = doc.qs(`#${elementId} .username`);
    navigator.clipboard.writeText(copyContent);
    elem.classList.add("copy-msg");
    elem.innerText = copyMsg;

    setTimeout(() => {
      elem.innerText = initialContent;
      elem.classList.remove("copy-msg");
    }, 2000);
  });
});


// Xitter thing

if (globalConfig.xitter) {
  // Evil Twitter easter egg on X key down

  const twitX = doc.qs("a#link-twitter");
  const twitXLogo = doc.qs("a#link-twitter img.social-icon");
  const twitXPlatformName = doc.qs("a#link-twitter span.platform-name");
  
  // Make footer text change
  const footerContent = doc.qs("footer").innerHTML;
  const creepyFooterContent = "417e4705aee1415f8583243b8c403af3";

  // Get url params
  const params = new URLSearchParams(document.location.search);

  let urlXitter = JSON.parse(params.get("xitter"));
  if (typeof urlXitter !== "boolean") {
    urlXitter = false;
  }

  const hellSound = doc.qs("#hell-ambient-audio");
  // Sound Effect by "https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=23836" freesound_community from Pixabay

  if (urlXitter) {
    hellSound.setAttribute("autoplay", true);
  }

  hellSound.loop = true;

  function evil() {
    // Turn styles, text and icons evil

    twitXLogo.src = `${sources.assetsDir}${sources.socialIconsDir}${sources.twitX.twitterX}`;
    twitXPlatformName.innerText = "X";
    twitX.href = sources.twtXLink;
    twitX.title = `Go to: "${sources.twtXLink}"`;

    doc.footer.innerHTML = `${creepyFooterContent}|ඞ`;
    twitX.classList.add("elon");
    doc.body.classList.add("elon-effect");
  }

  function normal() {
    // Return styles, text and icons to normal

    twitXLogo.src = `${sources.assetsDir}${sources.socialIconsDir}${sources.twitX.twitter}`;
    twitXPlatformName.innerText = "Twitter";
    twitX.href = sources.twtLink;
    twitX.title = `Go to: "${sources.twtLink}"`;

    doc.footer.innerHTML = footerContent; // Restores to original footer content
    twitX.classList.remove("elon");
    doc.body.classList.remove("elon-effect");
  }

  if (urlXitter) {
    const msg = "[X] x key easter egg activation disabled";
    evil();

    // hellSound.play();
    // Sound cannot be played without user interacting with the document first.
    
    console.warn(msg);
    console.warn("Audio may not start automatically – tap screen to start audio");
    doc.body.addEventListener("keydown", (event) => {
      if (event.key === "x") {
        console.warn(msg);
      }
    });

    doc.body.addEventListener("mousedown", () => {
      hellSound.play();
    });

  } else {
    // If ?xitter=false (normal):

    doc.body.addEventListener("keydown", (event) => {
      if (event.key === "x") {
        evil();
        hellSound.play();
      }
    });

    doc.body.addEventListener("keyup", (event) => {
      if (event.key === "x") {
        normal();
        hellSound.pause();
      }
    });
  }
}


// make the "Go home icon" exist

const homeLnkImg = document.createElement("img");
  homeLnkImg.alt = "Home icon";
  homeLnkImg.draggable = false;
  homeLnkImg.src = isDarkTheme() ? sources.homeIcon.dark : sources.homeIcon.light;

doc.qs("#home-lnk").appendChild(homeLnkImg);


// Change icon themes

function switchIconTheme(theme) {

  // Link list

  doc.qsa(".social-link").forEach(element => {
    const elementId = element.id;

    let lightIcon;
    let darkIcon;
    links.forEach(link => {
      if (link.elemId === elementId) {
        lightIcon = link.icon.fileName || "default.svg";
        darkIcon = link.icon.darkTheme || lightIcon;
      }
    });

    const icon = doc.qs(`#${elementId} img.social-icon`);
    icon.src = `${sources.assetsDir}${sources.socialIconsDir}${theme ? darkIcon : lightIcon}`;
  });

  // Home icon

  const homeIcon = doc.qs("#home-lnk img");

  homeIcon.src = theme ? sources.homeIcon.dark : sources.homeIcon.light;
}

function isDarkTheme() {
  if (window.matchMedia) {
    // Check if the dark-mode Media-Query matches
    if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // Dark
      return true;
    } else {
      // Light
      return false;
    }
  } else {
    // Default (when Media-Queries are not supported)
    console.error("Media Queries not supported.");
    return;
  }
}

matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    switchIconTheme(isDarkTheme());
  });

