
/**
 * @param {string[]} paginas
 */
export function resaltaSiEstasEn(paginas) {
 const pathname = location.pathname
 return paginas.includes(pathname) ? `class="active"` : ""
}