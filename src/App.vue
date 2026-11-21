<script setup>
import { RouterView } from 'vue-router';
import { RouterLink } from 'vue-router';
import { KeepAlive, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(() => route.path, () => {
  const menu = document.getElementById('menu-principal')
  if (menu.classList.contains('show')) {
    document.querySelector('.navbar-toggler').click()
  }
})

</script>

<template>
  <div class="fondo min-vh-100 d-flex flex-column text-white" data-bs-theme="dark">

    <!-- Nav -->
    <nav class="nav-principal navbar navbar-expand-md" data-bs-theme="dark">
      <div class="container">
        <h1 class="m-0">
          <RouterLink to="/" class="navbar-brand m-0 d-inline-block">
            <img src="./img/logo-completo.svg" alt="Deadlock" class="logo">
          </RouterLink>
        </h1>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu-principal"
          aria-controls="menu-principal" aria-expanded="false" aria-label="Abrir menú">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menu-principal">
          <ul class="navbar-nav ms-auto gap-md-4">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">Héroes</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/favoritos" class="nav-link">Favoritos</RouterLink>
            </li>
          </ul>
        </div>

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
