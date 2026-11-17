<script setup>

import { ref, onMounted, computed } from 'vue'
import { useFavoritos } from '@/composable/useFavoritos';
import { useRoute } from 'vue-router'

const { cargarFavoritos, favoritos, esFavorito, agregarFavoritos } = useFavoritos()

const route = useRoute();

const heroe = ref();
const habilidades = ref([]);

const fetchHeroe = (uri = `https://api.deadlock-api.com/v1/assets/heroes/${route.params.id}`) => {
    fetch(uri)
        .then((res) => res.json())
        .then((data) => {
            heroe.value = data;
        })
        .catch((err) => console.log(err))
}

const fetchHabilidades = (uri = `https://api.deadlock-api.com/v1/assets/items/by-hero-id/${route.params.id}`) => {
    fetch(uri)
        .then((res) => res.json())
        .then((data) => {
            habilidades.value = data.filter((item) => item.ability_type == 'ultimate' || item.ability_type == 'signature');
        })
        .catch((err) => console.log(err))
}

const limpiarLore = (texto) => {
    return texto.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
}

onMounted(() => {
    fetchHeroe();
    fetchHabilidades();
    cargarFavoritos()
})

const verificarFavorito = computed(() => {
    return esFavorito(heroe.value.id)
})


</script>

<template>
    <main class="container flex-grow-1 py-4 py-md-5">
        <div v-if="heroe" class="row g-5 align-items-center">

            <!-- Info -->
            <div class="col-12 col-lg-6 d-flex flex-column">
                <img :src="heroe.images.name_image" :alt="heroe.name" class="nombre-heroe d-block mb-4">

                <p class="lore mb-5">{{ limpiarLore(heroe.description.lore) }}</p>

                <h2 class="h4 mb-3">Habilidades</h2>
                <div class="row row-cols-1 row-cols-sm-2 g-3">
                    <div v-for="habilidad in habilidades" class="col d-flex align-items-center gap-3">
                        <div class="habilidad-icono">
                            <img :src="habilidad.image" :alt="habilidad.name">
                        </div>
                        <p class="fw-semibold">{{ habilidad.name }}</p>
                    </div>
                </div>

                <button type="button" @click="agregarFavoritos(heroe)"
                    class="etiqueta etiqueta-fija boton-etiqueta position-relative d-inline-block my-5 py-3 px-4 text-nowrap text-center text-black fw-bold">
                    <template v-if="verificarFavorito">Quitar</template><template v-else>Agregar</template> a favoritos
                </button>
            </div>

            <!-- Imagen -->
            <div class="col-12 col-lg-6 text-center">
                <div class="position-relative d-inline-block">
                    <img :src="`/heroes-img/${heroe.name.replaceAll('&', 'and').replaceAll(' ', '_')}.webp`"
                        :alt="heroe.name" class="heroe-img d-block img-fluid border border-1 border-white">

                    <div
                        class="position-absolute bottom-0 start-0 w-100 d-flex flex-wrap justify-content-center gap-3 pb-4">
                        <p v-for="palabra in heroe.tags"
                            class="etiqueta etiqueta-fija position-relative m-0 py-2 px-4 text-nowrap text-center text-black fw-bold">
                            {{ palabra }}</p>
                    </div>
                </div>
            </div>

        </div>

    </main>
</template>