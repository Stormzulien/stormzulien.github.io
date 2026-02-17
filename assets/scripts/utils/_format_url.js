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

function formatUrl(url) {
  url = url.trim();

  let breakApart = "";
  let newUrl = "";
  let protocol = "http";
  let wwwSubdomain = false;

  let urlArray = url.split("");
  let colonFound = false;
  let protocolArray = [];

  urlArray.forEach(char => {
    if (!colonFound) {
      if (char !== "/") {
        if (char === ":") {
          colonFound = true;
        } else {
          protocolArray.push(char);
        }
      } else {
        protocolArray = [];
      }
    }
  });

  protocol = protocolArray.join("");

  if (url.substring(0, 8) === "https://") {
    protocol = "https";
    breakApart = url.replace("https://", "");
  } else if (url.substring(0, 7) === "http://") {
    breakApart = url.replace("http://", "");
  } else if (
      url.substring(0, 4) === "www." ||
      url.substring(8, 12) === "www." ||
      url.substring(7, 11) === "www."
    ) {
    wwwSubdomain = true;
    breakApart = url.replace("www.", "");
  } else {
    breakApart = url;
  }

  newUrl = `${protocol}://${wwwSubdomain ? "www." : ""}${breakApart}`;

  return newUrl;
}

const a = formatUrl("mailto://twitter.com");
console.log(a);