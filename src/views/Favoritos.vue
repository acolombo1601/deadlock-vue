<script setup>
import ContenedorCards from '@/components/ContenedorCards.vue';
import { onMounted } from "vue"
import { useFavoritos } from "@/composable/useFavoritos"

const { cargarFavoritos, favoritos } = useFavoritos()

onMounted(() => {
    cargarFavoritos()
})
</script>

<template>
    <main class="container flex-grow-1 py-4 py-md-5">
        <header class="text-center mb-4 mb-md-5">
            <h2 class="titulo mb-3">Mis favoritos</h2>
            <p v-if="favoritos.length > 0" class="text-secondary fs-5 mb-0">
                {{ favoritos.length }} {{ favoritos.length == 1 ? 'héroe guardado' : 'héroes guardados' }}
            </p>
        </header>

        <section v-if="favoritos.length > 0" class="escenario py-4 py-md-5">
            <ContenedorCards :heroes="favoritos"></ContenedorCards>
        </section>

        <section v-else class="vacio text-center mx-auto">
            <p class="fs-4 fw-semibold mb-2">Todavía no tenés héroes favoritos</p>
            <p class="text-secondary mb-4">
                Explora los héroes disponibles y agrega los que más te gusten.
            </p>
            <RouterLink to="/" class="btn etiqueta etiqueta-fija boton-etiqueta position-relative d-inline-block py-3 px-4 text-center text-black fw-bold">Ver héroes</RouterLink>
        </section>
    </main>
</template>