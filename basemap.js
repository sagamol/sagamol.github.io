
let myMap = L.map("mapdiv"); //http://leafletjs.com/reference-1.3.0.html#map-example
let myLayers = {
    osm: L.tileLayer ( //http://leafletjs.com/reference-1.3.0.html#tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //http://leafletjs.com/reference-1.3.0.html#control-attribution
    ),

    geolandbasemap: L.tileLayer ("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"], //http://leafletjs.com/reference-1.3.0.html#tilelayer-option
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>", //http://leafletjs.com/reference-1.3.0.html#control-attribution
    }
),

    bmapoverlay: L.tileLayer ("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
),

    bmapgrau: L.tileLayer ("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
),

    bmaphidpi: L.tileLayer ("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
),

    bmaporthofoto30cm: L.tileLayer ("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
),

}

myMap.addLayer(myLayers.geolandbasemap); //http://leafletjs.com/reference-1.3.0.html#layer

let myMapControl =L.control.layers({ //http://leafletjs.com/reference-1.3.0.html#control-layers
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
});
myMap.addControl(myMapControl); //http://leafletjs.com/reference-1.3.0.html#control



myMap.setView([47.267,11.383], 11); //http://leafletjs.com/reference-1.3.0.html#latlng




let myScaleControl = L.control.scale (
    position = 'bottomleft',
    maxWidth = 200,
    scale = 'metric',
    ).addTo(myMap); //http://leafletjs.com/reference-1.3.0.html#control-scale-option
