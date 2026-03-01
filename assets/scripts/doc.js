"use strict";

const doc = document;
  doc.qs = doc.querySelector;
  doc.qsa = doc.querySelectorAll;
  doc.gbid = doc.getElementById;
  doc.gbcn = doc.getElementsByClassName;
  doc.ce = doc.createElement;
  doc.body.header = doc.qs("header");
  doc.body.footer = doc.qs("footer");
  doc.body.main = doc.qs("main");
  doc.header = doc.body.header;
  doc.footer = doc.body.footer;
  doc.main = doc.body.main;

export default doc;