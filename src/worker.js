// Jedan glavni host: https://www.mecara.app. Sve ostalo (apex, http) trajno preusmjerava, uz očuvanje putanje i parametara.
const CANONICAL_HOST = "www.mecara.app";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isProdHost = url.hostname === "mecara.app" || url.hostname === CANONICAL_HOST;
    if (isProdHost && (url.hostname !== CANONICAL_HOST || url.protocol !== "https:")) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
