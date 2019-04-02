$(document).ready(function () {
			
    //wczytywanie mapy

    //deklaracja map podkładowych
    var lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
        lyrORTO = L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer", {layers: "Raster", format: 'image/png', transparent : 'true', version : '1.1.1'}),    
        lyrSozo = L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/SOZO/MapServer/WMSServer", {layers: "Raster", format: 'image/png', transparent : 'true', version : '1.1.1'}),
        
        // przypisuję do zmiennej mymap obiekt mapa z klasy map
        mymap = L.map('mymap', {center: [52.3289, 21.0], zoom: 10, zoomControl: false, attributionControl: false});

    mymap.addLayer(lyrOSM);
        
    var baseMaps = {
        "Openstreetmap": lyrOSM,
        "Ortofotomapa": lyrORTO,
        "Mapa Sozologiczna": lyrSozo        
      };
    
    //polecenie dodania ikonki do wyboru danych
    L.control.layers(baseMaps).addTo(mymap);
    
    //Działa ale zamula bo geoportal jest mało wydajny

    //tworze zmienna w postacie mojej ikonki.
    var myicon=L.icon({
        iconUrl: 'img/platoon.png',
        iconSize: [50, 50],
        iconAnchor: [25,25],
        popupAnchor: [0, 0],
    });

    //dodaje skale
    L.control.scale({position:'bottomright', imperial:false, maxWidth:200}).addTo(mymap);
    
	
	//lokalizacja 
    mymap.locate({setView: true, maxZoom: 10});
	
	function onLocationFound(e) {
		var radius = e.accuracy / 2;

		L.marker(e.latlng).addTo(mymap).bindPopup("Znajdujesz się w promieniu " + radius + " metrów od tego punktu").openPopup();

		L.circle(e.latlng, radius).addTo(mymap);

			function onLocationError(e) {
				alert(e.message);
				}

	mymap.on('locationerror', onLocationError);
	};
	
	mymap.on('locationfound', onLocationFound);
    
	
	//wczytanie sytuacji taktycznej - przemyśleć czy nie zrobić tego na onclick do jakiegoś przycisku
	$.ajax({
		type:'POST',
		url: 'read.php',
		success: function(response){
			//response = JSON.parse(response);
			//console.log(response);
			var a = response.replace( /"/g ,"").split(' ');// zamieniam znak w całym napisie i konwertuje go do tabeli
			b = []; // pusty łańcuch do którego nastąpi przepisanie 
	
			a.forEach((item)=>{
				if (!item==''){
					b.push(parseFloat(item));
				};
			});
				b.forEach((item, i)=>{
					if (i%2===0){
						//console.log([b[i], b[i+1]]);
						L.marker([b[i+1], b[i]], {icon: myicon}).addTo(mymap).bindPopup('wspolrzedne: <br>' + [b[i]+" "+b[i+1]]);
						//console.log(i, item);
					};
				});
		},
		error: function(err_info){
			console.log('Błąd podczas pracy skryptu');
			console.log(err_info);
		}
	});
		
	//okodowanie ppm
    mymap.on('contextmenu', function (e) {
       	//umieść markera we wskazanym miejscu
        L.marker(e.latlng, {icon: myicon}).addTo(mymap).bindPopup('wspolrzedne: <br>' + e.latlng);
        
        // okodowanie zeby ppm automatycznie wpisywal wspolrzedne markera do diva po prawej stornie
        var szer = e.latlng.lat.toFixed(3);
        var dl = e.latlng.lng.toFixed(3);
		var informacjaOPrzeciwniku = $("#informacjaOPrzeciwniku").val();
        
        //$("#tekst").html('<br> [szer], [dl]');
		//$("#tekst").html("");
        $("#tekst").append(+ szer + ' N, ' + dl + ' E; ');

		//wysłanie zmiennej do php za pomocą uproszczonego ajax z biblioteki jquery 
        $.ajax({
            url: "insert.php",
            type: 'POST', //deklaracja sposobu przekazywania zmiennych 
<<<<<<< HEAD
            data: { szer: szer, dl: dl, informacjaOPrzeciwniku: informacjaOPrzeciwniku }, //opis argumentów do przekazania musi być zgodny z json
=======
>>>>>>> 09941dd82fae550c8a773be63c3ff7af876a3dc9
            success: function(msg){
				console.log('Server response :\n '+msg); //argument funkcji to odpowiedz serwera i docelowo ma isc do console log żeby odczytać komunikat
			},
            error: function (ajaxContext){
            	console.log(ajaxContext.responseText); //odpowiedz ma isc do console log 
            }
        });
    }); 
});