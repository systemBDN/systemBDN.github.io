$(document).ready(function () {
	var lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
		lyrORTO = L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer", 
								  {layers: "Raster", 
								   format: 'image/png', 
								   transparent : 'true', 
								   version : '1.1.1'}),
		 mymap = L.map('mapa', 
					   {center: [52.43, 20.73], 
						zoom: 9, 
						zoomControl: true, 
						attributionControl: true
					   }
					  );

   //mymap.addLayer(lyrOSM);
    
   //var baseMaps = {
   //    "Openstreetmap": lyrOSM,
   //     "ORTO": lyrORTO
   //   };
        
	{
	var myStyle = {
			"color": "black",
	},
		SlowGOstyle = {
			"color": "yellow",
	},
		NoGOstyle = {
			"color": "red",
	},
		GOstyle = {
			"color": "green",
	};
	
	var SerockZasieg = new L.GeoJSON.AJAX("data/SerockZasieg.geojson", {style: myStyle});       
    	SerockZasieg.addTo(mymap);
	var SerockSlowGO = new L.GeoJSON.AJAX("data/Serock_BDN_SLOWGO.geojson", {style: SlowGOstyle});       
		SerockSlowGO.addTo(mymap);
	var SerockGO = new L.GeoJSON.AJAX("data/Serock_BDN_GO.geojson", {style: GOstyle});       
//SerockGO.addTo(mymap);
	var SerockNoGO = new L.GeoJSON.AJAX("data/Serock_BDN_NOGO.geojson", {style: NoGOstyle});       
		SerockNoGO.addTo(mymap);
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