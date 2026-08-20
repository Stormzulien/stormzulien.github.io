"use strict";

import linkData from "@data/links/links.json" with { type: "json" };

const links = linkData.links;

const linksList = $("#links-list");

// for special styles on each link

if (linkData.customStyles) {
  $("head").append( $("<link />").attr({ rel: "stylesheet", href: linkData.customStylesheetLocation }) );
}

// merge miscData with each link object and add order property

links.forEach(link => {
  const miscData = linkData.miscData;
  const f = Object.getOwnPropertyNames(miscData);

  f.forEach(id => {
    if (link.id === id) {
      Object.assign(link, miscData[id]);
    }
  });

  if (link.shown == null) {
    link.shown = true;
  }
});

linkData.order.forEach((id, index) => {
  links.forEach(link => {
    if (id === link.id) {
      link.index = index;
    }
  });
});

// Generate all the links from links.json

const linkIndex = [];
const ordered = [];

links.forEach(link => {
  linkIndex.push(link.index);
});

linkIndex.sort((a, b) => a - b);

linkIndex.forEach(num => {
  let foundLink;
  links.forEach(link => {
    if (num === link.index) {
      foundLink = link;
    }
  });

  ordered.push(foundLink);
});

ordered.forEach(link => {

  if (link.shown) {

    let lightIcon = link.icon.light || linkData.defaultIcon;
    let darkIcon = link.icon.dark || lightIcon;

    const li = $("<li />", {
      "aria-label": `${link.name} link`
    });

    const a = $("<a />", {
      id: link.id,
      tabindex: 0,
      class: "social-link"
    });

      if (link.title) {
        a.attr("title", link.title);
      } else if (link.url) {
        a.attr("title", `Go to "${link.url}"`);
      } else {
        a.attr("title", link.name);
      }

      if (link.customStylesClass) {
        a.addClass(link.customStylesClass);
      }

      if (link.type === "link") {
        a.attr({
          href: link.url,
          target: "_blank"
        });
      } else if (link.type === "copy") {
        a.addClass("js-link-copy");
      }

    const divSocialIconContainer = $("<div />")
      .addClass("social-icon-container");

    const icon = $("<img />", {
      class: "social-icon",
      draggable: false,
      src: linkData.iconPath + (isDarkTheme() ? darkIcon : lightIcon),
      alt: link.icon.altText || "Icon",
    });

    const divContentRight = $("<div />")
      .addClass("content-right");
    
    const spanPlatformName = $("<span />")
      .text(link.name)
      .addClass("platform-name");

    const spanUsername = $("<span/>")
      .text(link.username)
      .addClass("username");

    // Build

    divSocialIconContainer.append(icon);
    divContentRight.append(spanPlatformName, spanUsername);
    a.append(divSocialIconContainer, divContentRight);
    li.append(a);

    linksList.append(li);
  }
});


// For all links with type: "copy":

const jsLinkCopy = $(".js-link-copy");

jsLinkCopy.each((i, element) => {
  element = $(element);

  const elementId = element.attr("id");

  let copyContent = "";
  let copyMsg = linkData.defaultCopyMsg;
  let initialContent = "";

  links.forEach(link => {
    if (link.id === elementId) {
      copyContent = link.copyContent;
      copyMsg = link.copyMsg;
      initialContent = link.username;
    }
  });

  let timeoutId;

  element.click(() => {
    navigator.clipboard.writeText(copyContent);
    
    const elem = $(`#${elementId} .username`)
      .addClass("copy-msg")
      .text(copyMsg);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      elem.text(initialContent)
        .removeClass("copy-msg");
    }, 2000);
  });
});


// Xitter thing

const xitter = links.find(link => link.id === "link-twitter").xitter;

