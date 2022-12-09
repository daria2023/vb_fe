
<template>
  <the-nav></the-nav>
  <router-view></router-view>
</template>

<script>
import TheNav from './components/TheNav.vue';
export default {
  components: {
    TheNav
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
:root {
  --color-red:#e84343;
  --color-yellow: #ead957;
  --color-green: #2ea773;
  --color-blue: #4c47d6;
  --color-gray: #d3d3d3;
}
body {
  background-color: #eee;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
}
#app {
  width: 100%;

}

@media screen and (min-width: 800px) {
  #app {
    width: 800px;
  }
}

</style>