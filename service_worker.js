chrome.runtime.onMessage.addListener(
  function(request, sender, response) {
    if (request.run === true) {
        chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
            let tab = tabs[0];
            if (tab) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: addNewLayers,
                    world: "MAIN"
                }, (result) => {
                    if (chrome.runtime.lastError) {
                        console.log("Failed to add new layers to the map!");
                    }
                });
            }
        });
    }
  }
);

function addNewLayers() {
    if (typeof L == 'undefined') {
        return;
    }
    let options = { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] };
    let layers = {
        "Satellite": L.tileLayer('https://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', options),
        "Streets"  : L.tileLayer('https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}'  , options),
        "Terrain"  : L.tileLayer('https://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}'  , options)
    };
    L.control.layers(layers).addTo(gMap);
    layers["Satellite"].addTo(gMap);
}