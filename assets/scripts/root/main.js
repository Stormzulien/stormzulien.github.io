/*
  Details:
    Source: "https://stormzulien.github.io/"

    By Stormzulien (Jay)

    Started: 25/01/2026,
    Last Updated: 09/02/2026
    
    (Format: DD/MM/YYYY)

  Notes:
*/

"use strict";

const longerBtn = document.querySelector("#longer-btn");
longerBtn.clickCount = 0;
const blankContent = document.querySelector("#blank-content");
const endMsg_0 = document.querySelector("#end-msg-0");
const endMsg_1 = document.querySelector("#end-msg-1");
const cancelBtn = document.querySelector("#cancel-btn");

blankContent.style.height = "100px";

longerBtn.addEventListener("click", () => {
  if (longerBtn.clickCount === 0) {
    cancelBtn.style.display = "initial";
    longerBtn.innerHTML = "Are you sure?<br>This cannot be undone.";
    longerBtn.clickCount++;
    longerBtn.removeAttribute("title");
    longerBtn.setAttribute("title", "currently a longer button");
  } else if (longerBtn.clickCount === 1) {
    cancelBtn.style.display = "none";
    blankContent.style.height = `${1000}px`;
    endMsg_1.style.display = "initial";
    endMsg_0.innerHTML = "(this is no longer the end of the page)";
    longerBtn.innerHTML = "The page has been made longer.<br>Please enjoy the great lengthiness of your page.";
    longerBtn.removeAttribute("title");
    longerBtn.setAttribute("title", "no longer a longer button");
    longerBtn.disabled = true;
  }
});

cancelBtn.addEventListener("click", () => {
  longerBtn.clickCount = 0;
  cancelBtn.style.display = "none";
  longerBtn.innerHTML = "Make it longer";
  longerBtn.removeAttribute("title");
  longerBtn.setAttribute("title", "longer button");
});