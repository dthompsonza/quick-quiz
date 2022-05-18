<template>
    <div>
        <p v-if="loading">
            Still loading..
        </p>
        <p v-if="error">
            {{ error }}
        </p>
        <div v-if="!loading && data && data.length">
            <div class="tile is-ancestor">
                <div v-for="game of data" class="tile is-parent">
                    <div class="tile box is-child">
                        <p class="title is-5">{{ game.name }}</p>
                        <p v-html="getGameDescription(game)" style="width:50%;" class="do-not-wrap"></p>
                        <button @click="clickPlayGame(game.uniqueid)" class="button  is-success is-pulled-right">Play</button>
                    </div>
                </div>
            </div>
        </div>
        <p>
            <button @click="clearCache" class="button is-small is-rounded">Clear Cache</button>
        </p>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { sanitizeGameData } from '../helpers/gameDataSanitizer'

    const emit = defineEmits(['loadGame'])
    const props = defineProps(['cacheDataMinutes'])
    const loading = ref(false)
    const pointerData = ref(null)
    const data = ref(null)
    const error = ref(null)

    onMounted(async () => fetchData())
    
    function getGameDescription(game) {
        var result = '<b>Questions:</b> ' + game.rules.questionsPerGame + '<br/>'
        
        if (game.metadata?.targetAges?.length > 0) {
            result += '<b>Ages:</b> ' + game.metadata.targetAges.join(', ') + '<br/>'
        }
        if (result.length == 0) {
            return 'No description.'
        }
        return result
    }

    function clickPlayGame(gameId) {
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

    async function fetchData () {
        fetchDataFromInternet()
        return
        //localStorage.clear() 
        var cachedData = getCache()
        if (cachedData == null) {
            console.log('getting data from internet')
            fetchDataFromInternet()
        }
        else {
            console.log('getting data from cache')
            pointerData.value = cachedData
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
        localStorage.removeItem('data')
        localStorage.removeItem('expires')
        console.log('cache cleared')
        window.location.reload();
    }

    function fetchDataPointers() {
        return fetch('./data/public-game-data.json', {
            method: 'get'
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
    }

    function fetchDataFromPointer(pointer) {
        var gameDataPath = `./quiz-assets/${pointer.path}`
        return fetch(gameDataPath, {
            method: 'get'
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
    }

    async function fetchDataFromInternet() {
        loading.value = true
        data.value = []
        var pointers = await fetchDataPointers();
        for (var i = 0; i < pointers.length; i++) {
            var gameData = await fetchDataFromPointer(pointers[i])
            if (gameData !== null) {
                data.value.push(gameData)
            }
        }
        loading.value = false
    }

    function addMinutes(minutes) {
        var now = new Date
        return new Date(now.getTime() + minutes*60000);
    }

</script>

<style scoped>

</style>