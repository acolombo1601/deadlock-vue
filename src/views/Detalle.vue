<script setup>
import { ref, onMounted, computed } from 'vue'
import { useFavoritos } from '@/composable/useFavoritos';
import HayError from '@/components/HayError.vue'
import { useRoute } from 'vue-router'

const error = ref(false);
const errorHab = ref(false);
const loading = ref(true);
const { cargarFavoritos, favoritos, esFavorito, agregarFavoritos } = useFavoritos()

const route = useRoute();

const heroe = ref();
const habilidades = ref([]);

const fetchHeroe = (uri = `https://api.deadlock-api.com/v1/assets/heroes/${route.params.id}?language=spanish`) => {
    return fetch(uri)
        .then((res) => {
            if (!res.ok) throw new Error()
            return res.json()
        })
        .then((data) => {
            if (!data) {
                error.value = true
                return
            }
            heroe.value = data;
        })
        .catch((err) => {
            console.log(err)
            error.value = true
        })
}

const fetchHabilidades = (uri = `https://api.deadlock-api.com/v1/assets/items/by-hero-id/${route.params.id}?language=spanish`) => {
    return fetch(uri)
        .then((res) => res.json())
        .then((data) => {
            habilidades.value = data.filter((item) => item.ability_type == 'ultimate' || item.ability_type == 'signature');
        })
        .catch((err) => {
            console.log(err);
            errorHab.value = true;
        })
}

const limpiarLore = (texto) => {
    return texto.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
}

onMounted(async () => {
    try {
        await fetchHeroe();;
        await fetchHabilidades();
    } finally {
        loading.value = false;
    }
    ;
    cargarFavoritos()
})

const verificarFavorito = computed(() => {
    return esFavorito(heroe.value.id)
})


</script>

<template>
    <main class="container flex-grow-1 py-4 py-md-5">
        <HayError v-if="error" codigo="404" titulo="No pudimos cargar este héroe"
            mensaje="Puede que no exista o que haya un problema de conexión." texto-boton="Reintentar">
        </HayError>
        <div v-else-if="!loading" class="row g-5 align-items-center">

            <!-- Info -->
            <div class="col-12 col-lg-6 d-flex flex-column">
                <img :src="heroe.images.name_image" :alt="heroe.name" class="nombre-heroe d-block mb-4">

                <p class="lore mb-5">{{ limpiarLore(heroe.description.lore) }}</p>

                <h2 class="h4 mb-3">Habilidades</h2>
                <p v-if="errorHab" class="fst-italic">No se pudo cargar las habilidades</p>
                <div v-else class="row row-cols-1 row-cols-sm-2 g-3">
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
                    <img :src="`/heroes-img/${heroe.id}.webp`" :alt="heroe.name"
                        class="heroe-img d-block img-fluid border border-1 border-white">

                    <div
                        class="position-absolute bottom-0 start-0 w-100 d-flex flex-wrap justify-content-center gap-3 pb-4">
                        <p v-for="palabra in heroe.tags"
                            class="etiqueta etiqueta-fija position-relative m-0 py-2 px-4 text-center text-black fw-bold">
                            {{ palabra }}</p>
                    </div>
                </div>
            </div>

        </div>
        <div v-else class="d-flex flex-column align-items-center justify-content-center gap-3 py-5 my-5">
            <div class="spinner-border cargando"></div>
            <p class="text-secondary mb-0">Cargando héroe...</p>
        </div>
    </main>
</template>
