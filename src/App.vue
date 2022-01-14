<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    window.messagePump = {
      listeners: {},
      sendMessage(t, m){
        console.log("INCOMING MESSAGE: ", t, m)
        if (this.listeners[t]){
          this.listeners[t].forEach(l => l(m))
        }
      },
      registerListener(t,f) {
        if (!(t in this.listeners)) {
          this.listeners[t] = [];
        }
        this.listeners[t].push(f);
      }
    }
  }
}
</script>

<style lang="scss">

@font-face {
  font-family: 'Pexico';
  src: url('~@/assets/fonts/Pexico-Regular.woff2') format('woff2'),
  url('~@/assets/fonts/Pexico-Regular.woff') format('woff'),
  url('~@/assets/fonts/Pexico-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

@font-face {
  font-family: 'Pexico';
  src: url('~@/assets/fonts/Pexico-Bold.woff2') format('woff2'),
  url('~@/assets/fonts/Pexico-Bold.woff') format('woff'),
  url('~@/assets/fonts/Pexico-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: block;
}


div {
}

#app {
  font-family: 'Pexico', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
}
#nav {
  padding: 0;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
