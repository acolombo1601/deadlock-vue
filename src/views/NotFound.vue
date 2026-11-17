<script setup>
    import HayError from '@/components/HayError.vue'

</script>

<template>
    <main class="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <HayError codigo="404" titulo="Esta página no existe" mensaje="La dirección que escribiste no existe o fue movida." texto-boton="Volver al inicio"></HayError>
    </main>
</template>