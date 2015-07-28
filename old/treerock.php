<?php


//==========================================================================================================================MODEL




function model($res,$s=1,$rot=0,$slnko=1.5,$ciary=0,/*$zburane=0*/$fpfs=1,$hore=0,$onlymodelfile=false,$usercolor=false){
    t('model - start');
    //------------------------------fpfs pro tvar
    $fpfsp=$fpfs;
    $fpfs=pow($fpfs,0.5);
    $d=0.4;
    $fpfs=($fpfs*(1-$d))+$d;

    if($fpfs<=1){
        $zburane=intval((1-$fpfs)*100);//0=normal, 100=zničená budova
        $postavene=0;//0=normal
    }else{
        $zburane=0;//0=normal
        $postavene=ceil(($fpfs-1)*5)*20;//0=normal, 100=lešení
        // PH Provizorně rozděleno na 5 intervalů - aby se nemuselo rendrovat množství modelů.
        // @todo PH Vyřešit lépe
    }



    //--------------------------------------------------------------------------ROCK
    if(substr($res,0,4)=='rock'){
        $file=tmpfile2("model,$res","png","modelrock");


            $s=$s*height2/500;
            $img = imagecreatetruecolor($s*200,$s*380);
            $img2 = imagecreatetruecolor($s*200,$s*380);
            $alpha=  imagecolorallocatealpha($img, 0, 0, 0, 127);
            imagefill($img,0,0,$alpha);
            $alpha=  imagecolorallocatealpha($img2, 0, 0, 0, 127);
            imagefill($img2,0,0,$alpha);
            //imagesavealpha($img2, false);
            imagealphablending($img2, false);

            $maxk=5;
            $posuvx=-5;
            $posuvy=-10;


            $x=0;//0-100
            $y=-50;
            $gr=rand(30,130);
            $lvl=-5;
            $rx=2;
            $ry=2;

            $cx=rand(-10,10);
            $cy=rand(-10,-30);
            $vv=rand(1,8)/10;

            $shade=  imagecolorallocatealpha($img2, 0, 0, 0,0.85*127);

            //$tmpcolors=array();




            $i=50000;while($i>0){$i--;

                $xx=($s*100)+($x*$s);
                $yy=($s*330)+($y*$s*0.5);

                $dist2=sqrt(pow($x-$cx,2)+pow($y-$cy,2));

                $a=(127-$lvl);
                if($a<1)$a=1;if($a>127)$a=127;
                //$a=50;
                //$ii=$gr;
                /*if(!$tmpcolors[$ii]){
                    $tmpcolors[$ii]=  imagecolorallocatealpha($img, $gr, $gr, $gr,$a);
                }
                imagefilledellipse($img, $xx, $yy-$lvl, $rx, $ry, $tmpcolors[$ii]);*/


                $tmpcolor=  imagecolorallocatealpha($img, round($gr/32)*32, round($gr/32)*32, round($gr/32)*32,$a);

                imagefilledellipse($img, $xx+$posuvx, $yy+$posuvy-$lvl, $rx, $ry+($lvl/5), $tmpcolor);
                imagefilledellipse($img2, $xx+$posuvx+($lvl*sqrt(2)*0.4)+4, $yy+$posuvy+($lvl*sqrt(2)*0.1), $rx, $ry+($lvl/5), $shade);



                imagecolordeallocate($img, $tmpcolor);

                $px=$x;$py=$y;
                $x+=rand(-1,1);
                $y+=rand(-1,1);
                $gr+=(rand(-1,1)+2*(-$x+$px))/2;

                $dist1=sqrt(pow($x-$cx,2)+pow($y-$cy,2));

                $distq=$dist1-$dist2;

                $tmp=abs($x-$px)*rand(0,10)*-ceil($distq)+$vv;
                if($tmp>$maxk)$tmp=$maxk;if($tmp<-$maxk)$tmp=-$maxk;
                $lvl+=$tmp;
                $rx+=rand(-1,1);
                $ry+=rand(-1,1);

                $bounds=80;
                if($dist1>$bounds){$x=$px;$y=$py;}
                //if($x<-$bounds+$rx)$x=-$bounds+$rx;if($x>$bounds-$rx)$x=$bounds-$rx;
                //if($y<-$bounds+$ry)$y=-$bounds+$ry;if($y>$bounds-$ry)$y=$bounds-$ry;
                if($gr<30)$gr=30;if($gr>130)$gr=130;
                if($lvl<-5)$lvl=-5;if($lvl>200)$lvl=200;
                if($rx<2)$rx=2;if($rx>11)$rx=11;
                if($ry<2)$ry=2;if($ry>11)$ry=11;

            }
            imagealphablending($img2, true);
            imagecopy($img2, $img,0,0,0,0,imagesx($img2),imagesy($img2));

            imagesavealpha($img2, true);

            imagefilter($img2, IMG_FILTER_COLORIZE,9,0,5);
            imagefilter($img2, IMG_FILTER_CONTRAST,-8);



            imagesavealpha($img2,true);

            header('Content-Type: image/png');
            imagepng($img2);



    }
    //----------------------------------------------------------------------TREE
    /*if(substr($res,0,4)=='tree'){
        $file=tmpfile2("model,$res","png","modeltree");
        if(file_exists($file)){
           $img=imagecreatefrompng($file);
           imagealphablending($img,true);
           imagesavealpha($img,true);
           return($img);
       }else{
           r('create new rock');
           $s=$s*height2/500;
           $img = imagecreatetruecolor($s*200,$s*380);
           $img2 = imagecreatetruecolor($s*200,$s*380);
           $alpha=  imagecolorallocatealpha($img, 0, 0, 0, 127);
           imagefill($img,0,0,$alpha);
           $alpha=  imagecolorallocatealpha($img2, 0, 0, 0, 127);
           imagefill($img2,0,0,$alpha);
           //imagesavealpha($img2, false);
           imagealphablending($img2, false);

           $maxk=5;
           $posuvx=-5;
           $posuvy=-10;


           $x=0;//0-100
           $y=-50;
           $gr=0;//rand(30,130);
           $lvl=0;
           $rx=rand(5,10);
           $ry=rand(5,10);
           $parts=50000;

           $cd=30;$cd2=20;
           $ra=120+rand(-$cd,$cd);$rb=20+rand(-$cd,$cd);
           $ga=50+rand(-$cd,$cd);$gb=160+rand(-$cd,$cd);
           $ba=20+rand(-$cd,$cd);$bb=50+rand(-$cd,$cd);


           $cx=rand(-10,10);
           $cy=rand(-10,-30);
           $vv=rand(1,8)/10;
           $ss=rand(15,30)/100;
           $tt=rand(7,20)/10;

           $shade=  imagecolorallocatealpha($img2, 0, 0, 0,0.85*127);

           //$tmpcolors=array();

           $i=$parts;while($i>0){$i--;

               $xx=($s*100)+($x*$s*$ss);
               $yy=($s*330)+($y*$s*0.5*$ss);

               $dist2=sqrt(pow($x-$cx,2)+pow($y-$cy,2));

               $a=(127-($lvl/2));
               if($a<1)$a=1;if($a>127)$a=127;
               //$a=50;
               //$ii=$gr;


               $r=$ra+($gr*($rb-$ra));
               $g=$ga+($gr*($gb-$ga));
               $b=$ba+($gr*($bb-$ba));
               $r+=rand(-$cd2,$cd2);
               $g+=rand(-$cd2,$cd2);
               $b+=rand(-$cd2,$cd2);
               if($r<0)$r=0;if($r>255)$r=255;
               if($g<0)$g=0;if($g>255)$g=255;
               if($b<0)$b=0;if($b>255)$b=255;

               $tmpcolor=  imagecolorallocatealpha($img, round($r), round($g), round($b),$a);

               imagefilledellipse($img, $xx+$posuvx, $yy+$posuvy-($lvl*$ss), $rx, $ry+(($lvl*$ss)/5), $tmpcolor);
               imagefilledellipse($img2, $xx+$posuvx+($lvl*$ss*sqrt(2)*0.4)+4, $yy+$posuvy+($lvl*$ss*sqrt(2)*0.1), $rx, $ry+(($lvl*$ss)/5), $shade);



               imagecolordeallocate($img, $tmpcolor);

               $px=$x;$py=$y;
               $x+=rand(-1,1);
               $y+=rand(-1,1);
               $gr+=1/$parts;

               $dist1=sqrt(pow($x-$cx,2)+pow($y-$cy,2));

               $distq=$dist1-$dist2;

               $tmp=abs($x-$px)*rand(0,10)*-ceil($distq)+$vv;
               if($tmp>$maxk)$tmp=$maxk;if($tmp<-$maxk)$tmp=-$maxk;
               $lvl+=$tmp+$tt;
               $rx+=rand(-1,1);
               $ry+=rand(-1,1);

               $bounds=80;
               if($dist1>$bounds){$x=$px;$y=$py;}
               //if($x<-$bounds+$rx)$x=-$bounds+$rx;if($x>$bounds-$rx)$x=$bounds-$rx;
               //if($y<-$bounds+$ry)$y=-$bounds+$ry;if($y>$bounds-$ry)$y=$bounds-$ry;
               //if($gr<30)$gr=30;if($gr>130)$gr=130;
               if($lvl<-5)$lvl=-5;if($lvl>200)$lvl=200;
               if($rx<2)$rx=2;if($rx>7)$rx=7;
               if($ry<2)$ry=2;if($ry>7)$ry=7;

           }
           imagealphablending($img2, true);
           imagecopy($img2, $img,0,0,0,0,imagesx($img2),imagesy($img2));

           imagesavealpha($img2, true);
           ImagePng($img2,$file);
           chmod($file,0777);
           return($img2);
       }
   }*/


}





?>