<template>
  <div id="app" :style="{height: height+'px'}">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      height: 100,
    }
  },
  created() {
    const that = this;
    const resized = () => {
      that.height = window.innerHeight;
      window.scrollTo(0,0);
      document.body.style.height = window.innerHeight+'px';
      Array.from(document.querySelectorAll('.app>div'))
          .forEach(e => e.style.height = window.innerHeight+'px');
    }
    setTimeout(() => {
      document.body.classList.remove('initial');
      document.body.style.height = '100vh';
      document.body.style.minHeight = '100vh';
      window.addEventListener('touchstart', () => setTimeout(resized, 100))
      window.addEventListener('touchend', () => setTimeout(resized, 100))
      window.addEventListener('click', () => setTimeout(resized, 100))
      window.addEventListener('resize', () => setTimeout(resized, 100))
      setTimeout(() => resized(), 100);
    }, 3000);


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
  .test_outer {
    background-color: blue;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

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

  #app {
    height: 50%;
    font-family: 'Pexico', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  img {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }

  body {
    padding: 0;
    margin: 0;
  }
  button {
    user-select: none;
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
