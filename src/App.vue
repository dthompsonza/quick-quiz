<template>
  <div>
    <img class="mainLogo" src="./assets/img/quickquizlogo.jpg" width="350" height="150"/>

    <main>
      <GameList v-if="!isGameLoaded"
        :cache-data-minutes="10"
        @load-game="loadGame"/>

      <Game v-if="isGameLoaded" 
        :game-setup="gameData" 
        @unload-game="unloadGame" />
    </main>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Game from './components/Game.vue'
  import GameList from './components/GameList.vue'

  const isGameLoaded = ref(false)
  const gameData = ref(null)

  function loadGame(emitGameData) {
    if (isGameLoaded.value || !emitGameData) {
      return
    }
    gameData.value = emitGameData
    isGameLoaded.value = true
  }

  function unloadGame() {
    isGameLoaded.value = false
    gameData.value = null
  }

</script>

<style>
  @import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
  @import './assets/style/base.css';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000;
    margin-top: 60px;
  }

  h1 {
    border-bottom: 1px solid #ddd;
  }
  
  h1, h2, h3 {
    
    display: inline-block;
    padding-bottom: 10px;
  }

  button {
    padding: 10px;
    margin: 5px;
    margin-bottom: 15px;
  }

</style>
