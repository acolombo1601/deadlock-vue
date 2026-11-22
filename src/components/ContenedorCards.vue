<script setup>
    import { onMounted } from 'vue'
    import { useFavoritos } from '@/composable/useFavoritos'

    defineProps(['heroes']);

    const { cargarFavoritos, esFavorito, agregarFavoritos } = useFavoritos()

    onMounted(() => {
        cargarFavoritos()
    })
</script>

<template>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 justify-content-center">
        <article v-for="heroe in heroes" class="col d-flex justify-content-center">
            <div class="contenedor position-relative">

                <!-- La card entera sigue siendo un link al detalle -->
                <RouterLink :to="`/detalle/${heroe.id}`" class="position-absolute top-0 start-0 w-100 h-100">
                    <div class="capa forma position-absolute top-0 start-0 w-100 h-100">
                        <img :src="`/heroes-img/${heroe.id}.webp`" :alt="heroe.name" class="d-block w-100 h-100 object-fit-cover">
                        <h3 class="etiqueta position-absolute start-50 translate-middle-x m-0 py-3 px-4 text-nowrap text-center text-black fw-bold fs-6">
                            {{ heroe.name }}
                        </h3>
                    </div>
                    <span class="capa borde position-absolute top-0 start-0 w-100 h-100 pe-none"></span>
                </RouterLink>

                <!-- Botón de favorito: blanco con corazón vacío; turquesa con corazón lleno si ya es favorito -->
                <button type="button" @click="agregarFavoritos(heroe)" :class="esFavorito(heroe.id) ? 'btn-acento' : 'btn-light'" class="btn-favs btn rounded-circle border-0 d-flex align-items-center justify-content-center position-absolute top-0 end-0 m-4 z-1 shadow">
                    <i :class="esFavorito(heroe.id) ? 'bi-suit-heart-fill' : 'bi-suit-heart'" class="bi fs-5 lh-1"></i>
                </button>

            </div>
        </article>
    </div>
</template>