

<template>
  <div>
    <header>
      <h1>Word Game</h1>
    </header>

    <main>
      <Game />
    </main>
  </div>
</template>

<script setup>
  import Game from './components/Game.vue';

  //const text = ref('')


</script>

<style>
  @import './assets/base.css';

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
