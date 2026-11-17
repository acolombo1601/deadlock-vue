import { ref } from "vue"

const favoritos = ref([])

const cargarFavoritos = () => {
  favoritos.value = JSON.parse(localStorage.getItem('favoritos')) || []
}

const esFavorito = (id) => {
  return favoritos.value.some(character => character.id == id)
}

const agregarFavoritos = (heroe) => {
  if (esFavorito(heroe.id)) {
    favoritos.value = favoritos.value.filter((h) => h.id != heroe.id)
  } else {
    favoritos.value.push(heroe)
  }
  localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
}

export function useFavoritos() {
  return {
    cargarFavoritos,
    favoritos,
    esFavorito,
    agregarFavoritos
  }
}
