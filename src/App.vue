<script setup>
import { RouterView } from 'vue-router';

</script>

<template>
  <div class="fondo min-vh-100 d-flex flex-column text-white" data-bs-theme="dark">

    <!-- Nav -->
    <nav class="nav-principal navbar">
      <div class="container">
        <h1 class="m-0">
          <RouterLink to="/" class="d-inline-block">
            <img src="./img/logo-completo.svg" alt="Deadlock" class="logo">
          </RouterLink>
        </h1>
        <ul class="navbar-nav flex-row gap-3 gap-md-4">
          <li class="nav-item"><RouterLink to="/favoritos" class="nav-link">Favoritos</RouterLink></li>
          <li class="nav-item"><a class="nav-link" href="#">Recomendador</a></li>
        </ul>
      </div>
    </nav>

    <!-- Contenido -->
    <RouterView></RouterView>

    <!-- Footer -->
    <footer class="pie py-4 text-center text-secondary small">
      <div class="container">
        Proyecto con datos de la API no oficial de Deadlock.
      </div>
    </footer>

  </div>
</template>

<style scoped></style>
