<script setup>
import ContenedorCards from '@/components/ContenedorCards.vue';
import HayError from '@/components/HayError.vue'
import { ref, watch, onMounted } from 'vue'

const heroes = ref([]);
const ranking = ref([]);
const heroesRank = ref([]);
const heroesFiltrados = ref([]);

const busqueda = ref('');
const rol = ref('');
const dificultad = ref('');
const verTodos = ref(false);
const hayFiltros = ref(false);

const error = ref(false);
const loading = ref(true);


const fetchHeroes = (uri = 'https://api.deadlock-api.com/v1/assets/heroes?language=spanish') => {
    return fetch(uri)
        .then((res) => res.json())
        .then((data) => {
            heroes.value = data.filter(item => item.player_selectable);
        })
        .catch((err) => {
            error.value = true;
            console.log(err);
        })

}

const fetchRank = (uri = 'https://api.deadlock-api.com/v1/analytics/hero-stats') => {
    fetch(uri)
        .then((res) => res.json())
        .then((data) => {
            ranking.value = data.sort((a, b) => (b.wins * 100 / b.matches) - (a.wins * 100 / a.matches));
            heroesRank.value = ranking.value.map((rank) => heroes.value.find((heroe) => heroe.id == rank.hero_id));
        })
        .catch((err) => {
            heroesRank.value = heroes.value;
            console.log(err);
        })
}

onMounted(async () => {
    try {
        await fetchHeroes();
        await fetchRank();
    } finally {
        loading.value = false;
    }
})

watch(
    [busqueda, rol, dificultad, verTodos, heroesRank],
    () => {
        hayFiltros.value = busqueda.value.trim() !== '' || rol.value !== '' || dificultad.value !== '';

        const lista = heroesRank.value
            .filter((heroe) => heroe.name.toLowerCase().includes(busqueda.value.toLowerCase().trim()))
            .filter((heroe) => !rol.value || heroe.hero_type == rol.value)
            .filter((heroe) => !dificultad.value || heroe.complexity == dificultad.value);

        if (!hayFiltros.value && !verTodos.value) {
            heroesFiltrados.value = lista.slice(0, 8);
        } else {
            heroesFiltrados.value = lista;
        }
    }
)

</script>

<template>
    <HayError v-if="error" titulo="No hay conexión" mensaje="Verifique su conexión a internet e intentelo más tarde."
        texto-boton="Reintentar"></HayError>
    <main v-else class="container flex-grow-1 py-4 py-md-5">
        <div class="text-center mb-4 mb-md-5">
            <h2 class="titulo mb-3">Héroes de Deadlock</h2>
            <p class="text-secondary fs-5 mb-0">Buscá por nombre o filtrá por rol y dificultad.</p>
        </div>

        <!-- Buscador -->
        <form class="panel-busqueda row g-2 mx-auto mb-4 mb-md-5" @submit.prevent>
            <div class="col-12 col-lg-6">
                <input v-model="busqueda" class="form-control" placeholder="Buscar por nombre"
                    aria-label="Buscar por nombre">
            </div>
            <div class="col-12 col-sm-6 col-lg-3">
                <select v-model="rol" class="form-select" aria-label="Filtrar por rol">
                    <option selected value="">Seleccionar rol</option>
                    <option value="assassin">Asesino</option>
                    <option value="brawler">Luchador</option>
                    <option value="marksman">Tirador</option>
                    <option value="mystic">Místico</option>
                </select>
            </div>
            <div class="col-12 col-sm-6 col-lg-3">
                <select v-model="dificultad" class="form-select" aria-label="Filtrar por dificultad">
                    <option selected value="">Seleccionar dificultad</option>
                    <option value="1">Baja</option>
                    <option value="2">Media</option>
                    <option value="3">Alta</option>
                    <option value="4">Muy alta</option>
                </select>
            </div>
        </form>
        <div v-if="!loading">
            <!-- Cards -->
            <section class="py-4 py-md-5">
                <ContenedorCards :heroes="heroesFiltrados"></ContenedorCards>
                <p v-if="heroesFiltrados.length == 0" class="text-center fs-3 text-secondary mt-4 mb-0 fw-semibold">No hay héroes que coincidan con los filtros.</p>

                <!-- Botón ver todos-->
                <div v-if="!hayFiltros" class="text-center mt-4">
                    <button type="button"
                        class="etiqueta etiqueta-fija boton-etiqueta position-relative d-inline-block py-3 px-4 text-nowrap text-center text-black fw-bold"
                        @click="verTodos = !verTodos">
                        {{ verTodos ? 'Ver top 8' : 'Ver todos los héroes' }}
                    </button>
                </div>
            </section>
        </div>
        <div v-else class="d-flex flex-column align-items-center justify-content-center gap-3 py-5 my-5">
            <div class="spinner-border cargando"></div>
            <p class="text-secondary mb-0">Cargando héroes...</p>
        </div>
    </main>
</template>
