/*
  Details:
    Source: "https://stormzulien.github.io/"

    By Stormzulien (Jay)

    Started: 09/02/2026,
    Last Updated: 09/02/2026
    
    (Format: DD/MM/YYYY)

  Notes:
*/

"use strict";

import doc from "../doc.js";
import globalConfig from "../../../data/globalConfig.js";
import links from "../../../data/links/links.js";
import formatUrl from "../utils/format_url.js";

const xitter = true;
const linksList = doc.qs("#links-list");

if (globalConfig.customLinkStyles) {
  doc.head.innerHTML += `<link rel="stylesheet" href="../data/links/links_custom_styles.css">`;
}

function generateClouds() {
  const decoClouds = doc.qs("#deco-clouds");

  let cloudsHTML = "";
  for (let i = 0; i < 6; i++) {
    cloudsHTML += `
      <img id="cloud-${i}" draggable="false" src="../assets/media/images/clouds/cloud_${i}.svg">
    `;
  }
  decoClouds.innerHTML = cloudsHTML;
}

generateClouds();

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
            <img class="social-icon" draggable="false" src="../assets/media/images/icons/social_icons/${getCurrentTheme() ? darkIcon : lightIcon}" alt="${link.icon.altText || 'Icon'}">
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

if (xitter) {
  const twitX = doc.qs("a#link-twitter");
  const twitXLogo = doc.qs("a#link-twitter img.social-icon");
  const twitXPlatformName = doc.qs("a#link-twitter span.platform-name");

  doc.body.addEventListener("keydown", (event) => {
    if (event.key === "x") {
      twitXLogo.removeAttribute("src");
      twitXLogo.setAttribute("src", "../assets/media/images/icons/social_icons/twitter_x.svg");
      twitXPlatformName.innerText = "X";
      twitX.classList.add("elon");
    }
  });

  doc.body.addEventListener("keyup", (event) => {
    if (event.key === "x") {
      twitXLogo.removeAttribute("src");
      twitXLogo.setAttribute("src", "../assets/media/images/icons/social_icons/twitter.svg");
      twitXPlatformName.innerText = "Twitter";
      twitX.classList.remove("elon");
    }
  });
}


// Change icon themes

function switchIconTheme(theme) {
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
    icon.removeAttribute("src");
    icon.setAttribute("src", `../assets/media/images/icons/social_icons/${theme ? darkIcon : lightIcon}`);
  });
}

function getCurrentTheme() {
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

// switchIconTheme(getCurrentTheme() ? true : false);

matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    switchIconTheme(getCurrentTheme() ? true : false);

  });
