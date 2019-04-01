<?php
	//************************Nawiązanie polaczenia PG*******************************

//zmienne do nawiazania polaczenie z serwerem Postgres i bazą danych Wojsko
	$db_host="localhost";
	$db_port="5432";
	$db_user="postgres";
	$db_pass="omega";
	$db_name="postgres";
	
//tekst do nawiązania polaczenia 
	$conn_string ="host=".$db_host." port=".$db_port." dbname=".$db_name." user=".$db_user." password=".$db_pass;
//zmienna do ktorej przypisana zostaje funkcja polaczenie z tekstem... 
    $polaczenie = pg_connect ("$conn_string") ;

/*
    jeżeli nie działa na nowej instalacji systemu tzn ze trzeba w xampp w plicu config php.ini odznaczyć komentarze przy bibliotekach pgsql
*/

    // sprawdzam status połączenia uwaga ! skrypt nie zabezpieczony przed sql injection.

    $stat = pg_connection_status($polaczenie);
   // if ($stat === PGSQL_CONNECTION_OK) echo "poprawnie nawiazano polaczenie \n " ;
    //do tego miejsca ok


	//wczytuje położenie jednostek z bazy danych
	$sql_location = pg_query($polaczenie, "SELECT szerokosc, dlugosc FROM public.tabela");
		if (!$sql_location){
			echo "błąd pobierania danych z serwera.\n";
			exit;
		}else { 
				while($row = pg_fetch_array($sql_location)){
					echo json_encode($row['dlugosc'])." ";
					echo json_encode($row['szerokosc'])." ";
					echo json_encode($row)." ";
			   };
	
			  }
  pg_close($polaczenie);

?>