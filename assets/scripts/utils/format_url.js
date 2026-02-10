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

function formatUrl(url = "", {defaultProtocol = "http", defaultProtocolSeparator = "://", runTypeChecks = false} = {}) {
  if (typeof url !== "string" && runTypeChecks) {
    console.error("[function: formatUrl] > Argument must be of string type");
    console.error("[function: formatUrl] > Process exited");
    return;
  }

  url = url.trim();
  let newUrl = "";
  let breakApart = "";
  let protocol = defaultProtocol;
  const urlArray = url.split("");

  const protocolArray = [];
  let protocolSeparator = "";
  let separatorFound = false;

  urlArray.forEach((char, index) => {
    if (!separatorFound) {
      if (char === ":") {
        if (urlArray[index + 1] === "/") {
          separatorFound = true;
          protocolSeparator = "://";
        } else {
          separatorFound = true;
          protocolSeparator = ":";
        }
      } else {
        protocolArray.push(char);
      }
    }
  });

  if (separatorFound) {
    protocol = protocolArray.join("");
    breakApart = url.substring(protocol.length + protocolSeparator.length);
  } else {
    protocolSeparator = defaultProtocolSeparator;
    breakApart = url;
  }

  // return [breakApart, protocol, protocolSeparator, separatorFound];
  newUrl = protocol + protocolSeparator + breakApart;
  return newUrl;
}

// const a = formatUrl("https://www.example.com");
// console.log(a);

export default formatUrl;