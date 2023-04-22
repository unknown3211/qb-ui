let lasttext = {};

function showInteraction(text, type) {
    if (!type) type = "info";
    lasttext = text;
    SendNUIMessage({
        type: "open",
        text: text,
        color: type,
    });
}

function hideInteraction(type) {
    type = type || "info";
    SendNUIMessage({
        type: "close",
        text: lasttext,
        color: type,
    });
}

exports("showInteraction", showInteraction);
exports("hideInteraction", hideInteraction);
