<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        
        <a class="navbar-item" href="https://dthompsonza.github.io/quick-quiz">
          <img src="./assets/img/quickquizlogo2.png" alt="The best little quiz tool in town" width="112" height="28">
        </a>

      </div>
    </nav>
  </div>

  <div class="section">
    <div class="container">
      <div class="card">
        <div class="card-image">
          <figure class="image">
            <center>
              <img src="./assets/img/quickquizlogo2.png" class="x-limit-width" v-if="!isGameLoaded"/>
            </center>
          </figure>
        </div>
        <div class="card-content">
          <GameList 
            v-if="!isGameLoaded"
            :cache-data-minutes="10"
            @load-game="loadGame"
          />
          <Game 
            v-if="isGameLoaded" 
            :game-setup="gameData" 
            @unload-game="unloadGame" 
          />
        </div>
      </div>
    </div>
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

</style>
