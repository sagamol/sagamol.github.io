
let myMap = L.map("mapdiv");
let citybikegroup = L.featureGroup().addTo(myMap)
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
    "Citybikestationen" :citybikegroup,
});
myMap.addControl(myMapControl);



myMap.setView([48.208147,16.373819], 12);
console.log("Radstationen: ",citybikedata);



let geojson = L.geoJSON(citybikedata).addTo(citybikegroup);
geojson.bindPopup(function(layer) {
    const props = layer.feature.properties;
    const popupText = `<h1>Wien Citybikestationen</h1>
    <p><strong>Station:</strong> <em>${props.STATION}</em> </p><p><strong>Bezirk:</strong> <em>${props.BEZIRK}</em> </p>`;
    return popupText
    
});

 // async function addGeojson(url) {
 // console.log("Url wird geladen:", url);
 // const response = await fetch(url);
 // console.log("Response:", response);
 // const citybikedata = await response.json();
 // console.log("GeoJson:", citybikedata);
 // const geojson = L.geoJSON(citybikedata, {
     // style: function(feature) {
        // return { color: "#ff0000" };
     // },
     // pointToLayer: function(geoJsonPoint, latlng) {
        // return L.marker(latlng, {
            // icon: L.icon({
                // iconUrl: "rad.png"
            // })
        // });
     // }
 // });
citybikegroup.addLayer(geojson);
myMap.fitBounds(citybikedata.getBounds());
 // }

// const url ="https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:SPAZIERPUNKTOGD,ogdwien:SPAZIERLINIEOGD"
// addGeojson(url);

myMap.addLayer(citybikegroup);

