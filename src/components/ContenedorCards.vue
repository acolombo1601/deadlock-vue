<script setup>
    defineProps(['heroes']);
</script>

<template>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 justify-content-center">
        <article v-for="heroe in heroes" class="col d-flex justify-content-center">
            <RouterLink :to="`/detalle/${heroe.id}`" class="contenedor position-relative">
                <div class="capa forma position-absolute top-0 start-0 w-100 h-100">
                    <img :src="`/heroes-img/${heroe.id}.webp`"
                        :alt="heroe.name" class="d-block w-100 h-100 object-fit-cover">
                    <h3 class="etiqueta position-absolute start-50 translate-middle-x m-0 py-3 px-4 text-nowrap text-center text-black fw-bold fs-6">
                        {{ heroe.name }}
                    </h3>
                </div>
                <span class="capa borde position-absolute top-0 start-0 w-100 h-100 pe-none"></span>
            </RouterLink>
        </article>
    </div>
</template>