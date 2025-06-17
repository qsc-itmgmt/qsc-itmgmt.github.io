function getLinkParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("link");
}

var code = getLinkParam();
if (!code) {
    code = "1";
}

const fullUrl = `https://player.vimeo.com/video/${code}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;
const decodedUrl = decodeURIComponent(fullUrl);
const iframe = document.getElementById("video-frame");
iframe.src = decodedUrl;
document.getElementById("video-container").style.display = "flex";

var player = new Vimeo.Player(iframe);

//Wird aufgerufen wenn das Iframe geladet wird.
//1. Mal bei Passwort Abfrage -> es gibt keinen Title dadurch wird die Beschreibung auch nicht geladen
//2. Mal Passwort wurde eingegeben -> es gibt einen Title somit kann auch die Beschreibung aus dem Json File geladen werden.
player.on('loaded', function () {
    player.getVideoTitle().then(function (title) {
        if (title) {
            document.getElementById("video-title").innerText = title;

            fetch('../description.json')
            .then(response => response.json())
            .then(data => {
                const description = data[code]?.description || "";
                document.getElementById("video-description").innerHTML = description;
            })
            .catch(error => {
                console.error("Fehler beim Laden der Beschreibung:", error);
                document.getElementById("video-description").innerText = "Fehler beim Laden der Beschreibung.";
            });
        }
    });
});