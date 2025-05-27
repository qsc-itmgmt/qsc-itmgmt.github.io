function getLinkParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("link");
}

const code = getLinkParam();

if (code) {
    const fullUrl = `https://player.vimeo.com/video/${code}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;
    const decodedUrl = decodeURIComponent(fullUrl);

    const iframe = document.getElementById("video-frame");
    iframe.src = decodedUrl;

    document.getElementById("video-container").style.display = "flex";
} else {
    document.getElementById("video-info").innerHTML = "<p>Kein 'link'-Parameter in der URL gefunden.</p>";
}
