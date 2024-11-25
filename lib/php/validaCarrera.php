<?php

require_once __DIR__ . "/BAD_REQUEST.php";
require_once __DIR__ . "/ProblemDetails.php";

function validaCarrera(false|string $carrera)
{

 if ($carrera === false)
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "Falta la carrera.",
   type: "/error/faltacarrera.html",
   detail: "La solicitud no tiene el valor de la carrera."
  );

 $trimCarrera = trim($carrera);

 if ($trimCarrera === "")
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "Carrera en blanco.",
   type: "/error/carreraenblanco.html",
   detail: "Pon texto en el campo carrera.",
  );

 return $trimCarrera;
}
