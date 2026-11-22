<script setup>
import { RouterLink } from 'vue-router'
defineProps(['codigo', 'titulo', 'mensaje', 'textoBoton', 'destino'])

const recargar = () => {
    window.location.reload()
}

</script>

<template>
    <section class="hay-error text-center mx-auto py-5 d-flex flex-column justify-content-center">
        <p v-if="codigo" class="codigo-error mb-2">{{ codigo }}</p>
        <h2 class="h3 fw-bold mb-3">{{ titulo }}</h2>
        <p v-if="mensaje" class="text-secondary mb-4">{{ mensaje }}</p>
        <button v-if="textoBoton == 'Reintentar'" type="button" @click="recargar" class="btn etiqueta etiqueta-fija boton-etiqueta position-relative d-inline-block py-3 px-4 text-center text-black fw-bold">
            {{ textoBoton }}
        </button>
        <RouterLink v-else :to="destino || '/'"
            class="btn etiqueta etiqueta-fija boton-etiqueta position-relative d-inline-block py-3 px-4 text-center text-black fw-bold">
            {{ textoBoton || 'Volver al inicio' }}
        </RouterLink>
    </section>
</template>
