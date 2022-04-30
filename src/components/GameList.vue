<template>
    <div>
        <div v-if="!loading && data && data.length">
            <button v-for="game of data" class="gameButton" @click="handlePlayGameClick(game.uniqueid)">
                {{ game.name }} 
            </button> <br/>
        </div>
        <p v-if="loading">
            Still loading..
        </p>
        <p v-if="error">
            {{ error }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { sanitizeGameData } from '../assets/js/sanitizer'

    const emit = defineEmits(['loadGame'])

    const loading = ref(false)
    const data = ref(null)
    const error = ref(null)

    onMounted(() => fetchData())

    function handlePlayGameClick(gameId) {
        if (!data.value) {
            console.error('there is no game data to play', gameId)
            return 
        }

        var gameData = data.value.find(g => g.uniqueid === gameId)
        if (gameData) {
            var sanitizedGameData = sanitizeGameData(gameData)
            emit('loadGame', sanitizedGameData)
        }
    }

    function fetchData() {
        loading.value = true
        return fetch('https://api.jsonbin.io/v3/b/626cea94019db46796939bee/latest', {
            method: 'get',
            headers: {
                'X-Access-Key': '$2b$10$fKv234WnYBujGK07c30S/OtLu41YnOwJIsV3/kr4c4mIK2XX2MmpW'
            }
        })
        .then(res => {
        // a non-200 response code
        if (!res.ok) {
            // create error instance with HTTP status text
            const newError = new Error(res.statusText)
            newError.json = res.json()
            throw newError
        }

        return res.json()
        })
        .then(json => {
            // set the response data
            data.value = json.record // data is sanitized downstream on play click
        })
        .catch(err => {
            error.value = err
            // In case a custom JSON error response was provided
            if (err.json) {
                return err.json.then(json => {
                    // set the JSON response message
                    error.value.message = json.message
                })
            }
        })
        .then(() => {
            loading.value = false
        });
    }
</script>

<style scoped>

    .gameButton {
        min-width: 80%;
    }

</style>