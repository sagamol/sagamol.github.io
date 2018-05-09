
let myMap = L.map("mapdiv");
let sehenswuerdigkeitengroup = L.featureGroup().addTo(myMap)
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
    "Sehenswürdigkeiten" : sehenswuerdigkeitengroup,
});
myMap.addControl(myMapControl);



myMap.setView([48.208147,16.373819], 12);
console.log("Sehenswürdigkeiten: ",sehenswuerdigkeitendata);



let geojson = L.geoJSON(sehenswuerdigkeitendata).addTo(sehenswuerdigkeitengroup);
geojson.bindPopup(function(layer) {
    const props = layer.feature.properties;
    const popupText = `<h1>Wien Sehenswürdigkeiten</h1>
    <p><strong>Name:</strong> <em>${props.NAME}</em></p><p><strong>Adresse:</strong> <em>${props.ADRESSE}</em></p><p><strong>Weitere Informationen:</strong> <em>${props.WEITERE_INF}</em></p>`;
    return popupText
    
});

 async function addGeojson(url) {
 console.log("Url wird geladen:", url);
 const response = await fetch(url);
 console.log("Response:", response);
 const sehenswuerdigkeitendata = await response.json();
 console.log("GeoJson:", sehenswuerdigkeitendata);
 const geojson = L.geoJSON(sehenswuerdigkeitendata, {
     style: function(feature) {
        return { color: "#ff0000" };
     },
     pointToLayer: function(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: "sightseeing.png"
             })
        });
     }
 });
 sehenswuerdigkeitengroup.addLayer(geojson);
 myMap.fitBounds(sehenswuerdigkeitendata.getBounds());
 }

 const url ="https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json"
 addGeojson(url);

myMap.addLayer(sehenswuerdigkeitengroup);


