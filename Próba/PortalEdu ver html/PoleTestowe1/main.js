$(document).ready(function () {
var lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
         lyrORTO = L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer", {layers: "Raster", format: 'image/png', transparent : 'true', version : '1.1.1'}),    
        mymap = L.map('mapa', {center: [53.68, 16.26], zoom: 10, zoomControl: true, attributionControl: true});
	
    mymap.addLayer(lyrOSM);
    
   var baseMaps = {
        "Openstreetmap": lyrOSM,
        "ORTO": lyrORTO
      };
        
		
	//tutaj pobiera i wczytuje plik geojson za pomocą biblioteki leaflet Ajax
	{
	var myStyle = {
    "color": "black",
	};
	var SlowGOstyle = {
    "color": "yellow",
	};
	var NoGOstyle = {
    "color": "red",
	};
	var GOstyle = {
    "color": "green",
	};
	
	var geojsonLayer = new L.GeoJSON.AJAX("data/czaplinekZasieg.geojson", {style: myStyle});       
    geojsonLayer.addTo(mymap);
	
	
	var czaplinekSlowGO = new L.GeoJSON.AJAX("data/czaplinek_BDN_SLOWGO.geojson", {style: SlowGOstyle});       
czaplinekSlowGO.addTo(mymap);
	
	var czaplinekNoGO = new L.GeoJSON.AJAX("data/czaplinek_BDN_NOGO.geojson", {style: NoGOstyle});       
czaplinekNoGO.addTo(mymap);
	
	var czaplinekGO = new L.GeoJSON.AJAX("data/czaplinek_BDN_GO.geojson", {style: GOstyle});       
czaplinekGO.addTo(mymap);
	}
    //polecenie dodania ikonki 
    L.control.layers(baseMaps).addTo(mymap);
    
    //dodaje skale
    L.control.scale().addTo(mymap);
    
    mymap.on('keypress', (e) => {
        if (e.originalEvent.key=="l") {
            mymap.locate();
        }
    });
    
    mymap.on('locationfound', function(e) {
            console.log(e);
            mrkCurrentLocation = L.circle(e.latlng, {radius:e.accuracy/2}).addTo(mymap);
            mymap.setView(e.latlng, 14);
    });
    
    mymap.on('locationerror', function(e) {
            console.log(e);
            alert("nie ustalono lokalizacji");
            })
    
})