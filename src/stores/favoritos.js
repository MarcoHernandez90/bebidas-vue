import { defineStore } from "pinia"
import { useBebidasStore } from "./bebidas"
import { computed, onMounted, ref, watch } from "vue"
import { useNotificacionStore } from "../stores/notificacion"

export const useFavoritosStore = defineStore('favoritos', () => {
  const bebidas = useBebidasStore()
  const notificacion = useNotificacionStore()
  const favoritos = ref([])

  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
  })

  watch(favoritos, () => {
    sincronizarLocarStorage()
  }, {
    deep: true
  })

  function sincronizarLocarStorage() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
  }

  function existeFavorito() {
    const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
    return favoritosLocalStorage.some(favorito => favorito.idDrink === bebidas.receta.idDrink)
  }

  function eliminarFavorito() {
    favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink)
    notificacion.mostrar = true
    notificacion.texto = 'Eliminado de favoritos'
  }

  function agregarFavorito() {
    favoritos.value.push(bebidas.receta)
    notificacion.mostrar = true
    notificacion.texto = 'Se agregó a favoritos'
  }

  function handleClickFavorito(e) {
    if (existeFavorito(bebidas.receta.idDrink)) {
      eliminarFavorito()
      e.target.textContent = 'Agregar a Favoritos'
    } else {
      agregarFavorito()
      e.target.textContent = 'Eliminar de Favoritos'
    }
  }

  const noFavoritos = computed(() => favoritos.value.length === 0)

  return {
    favoritos,
    handleClickFavorito,
    existeFavorito,
    noFavoritos,
  }
})