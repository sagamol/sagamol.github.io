
let myMap = L.map("mapdiv");
let wiengroup = L.featureGroup().addTo(myMap)
let myLayers = {
    osm: L.tileLayer ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    geolandbasemap: L.tileLayer ("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
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

myMap.addLayer(myLayers.geolandbasemap);

let myMapControl =L.control.layers({
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
    "Spaziergang Wien" :wiengroup,
});
myMap.addControl(myMapControl);



myMap.setView([47.267,11.383], 11);
console.log("Stationen: ",wiendatas);



let geojson = L.geoJSON(wiendatas).addTo(wiengroup);
geojson.bindPopup(function(layer) {
    const props = layer.feature.properties;
    const popupText = `<h1>${props.name}</h1>
    <p>Temperatur: ${props.LT} °C</p>`;
    return popupText
    
});

async function addGeojson(url) {
console.log("Url wird geladen:", url);
const response = await fetch(url);
console.log("Response:", response);
const wiendatas = await response.json();
console.log("GeoJson:", wiendatas);
const geojson = L.geoJSON(wiendatas, {
    style: function(feature) {
        return { color: "#ff0000" };
    },
    pointToLayer: function(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: "sight-2.png"
            })
        });
    }
});
wiengroup.addLayer(geojson);
myMap.fitBounds(wiendatas.getBounds());
}

const url ="https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:SPAZIERPUNKTOGD,ogdwien:SPAZIERLINIEOGD"
addGeojson(url);

myMap.addLayer(wiengroup);


