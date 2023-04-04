<template>
  <div class="background">
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.background {
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(white 50%, rgba(255, 47, 161, 0.973) );
}
</style>
