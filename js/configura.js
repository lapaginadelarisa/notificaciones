/** Barra de navegación. */
import "./nav-drw.js"
import "./nav-tab-scrollable.js"
import "./nav-tab-fixed.js"
import "./nav-bar.js"
/** Elementos utilizados */
import "../lib/js/custom/md-menu-button.js"
import "../lib/js/custom/md-options-menu.js"
import "../lib/js/custom/md-overflow-button.js"
import "../lib/js/custom/md-overflow-menu.js"
import "../lib/js/custom/md-select-menu.js"
import "../lib/js/custom/md-top-app-bar.js"
import "../lib/js/custom/md-slider-field.js"
import {
 registraServiceWorkerSiEsSoportado
} from "../lib/js/registraServiceWorkerSiEsSoportado.js"

registraServiceWorkerSiEsSoportado("sw.js")

/* Evita los cambios de apariencia al cargar estilos y custom elements, que
 * son conocidos como Flash Of Unstyled Content (fouc). */
addEventListener("load", () => document.body.classList.add("fouc"))