<?php
	include("connect.php");

//wczytuje położenie jednostek z bazy danych
<<<<<<< HEAD
	$sql_location = pg_query($polaczenie, "SELECT szerokosc, dlugosc, opis, data FROM public.tabela");
=======
	$sql_location = pg_query($polaczenie, "SELECT szerokosc, dlugosc FROM public.tabela");
>>>>>>> 09941dd82fae550c8a773be63c3ff7af876a3dc9
		if (!$sql_location){
			echo "błąd pobierania danych z serwera.\n";
			exit;
		}else { 
				while($row = pg_fetch_array($sql_location)){
					echo json_encode($row['dlugosc'])." ";
					echo json_encode($row['szerokosc'])." ";
					//print_r ($row);
<<<<<<< HEAD
			   };
	
=======
					
			   };
	
			
				

>>>>>>> 09941dd82fae550c8a773be63c3ff7af876a3dc9
			  }
  pg_close($polaczenie);


?>