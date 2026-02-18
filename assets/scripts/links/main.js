/*
  Details:
    Source: "https://stormzulien.github.io/"

    By Stormzulien (Jay)

    Started: 09/02/2026,
    Last Updated: 18/02/2026
    
    (Format: DD/MM/YYYY)

  Notes:
*/

"use strict";

import doc from "../doc.js";
import globalConfig from "../../../data/global_config.js";
import links from "../../../data/links/links.js";
import formatUrl from "../utils/format_url.js";


// some uris and stuff

const sources = {
  dataDir: "../data/",
  assetsDir: "../assets/",
  socialIconsDir: "media/images/icons/social_icons/",
  homeIcon: {
    light: "../assets/media/images/icons/ui/home_icon_black.svg",
    dark: "../assets/media/images/icons/ui/home_icon_white.svg"
  },
  twitX: {
    twitter: "twitter.svg",
    twitterX: "twitter_x.svg"
  }
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

  let cloudsHTML = "";
  for (let i = 0; i < 6; i++) {
    cloudsHTML += `
      <img id="cloud-${i}" draggable="false" src="${sources.assetsDir}media/images/clouds/cloud_${i}.svg">
    `;
  }
  decoClouds.innerHTML = cloudsHTML;
}

generateClouds();


// Generate all the links from links.js

links.forEach(link => {
  let linkHTML = "";

  if (link.shown) {
    const formattedUrl = formatUrl(link.url)

    let lightIcon = link.icon.fileName || "default.svg";;
    let darkIcon = link.icon.darkTheme || lightIcon;

    linkHTML = `
      <li>
        <a
          tabindex="0" 
          class="social-link ${link.type === "copy" ? "js-link-copy" : ""} ${link.customStylesClass || ""}" 
          id="${link.elemId}" 
          ${link.type === "link" ? `href="${formattedUrl}" target="_blank"` : ""} 
          title="${link.title || `Go to &#x22;${formattedUrl}&#x22;`}"
        >
          <div class="social-icon-container">
            <img class="social-icon" draggable="false" src="${sources.assetsDir}${sources.socialIconsDir}${isDarkTheme() ? darkIcon : lightIcon}" alt="${link.icon.altText || 'Icon'}">
          </div>
          <div class="content-right">
            <span class="platform-name">${link.name}</span>
            <span class="username">${link.username}</span>
          </div>
        </a>
      </li>
    `;

    linksList.innerHTML += linkHTML;
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

  hellSound.loop = true;

  function evil() {
    // Turn styles, text and icons evil

    twitXLogo.src = `${sources.assetsDir}${sources.socialIconsDir}${sources.twitX.twitterX}`;
    twitXPlatformName.innerText = "X";

    doc.footer.innerHTML = `${creepyFooterContent}|ඞ`;
    twitX.classList.add("elon");
    doc.body.classList.add("elon-effect");
  }

  function normal() {
    // Return styles, text and icons to normal

    twitXLogo.src = `${sources.assetsDir}${sources.socialIconsDir}${sources.twitX.twitter}`;
    twitXPlatformName.innerText = "Twitter";

    doc.footer.innerHTML = footerContent; // Restores to original footer content
    twitX.classList.remove("elon");
    doc.body.classList.remove("elon-effect");
  }

  if (urlXitter) {
    const msg = `[X] x key easter egg activation disabled\nTap screen to start audio`;
    evil();

    // hellSound.play();
    // Sound cannot be played without user interacting with the document first.
    
    console.warn(msg);
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

