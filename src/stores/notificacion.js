import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useNotificacionStore = defineStore('notificacion', () => {
  const texto = ref('')
  const error = ref(false)
  const mostrar = ref(false)

  watch(mostrar, () => {
    if (mostrar.value) {
      setTimeout(() => {
        texto.value = ''
        error.value = false
        mostrar.value = false
      }, 4000)
    }
  })
  
  return {
    texto,
    error,
    mostrar,
  }
})