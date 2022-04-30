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
        <button @click="clearCache" class="smallButton">Clear Cache</button>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { sanitizeGameData } from '../assets/js/sanitizer'

    const emit = defineEmits(['loadGame'])
    const props = defineProps(['cacheDataMinutes'])
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

    function fetchData () {
        //localStorage.clear() 
        var cachedData = getCache()
        if (cachedData == null) {
            console.log('getting data from internet')
            fetchDataFromInternet()
        }
        else {
            console.log('getting data from cache')
            data.value = cachedData
        }
    }

    function setCache(gameData) {
        if (!gameData) {
            return
        }
        console.log('caching game data')
        localStorage.setItem('data', JSON.stringify(gameData))
        localStorage.setItem('expires', addMinutes(props?.cacheDataMinutes ?? 5).toString())
    }

    function getCache() {
        var data = localStorage.getItem('data')
        var expires = localStorage.getItem('expires') 
        if (!data || !expires || Date.parse(expires) < Date.now()) {
            console.log('clearing cache', expires)
            clearCache()
            return null
        }
        return JSON.parse(data)
    }

    function clearCache() {
        console.log('cache cleared')
        localStorage.clear()
    }

    function fetchDataFromInternet() {
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
            setCache(json.record)
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

    function addMinutes(minutes) {
        var now = new Date
        return new Date(now.getTime() + minutes*60000);
    }

</script>

<style scoped>

    .gameButton {
        min-width: 80%;
    }

</style>