<?php

//----------------------------------------------------------------------------------------------------------------------


error_reporting(E_ALL ^ E_NOTICE ^ E_DEPRECATED ^ E_WARNING );
error_reporting(E_ALL);
ini_set("register_globals","off");
ini_set("display_errors","on");


//----------------------------------------------------------------------------------------------------------------------


$type=$_GET['type'];
$seed=$_GET['seed'];
$width=$_GET['width'];


$file='ui/image/'.$type.'/'.$seed.'.png';

//echo($file);
//--------------------------------------------------------------------------------------

function imgresize($img,$width,$height) {
  $new_image = imagecreatetruecolor($width, $height);
  imagealphablending($new_image,false);
  imagecopyresampled($new_image, $img, 0, 0, 0, 0, $width, $height, imagesx($img), imagesy($img));
  return($new_image);
}

//-------

function imgresizew($img,$width) {
  $ratio = $width / imagesx($img);
  $height = imagesy($img) * $ratio;
  return(imgresize($img,$width,$height));
}



//--------------------------------------------------------------------------------------

$src=imagecreatefrompng($file);
$dest=imgresizew($src,$width);

//echo($dest);


imagesavealpha($dest, true);
header('Content-Type: image/png');
imagepng($dest);





?>