if (xitter.enabled) {
  // Evil Twitter easter egg-like thing on X key down

  const spawnOfSatan = $("<img />", {
    id: "palantir-logo",
    draggable: false,
    src: xitter.palantirLogo,
    alt: "Palantir logo"
  });

  const staticOverlay = $("<div />").addClass("static");

  $("body").append(spawnOfSatan, staticOverlay);

  const twitX = $("a#link-twitter");
  const twitXLogo = $("a#link-twitter img.social-icon");
  const twitXName = $("a#link-twitter span.platform-name");

  const twitter = links.find(link => link.id === "link-twitter");
  
  // Make footer text change
  const footerContent = $("footer").html();
  const creepyFooterContent = "8d3f5e6c3e4852e74d2ead458f1f04ec";

  // Get url params
  const params = new URLSearchParams(document.location.search);

  let urlXitter = JSON.parse(params.get("xitter"));
  if (typeof urlXitter !== "boolean") {
    urlXitter = false;
  }

  
  // Sound Effect by "https://pixabay.com/users/freesound_community-46691455/ from Pixabay
  const hellSound = $("<audio />", {
    src: xitter.hellSound,
    "aria-hidden": true,
    type: "audio/mpeg"
  })[0];

  if (urlXitter) {
    hellSound.setAttribute("autoplay", true);
  }

  hellSound.loop = true;

  function evil() {
    // Turn styles, text and icons evil

    twitXLogo.attr("src", linkData.iconPath + xitter.xicon);
    twitXName.text(xitter.activationKey);
    twitX.attr({
      href: xitter.url,
      title: `Go to: "${xitter.url}"`
    }).addClass("elon");

    $("footer").html(`${creepyFooterContent}|ඞ`);
    $("body").addClass("elon-effect");
  }

  function normal() {
    // Return styles, text and icons to normal

    twitXLogo.attr("src", linkData.iconPath + twitter.icon.light);
    twitXName.text("Twitter");
    twitX.attr({
      href: twitter.url,
      title: `Go to: "${twitter.url}"`
    }).removeClass("elon");

    $("footer").html(footerContent); // Restores to original footer content
    $("body").removeClass("elon-effect");
  }

  if (urlXitter) {
    const msg = "[X] x key easter egg activation disabled";
    evil();

    // hellSound.play();
    // Sound cannot be played without user interacting with the document first >:( .
    
    console.warn(msg);
    console.warn("Audio may not start automatically – tap screen to start audio");

    $("body").keydown(event => {
      if (event.key === xitter.activationKey) {
        console.warn(msg);
      }
    });

    $("body").mousedown(() => {
      hellSound.play();
    });

    setInterval(() => {
      if (staticOverlay.css("opacity") <= linkData.staticOverlay.maxOpacity) {
        staticOverlay.css("opacity", "+=" + linkData.staticOverlay.step);
      }
    }, linkData.staticOverlay.interval);

  } else {
    // If ?xitter=false (normal):

    let pressed = false;
    let intervalId;

    $("body").keydown(event => {
      if (event.key === xitter.activationKey) {
        evil();
        hellSound.play();
      }

      if (event.key === xitter.activationKey && !pressed) {
        pressed = true;
        clearInterval(intervalId);
        intervalId = setInterval(() => {
          if (staticOverlay.css("opacity") <= linkData.staticOverlay.maxOpacity) {
            staticOverlay.css("opacity", "+=" + linkData.staticOverlay.step);
          }
        }, linkData.staticOverlay.interval);
      }
    });

    $("body").keyup(event => {
      if (event.key === xitter.activationKey) {
        normal();
        hellSound.pause();
      }

      if (event.key === xitter.activationKey && pressed) {
        pressed = false;
        staticOverlay.css("opacity", 0);
      }
    });
  }
}

// end Xitter thing

// Change icon themes

function switchIconTheme(theme) {

  // Link list

  $(".social-link").each((i, element) => {
    element = $(element);
    const elementId = element.attr("id");

    let lightIcon;
    let darkIcon;
    links.forEach(link => {
      if (link.id === elementId) {
        lightIcon = link.icon.light || linkData.defaultIcon;
        darkIcon = link.icon.dark || lightIcon;
      }
    });

    const icon = $(`#${elementId} img.social-icon`);
    icon.attr("src", linkData.iconPath + (theme ? darkIcon : lightIcon));
  });
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

$(matchMedia("(prefers-color-scheme: dark)"))
  .on("change", () => {
    switchIconTheme(isDarkTheme());
  });
