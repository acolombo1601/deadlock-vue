<script setup>
import { ref, computed, watch, nextTick } from 'vue';
const historial = ref([])
const abierto = ref(false)
const cargando = ref(false)
const error = ref('')
const lista = ref(null)

const props = defineProps(["heroes"])

const MSG_LIMITE = 'Se alcanzó el límite de uso de la IA. Probá de nuevo en unos minutos.'
const MSG_ERROR = 'No pudimos obtener una respuesta. Revisá tu conexión e intentá de nuevo.'

//El recomendador daba error con el array entero de héroes, por eso el resumen.
const resumenHeroes = computed(() => props.heroes.map((h) => ({
    nombre: h.name,
    estiloJuego: h.description.playstyle,
    genero: h.gender,
    rol: h.hero_type,
    dificultad: h.complexity,
    palabras: h.tags,
})))

async function recomendar(event) {
    const mensaje = event.target.mensaje.value.trim()
    if (!mensaje || cargando.value) return
    event.target.reset()
    historial.value.push({ role: "user", content: mensaje })
    await enviar()
}

async function enviar() {
    cargando.value = true
    error.value = ''
    try {
        //La API-KEY esta en un txt separado.
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer [API-KEY]`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
                "messages": [
                    {
                        "role": "system",
                        "content": `Sos el recomendador de una página web sobre los héroes de Deadlock. Tu única tarea es recomendar héroes según lo que pida el usuario.
                                DATOS: Al final de estas instrucciones tenés la lista de héroes en formato JSON. De cada héroe tenés: nombre, estiloJuego (cómo se juega), genero, rol, dificultad, palabras (tres palabras que lo describen).
                                REGLAS:
                                - Usá únicamente los datos de esa lista. No uses lo que sepas del juego por tu cuenta ni información de internet.
                                - Si te piden algo que no está en los datos (historia, estadísticas, parches, habilidades), decí que no tenés esa información. No lo inventes.
                                - Recomendá solo héroes de la lista y escribí sus nombres tal cual aparecen.
                                - Si el mensaje es muy corto o vago (por ejemplo una sola palabra), interpretalo como una búsqueda y recomendá de 2 a 3 héroes que encajen con esa palabra, o con variedad si no encaja ninguno.
                                - Si el mensaje no tiene que ver con elegir o conocer héroes, respondé que solo podés ayudar a elegir un héroe.
                                - Podés usar lo que se dijo antes en la conversación para entender a qué se refiere el usuario.

                                FORMATO:
                                - Respondé siempre en español, con oraciones completas y en texto plano. No uses markdown, listas, asteriscos ni emojis.
                                - Escribí entre 2 y 4 oraciones, con un máximo de 80 palabras.
                                - Nombrá cada héroe que recomiendes y justificalo con sus datos (estilo de juego, rol, dificultad o palabras).

                                LISTA DE HÉROES: ${JSON.stringify(resumenHeroes.value)}`
                    },
                    ...historial.value
                ],
                "reasoning": { "enabled": false }
            })
        });

        if (!response.ok) {
            error.value = response.status == 429 ? MSG_LIMITE : MSG_ERROR
            return
        }

        const result = await response.json();
        const respuesta = result.choices[0].message.content
        if (!respuesta) {
            error.value = MSG_ERROR
            return
        }
        historial.value.push({ role: "assistant", content: respuesta })
    } catch {
        error.value = MSG_ERROR
    } finally {
        cargando.value = false
    }
}

watch([() => historial.value.length, cargando, error], () => {
    nextTick(() => {
        if (lista.value) lista.value.scrollTop = lista.value.scrollHeight
    })
})

</script>

<template>
    <button v-if="!abierto" type="button" @click="abierto = true" class="btn btn-acento fw-semibold px-4 position-fixed bottom-0 end-0 m-3 z-3 shadow-lg">
        Recomendador
    </button>

    <div v-else
        class="panel-chat card rounded-3 position-fixed bottom-0 end-0 m-3 z-3 shadow-lg col-11 col-sm-7 col-md-5 col-lg-4 col-xl-3">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h2 class="h5 fw-bold mb-0">Recomendador</h2>
            <button type="button" @click="abierto = false" aria-label="Cerrar"
                class="btn-close btn-close-white"></button>
        </div>

        <div class="card-body">
            <p v-if="historial.length == 0" class="text-secondary small text-center">Pregunta sobre los héroes.</p>
            <div v-else ref="lista" class="mensajes overflow-y-auto d-flex flex-column gap-2">
                <div v-for="mensaje in historial" :class="mensaje.role == 'user'
                    ? 'bg-body-secondary align-self-end'
                    : 'bg-info-subtle text-info-emphasis border border-info-subtle align-self-start'"
                    class="rounded-3 py-2 px-3 small lh-base text-break">
                    {{ mensaje.content }}
                </div>
                <div v-if="cargando"
                    class="bg-info-subtle text-info-emphasis border border-info-subtle align-self-start rounded-3 py-2 px-3 small d-flex align-items-center gap-2">
                    <span class="spinner-border spinner-border-sm"></span> Pensando...
                </div>

                <div v-if="error" class="alert alert-danger small mb-0">
                    {{ error }}
                    <button type="button" @click="enviar" class="btn btn-acento btn-sm mt-2 d-block">Reintentar</button>
                </div>
            </div>

            <div class="card-footer">
                <form @submit.prevent="recomendar" class="d-flex gap-2">
                    <input type="text" name="mensaje" placeholder="Escribí tu consulta..." aria-label="Tu consulta"
                        autocomplete="off" :disabled="cargando" class="form-control form-control-sm">
                    <button type="submit" :disabled="cargando"
                        class="btn btn-acento btn-sm fw-semibold px-3">Enviar</button>
                </form>
            </div>

        </div>
    </div>
</template>