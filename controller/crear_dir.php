<?php

	$lr_carpeta = $_POST['carpeta'];
	if (file_exists("../others/anexos/".$lr_carpeta)) {
            echo "1";
        }else {
			mkdir("../others/anexos/".$lr_carpeta, 0700);
            echo "2";
        }	
?>