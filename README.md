# Héroes de Deadlock

Aplicación web hecha con Vue 3 y Vite para ver, buscar y guardar en favoritos a los héroes de Deadlock. Incluye un recomendador con IA.

Trabajo Práctico – Segundo Parcial.

## Integrantes

- Abril Colombo

## Tema y API

**Tema:** Héroes del juego Deadlock.

**API:** [Deadlock API](https://api.deadlock-api.com/docs). Endpoints usados:

- `/v1/assets/heroes` Trae el listado de héroes
- `/v1/assets/heroes/{id}` Trae la información de un héroe en particular.
- `/v1/assets/items/by-hero-id/{id}` Trae las habilidades de un héroe en particular.
- `/v1/analytics/hero-stats` Trae las estadísticas para armar el top de la página de inicio.


## Funcionalidades

- Inicio con el top 8 de héroes por tasa de victorias y botón para ver todos.
- Búsqueda por nombre y filtros por rol y dificultad. Se guardan en la URL, así que se mantienen al recargar o compartir el link.
- Detalle de cada héroe en `/detalle/:id`.
- Favoritos en `/favoritos`, guardados en `localStorage`. Se pueden agregar y quitar.
- Estados de carga y de error con opción de reintentar.
- Diseño mobile first con Bootstrap.
- Recomendador con IA.

## Instalación

Requiere Node.js 22.18 o superior.

```sh
npm install
npm run dev
```

La aplicación queda disponible en http://localhost:5173.

## Inteligencia artificial

Se usa [OpenRouter](https://openrouter.ai/) con el modelo `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free`.

Es un asistente que recomienda héroes a partir de un pedido en texto libre (por ejemplo, "quiero un héroe fácil de jugar"). Usa como contexto los héroes que la aplicación ya cargó: nombre, estilo de juego, rol, dificultad y palabras que lo describen.

