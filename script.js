const lbInput = document.getElementById("lb");
const kgInput = document.getElementById("kg");
const inInput = document.getElementById("in");
const cmInput = document.getElementById("cm");

lbInput.addEventListener("input", () => {
    kgInput.value = lbInput.value === "" ? "" : (Number(lbInput.value) * 0.45359237).toFixed(2);
});

kgInput.addEventListener("input", () => {
    lbInput.value = kgInput.value == "" ? "" : (Number(kgInput.value) / 0.45359237).toFixed(2);
});

inInput.addEventListener("input", () => {
    cmInput.value = inInput.value === "" ? "" : (Number(inInput.value) * 2.54).toFixed(2);
});

cmInput.addEventListener("input", () => {
    inInput.value = cmInput.value === "" ? "" : (Number(cmInput.value) / 2.54).toFixed(2);
});

[lbInput, kgInput, inInput, cmInput].forEach(input => {
    input.addEventListener("focus", () => {
        input.value = "";
    });
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then(() => console.log("Service worker registered"))
            .catch(error => console.error("Service worker registration failed:", error));
    });
}