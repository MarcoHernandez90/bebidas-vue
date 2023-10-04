import { defineStore } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
import APIService from '../services/APIService'

export const useBebidasStore = defineStore('bebidas', () => {
  const categorias = ref([])
  const busqueda = reactive({
    nombre: '',
    categoria: ''
  })
  const recetas = ref([])

  onMounted(async function() {
    const { data: { drinks } } = await APIService.obtenerCategorias()
    categorias.value = drinks
  })

  async function obtenerRecetas() {
    const { data: { drinks } } = await APIService.buscarRecetas(busqueda)
    console.log("🚀 ~ file: bebidas.js:19 ~ obtenerRecetas ~ data:", drinks)
    recetas.value = drinks
  }

  return {
    categorias,
    busqueda,
    recetas,
    obtenerRecetas
  }
})