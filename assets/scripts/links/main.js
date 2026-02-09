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
import links from "../../../data/links.js";
import formatUrl from "../utils/format_url.js";

const xitter = true;
const linksList = doc.qs("#links-list");

links.forEach((link) => {
  let linkHTML = "";

  // let copyElemId = "a" + Math.random().toString(16).slice(2);
  if (link.shown) {
    const formattedUrl = formatUrl(link.url)

    linkHTML = `
      <li>
        <a
          tabindex="0" 
          class="social-link ${link.type === "copy" ? "js-link-copy" : ""}" 
          ${link.type === "copy" ? `data-copy-content="${link.copyContent}" data-copy-msg="${link.copyMsg}" data-elem-id="${link.elemId}" data-initial-content="${link.username}"` : ""} 
          id="${link.elemId}"
          ${link.type === "link" ? `href="${formattedUrl}" target="_blank"` : ""} 
          title="${link.title || `Go to &#x22;${formattedUrl}&#x22;`}"
        >
          <div class="social-icon-container">
            <img class="social-icon" draggable="false" src="../assets/media/images/icons/social_icons/${link.icon.fileName || "default.svg"}" alt="${link.icon.altText || 'Icon'}">
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

jsLinkCopy.forEach((element, index) => {
  const copyData = element.dataset;

  element.addEventListener("click", () => {
    const elem = doc.qs(`#${copyData.elemId} .username`);
    navigator.clipboard.writeText(copyData.copyContent);
    elem.classList.add("copy-msg");
    elem.innerText = copyData.copyMsg;

    setTimeout(() => {
      elem.innerText = copyData.initialContent;
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
      twitXLogo.setAttribute("src", "../assets/media/images/icons/social_icons/twitter-x.svg");
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