"use strict";

const doc = document;
  doc.qs = doc.querySelector;
  doc.qsa = doc.querySelectorAll;
  doc.body.header = doc.qs("header");
  doc.body.footer = doc.qs("footer");
  doc.body.main = doc.qs("main");
  doc.main = doc.body.main;

export default doc;