import { setStorage } from "./storage/storage.js";
import { setDocumentHeight, setHTMLTitle } from "./utils/utils.js";
import { APP_NAME, APP_VERSION } from "../properties.js";
import { SEASONS } from "./data.js";

/* ############################################################################
--------------------------------- CONSTANTES ---------------------------------
############################################################################ */
const EPISODE_HEIGHT = 'var(--episode-header-height) + var(--episode-img-height) + var(--vertical-gap)';
const getSeasonOpenedHeight = (season) => {
  const epCount = season.episodes.length;
  console.log(epCount)
  return `calc(var(--season-header-height) + var(--vertical-gap) + (${epCount} * (${EPISODE_HEIGHT}))`;
}

/* ############################################################################
---------------------------------- FONCTIONS ----------------------------------
############################################################################ */

// INTERACTIONS UTILISATEUR -------------------------------

const onSeasonHeaderClick = (seasonId) => {
  const season = SEASONS.find((element) => element.id == seasonId);
  const caret = document.getElementById(`${seasonId}Caret`);
  console.table(season);
  const seasonContainer = document.getElementById(seasonId);
  if (seasonContainer.classList.contains('closed')) {
    seasonContainer.classList.remove('closed');
    seasonContainer.style.minHeight = getSeasonOpenedHeight(season);
    seasonContainer.style.height = getSeasonOpenedHeight(season);
    caret.style.transform = 'rotate(180deg)';
  } else {
    seasonContainer.classList.add('closed');
    seasonContainer.style.minHeight = 'var(--season-header-height)';
    seasonContainer.style.height = 'var(--season-header-height)';
    caret.style.transform = 'rotate(0deg)';
  }
}
window.onSeasonHeaderClick = onSeasonHeaderClick;

// GÉNÉRATION DOM -----------------------------------------


/* ############################################################################
---------------------------------- EXECUTION ----------------------------------
############################################################################ */

// Auto ---------------------------------------------------
//setStorage();
//setDocumentHeight();

// Manuelle -----------------------------------------------

setHTMLTitle(APP_NAME);

const getEpisodeHTML = (episode) => {
  return `
    <div class="episode-container ${episode.link == '' ? 'unavailable' : ''}">
      <div class="episode-header"><span>${episode.id}</span><span>${episode.title}</span></div>
      <div class="episode-img" style="background-image: url('${episode.img}');"></div>
      ${episode.link != '' ? `<a href="${episode.link}" class="episode-link"><img src="./medias/images/youtube.png" /></a>` : ''}
      
    </div>
  `;
}
const getEpisodesHTML = (episodes) => {
  let rtn = '';
  episodes.forEach(episode => {
    rtn += getEpisodeHTML(episode);
  });

  return rtn;
}

const getSeasonHTML = (season) => {
  return `
    <div id="${season.id}" class="season-container closed">

      <div class="season-header" onclick="onSeasonHeaderClick('${season.id}')">
        <span>${season.title} <span>(${season.year})</span></span>
        <img id="${season.id}Caret" src="./medias/images/font-awsome/caret-down.svg" />
      </div>

      <div class="season-content">
        ${getEpisodesHTML(season.episodes)}
      </div>
    </div>
  `;
}
const getSeasonsHTML = () => {
  let rtn = '';

  SEASONS.forEach(season => {
    rtn += getSeasonHTML(season);
  });

  return rtn;
}

const main = document.getElementById('main');
main.innerHTML = `
  <div class="top-logo-container"><img src="./medias/images/kn-logo.webp" /></div>
  ${getSeasonsHTML()}
`;
