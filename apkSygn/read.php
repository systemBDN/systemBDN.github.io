<?php
	include("connect.php");

//wczytuje położenie jednostek z bazy danych
	$sql_location = pg_query($polaczenie, "SELECT szerokosc, dlugosc FROM public.tabela");
		if (!$sql_location){
			echo "błąd pobierania danych z serwera.\n";
			exit;
		}else { 
				while($row = pg_fetch_array($sql_location)){
					echo json_encode($row['dlugosc'])." ";
					echo json_encode($row['szerokosc'])." ";
					//print_r ($row);
					
			   };
	
			
				

			  }
  pg_close($polaczenie);


?>