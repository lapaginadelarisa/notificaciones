<?php

require_once __DIR__ . "/BAD_REQUEST.php";
require_once __DIR__ . "/ProblemDetails.php";

function validaCuatrimestre(false|string $cuatrimestre)
{

 if ($cuatrimestre === false)
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "Falta el cuatrimestre.",
   type: "/error/faltacuatrimestre.html",
   detail: "La solicitud no tiene el valor de cuatrimestre."
  );

 $trimCuatrimestre = trim($cuatrimestre);

 if ($trimCuatrimestre === "")
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "Cuatrimestre en blanco.",
   type: "/error/cuatrimestreenblanco.html",
   detail: "Pon texto en el campo cuatrimestre.",
  );

 return $trimCuatrimestre;
}
