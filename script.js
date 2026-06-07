(function () {
  const VERSION = "2.0";

  window.XZL_VERSION = Object.freeze({
    version: VERSION,
    cacheVersion: VERSION,
    updatedAt: "2026-06-07"
  });

  function withVersion(url) {
    if (!url || url.startsWith("data:") || url.startsWith("blob:")) return url;
    if (!url.includes("/assets/") && !url.startsWith("./assets/")) return url;
    const [base, hash = ""] = url.split("#");
    const clean = base.replace(/[?&]v=[^&#]*/g, "");
    const sep = clean.includes("?") ? "&" : "?";
    return `${clean}${sep}v=${VERSION}${hash ? `#${hash}` : ""}`;
  }

  function versionImageAssets() {
    document.documentElement.dataset.version = VERSION;
    document.querySelectorAll("img[src]").forEach((img) => {
      img.src = withVersion(img.getAttribute("src"));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", versionImageAssets, { once: true });
  } else {
    versionImageAssets();
  }
})();
