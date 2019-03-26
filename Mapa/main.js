$(document).ready(function () {
var lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
         lyrORTO = L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer", 
								   {layers: "Raster", 
									format: 'image/png', 
									transparent : 'true', 
									version : '1.1.1'}),  
		 lyrBDN = L.tileLayer.wms("http://localhost:8095/geoserver/BDN_pilotaz/wms", 
        {
            layers: "BDN_pilotaz:all", 
            format: 'image/png', 
            transparent : 'true', 
            version : '1.1.1'
        });
		
        mymap = L.map('mapa', {center: [52.3289, 21.0], zoom: 10, zoomControl: true, attributionControl: true});

    	mymap.addLayer(lyrOSM);
    
	//przycisk danych
   var baseMaps = {
        "Openstreetmap": lyrOSM,
        "ORTO": lyrORTO,
	    "BDN": lyrBDN
      };
        
    //polecenie dodania ikonki 
    L.control.layers(baseMaps).addTo(mymap);
    
    	
	//skala
	ctlScale = L.control.scale({position:'bottomleft', imperial:false, maxWidth:200}).addTo(mymap);
     
	
	// lokalizacja 
    mymap.locate({setView: true, maxZoom: 13});
	
	function onLocationFound(e) {
		var radius = e.accuracy / 2;

		L.marker(e.latlng).addTo(mymap).bindPopup("Znajdujesz się w promieniu " + radius + " m od tego punktu").openPopup();

		L.circle(e.latlng, radius).addTo(mymap);

			function onLocationError(e) {
				alert(e.message);
				}

	mymap.on('locationerror', onLocationError);
	}
	mymap.on('locationfound', onLocationFound);
	//dodaje narzedzie do pomiarów
	L.control.polylineMeasure().addTo(mymap);
})