import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

dayjs.extend(relativeTime);
dayjs.locale("fr");

/**
 * Fonction pour calculer le temps écoulé depuis la date de création d'un post.
 * @param {Date | string | undefined} postDate - La date de création du post (objet Date, chaîne de caractères ou undefined).
 * @returns {string} - Temps écoulé en minutes, heures ou jours.
 */
export const getElapsedTime = (postDate: Date | string | undefined): string => {
  if (!postDate) {
    return "Date invalide";
  }
  const date = typeof postDate === "string" ? new Date(postDate) : postDate;
  return dayjs(date).fromNow();
};
