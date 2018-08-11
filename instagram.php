<?php
$wew = file_get_contents('https://www.instagram.com/permataclinic/');
$wew = preg_match('/<script type="text\/javascript">window._sharedData\s=\s(.*)\;<\/script>/', $wew, $matches);
$img = json_decode($matches[1], true);
$wew = file_put_contents('insta.json', json_encode($img));
var_dump($img);
