<?php
	session_start();
	
	if ((!isset($_POST['login']))||(!isset($_POST['haslo'])))
	{
		header ('Location:index.php');
		exit();
	}
	require_once "connect.php";

	$polaczenie = pg_connect ("$conn_string");
		
			  $stat = pg_connection_status($polaczenie);
			  if ($stat === PGSQL_CONNECTION_OK) 
					{
						echo 'Status połączenia : Nawiązano <br/>';			  
						$login = $_POST['login'];
						$haslo= $_POST['haslo'];
						
						$login= htmlentities($login, ENT_QUOTES,"UTF-8");
						$haslo= htmlentities($haslo, ENT_QUOTES,"UTF-8");
						
						//$sql ="SELECT * FROM uzytkownicy WHERE login='$login' AND haslo='$haslo'"; // zmienna przechowująca zapytanie sql do weryfikacji hasła				
						
						if ($rezultat=pg_query($polaczenie, (sprintf("SELECT * FROM uzytkownicy WHERE login='%s' AND haslo='%s'",
						pg_escape_string ($polaczenie, $login),
						pg_escape_string ($polaczenie, $haslo)))))			//warunek na czy wynik zapytania jest nie pusty albo czy nie ma próby wstrzykniecia sql
						{
							$ilu_userow=pg_num_rows($rezultat);
							if ($ilu_userow>0)															//sprawdzam czy ktoś jest już zalogowany (poprawność logowania)
							{
								
								$_SESSION['zalogowany']=true;
								$wiersz=pg_fetch_assoc($rezultat);

								//przechwytuje wynik zapytania z bazy danych z kolumny oznaczonej jako "user"

								$_SESSION['id']=$wiersz['ID'];
								$_SESSION['user']=$wiersz['login'];						//wysyłam zmienna do globalnego pojemnika na dane
								unset($_SESSION['blad']);
								
								header('Location: PortalEdu/main.php');
								
							}
							else			//nie ma w bazie nikogo o tym loginie lub haśle 
							{
								
								$_SESSION['blad']='<span style="color:red"> Nieprawidłowy login lub hasło !</span>';
								header('Location: index.php');
								
							}
							
							
						}	
						else // kiedy błędne hasło
						{
							
							
						}
											
						
						pg_close($polaczenie);																/*kończę połączenie z bazą danych*/
					} 
										  
			   else 
					{
						  echo 'Status połączenia: NIENAWIAZANE';
					}  
					
?>