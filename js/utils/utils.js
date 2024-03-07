import * as FILTER from './colors/filter.js';

/* ############################################################################
------------------------------------ MATHS ------------------------------------
############################################################################ */

export const getRandomIntegerBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* ############################################################################
----------------------------------- COLORS -----------------------------------
############################################################################ */

export const getFilterStringForHexValue = (hexValue) => {
  return FILTER.getFilterStringForHexValue(hexValue);
}


/* ############################################################################
------------------------------------- DOM -------------------------------------
############################################################################ */
/* Breakpoints */
const BREAKPOINTS = {
  PHONE_MAX_WIDTH: 767,
  TABLET_MAX_WIDTH: 1279,
  LAPTOP_MAX_WIDTH: 1919
}

export const isPhone = window.innerWidth <= BREAKPOINTS.PHONE_MAX_WIDTH
export const isTablet = window.innerWidth > BREAKPOINTS.PHONE_MAX_WIDTH && window.innerWidth <= BREAKPOINTS.TABLET_MAX_WIDTH
export const isTabletOrUp = window.innerWidth > BREAKPOINTS.PHONE_MAX_WIDTH
export const isLaptop = window.innerWidth > BREAKPOINTS.TABLET_MAX_WIDTH && window.innerWidth <= BREAKPOINTS.LAPTOP_MAX_WIDTH
export const isLaptopOrUp = window.innerWidth > BREAKPOINTS.TABLET_MAX_WIDTH
export const isDesktop = window.innerWidth > BREAKPOINTS.LAPTOP_MAX_WIDTH

export const setDocumentHeight = () => {
  document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', setDocumentHeight);

export const setHTMLTitle = (pageTitle) => {
  document.getElementById('title').innerHTML = pageTitle;
  document.getElementById('appleTitle').setAttribute('content', pageTitle);
}