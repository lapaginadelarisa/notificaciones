const VERSION = "5.00"
const CACHE = "pwamd"
const URL_SERVIDOR = "https://notipush.rf.gd"

const ARCHIVOS = [
  "ayuda.html",
  "index.html",
  "css/estilos.css",
  "img/maskable_icon.png",
  "img/maskable_icon_x48.png",
  "img/maskable_icon_x72.png",
  "img/maskable_icon_x96.png",
  "img/maskable_icon_x144.png",
  "img/maskable_icon_x192.png",
  "img/screenshot_horizontal.png",
  "img/screenshot_vertical.png",
  "js/configura.js",
  "js/nav-bar.js",
  "js/nav-drw.js",
  "js/nav-tab-fixed.js",
  "js/nav-tab-scrollable.js",
  "lib/css/colors.module.css",
  "lib/css/elevation.css",
  "lib/css/md-cards.css",
  "lib/css/md-fab-primary.css",
  "lib/css/md-filled-button.css",
  "lib/css/md-filled-text-field.css",
  "lib/css/md-list.css",
  "lib/css/md-menu.css",
  "lib/css/md-navigation-bar.css",
  "lib/css/md-outline-button.css",
  "lib/css/md-ripple.css",
  "lib/css/md-segmented-button.css",
  "lib/css/md-slider-field.css",
  "lib/css/md-standard-icon-button.css",
  "lib/css/md-switch.css",
  "lib/css/md-tab.css",
  "lib/css/md-top-app-bar.css",
  "lib/css/motion.css",
  "lib/css/roboto.css",
  "lib/css/shape.css",
  "lib/css/state.css",
  "lib/css/theme.dark.css",
  "lib/css/theme.light.css",
  "lib/css/typography.css",
  "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
  "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
  "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
  "lib/fonts/roboto-v32-latin-regular.woff2",
  "lib/js/abreElementoHtml.js",
  "lib/js/cierraElementoHtmo.js",
  "lib/js/getAttribute.js",
  "lib/js/htmlentities.js",
  "lib/js/muestraError.js",
  "lib/js/muestraTextoDeAyuda.js",
  "lib/js/ProblemDetails.js",
  "lib/js/querySelector.js",
  "lib/js/registraServiceWorkerSiEsSoportado.js",
  "lib/js/resaltaSiEstasEn.js",
  "lib/js/const/ES_APPLE.js",
  "lib/js/custom/md-menu-button.js",
  "lib/js/custom/md-options-menu.js",
  "lib/js/custom/md-overflow-button.js",
  "lib/js/custom/md-overflow-menu.js",
  "lib/js/custom/md-select-menu.js",
  "lib/js/custom/md-slider-field.js",
  "lib/js/custom/md-top-app-bar.js",
  "lib/js/custom/MdNavigationDrawer.js",
  "ungap/custom-elements.js",
 ]

if (self instanceof ServiceWorkerGlobalScope) {
  // Evento de instalación
  self.addEventListener("install", (evt) => {
    console.log("El service worker se está instalando.")
    evt.waitUntil(llenaElCache())
  })

  // Evento fetch para manejar solicitudes de red
  self.addEventListener("fetch", (evt) => {
    if (evt.request.method === "GET") {
      evt.respondWith(buscaLaRespuestaEnElCache(evt))
    }
  })

  // Evento de activación
  self.addEventListener("activate", () => {
    console.log("El service worker está activo.")
  })

  // Manejo de notificaciones push
  self.addEventListener("push", (event) => {
    const notificacion = event.data
    if (notificacion !== null && self.Notification.permission === 'granted') {
      event.waitUntil(muestraNotificacion(notificacion))
    }
  })

  // Manejo de clics en notificaciones
  self.addEventListener("notificationclick", (event) => {
    event.notification.close()
    event.waitUntil(muestraVentana())
  })
}

async function llenaElCache() {
  console.log("Intentando cargar caché:", CACHE)
  const keys = await caches.keys()
  for (const key of keys) {
    await caches.delete(key)
  }
  const cache = await caches.open(CACHE)
  await cache.addAll(ARCHIVOS)
  console.log("Cache cargado:", CACHE)
  console.log("Versión:", VERSION)
}

async function buscaLaRespuestaEnElCache(evt) {
  const cache = await caches.open(CACHE)
  const request = evt.request
  const response = await cache.match(request, { ignoreSearch: true })
  if (response === undefined) {
    return fetch(request)
  } else {
    return response
  }
}

async function muestraNotificacion(notificacion) {
  if (self instanceof ServiceWorkerGlobalScope) {
    const mensaje = notificacion.text()
    await self.registration.showNotification(mensaje)
  }
}

async function muestraVentana() {
  if (self instanceof ServiceWorkerGlobalScope) {
    const clientes = await self.clients.matchAll({ type: "window" })
    for (const cliente of clientes) {
      if (cliente.url.startsWith(URL_SERVIDOR)) {
        return cliente.focus()
      }
    }
    return self.clients.openWindow("/")
  }
}




