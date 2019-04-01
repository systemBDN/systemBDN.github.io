<?php
	include("connect.php");

    //w tej linijce próbuje przypisać zmienna z js do php
    $szer = $_POST['szer'];
    $dl = $_POST['dl'];
       

//*******************************************************************************
    //wprowadzanie danych do bazy danych
    $opis = "xyx";
    //$_POST['nazwa']='c';
    
    //polecenie wprowadzania danych insert
    $query = "INSERT INTO public.tabela(szerokosc, dlugosc, opis)
	VALUES ('$szer','$dl','$opis')";
    $result = pg_query($query); 

    $sql = "SELECT * FROM public.tabela";

    if (pg_query($sql)) {
			//echo " poprawnie wprowadzono dane";
    	} else {
    		echo "cannot insert" ;   
    	};
    pg_close($polaczenie);

?>