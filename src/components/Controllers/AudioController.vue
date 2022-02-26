<template>
  <div class="__audio_controller__">
      <div class="song_display" :class="{visible}">
        <BorderBox class="song_icon" padding="0">
          <img style="height: 75px;" class='icon' src="~@/assets/icons/headphones.png"/>
        </BorderBox>
        <BorderBox dark="true" class="song_info" v-if="active_song">
          <div class="song_title">"{{ active_song.title }}"</div>
          <div class="song_artist">{{ active_song.artist}}</div>
        </BorderBox>

      </div>
  </div>
</template>


<script>
  import {EventBus} from '@/event_bus.js';
  import BorderBox from '@/components/BorderBox';

  const an_echo = 'an_echo';
  const an_echo_clean = 'an_echo_clean';
  const the_grind = 'the_grind';
  const midday_diddle = 'midday_diddle';
  const hare_and_humming_bird = 'hare_and_humming_bird';
  const hare_and_humming_bird_clean = 'hare_and_humming_bird_clean';
  const left_right_left_clean = 'left_right_left_clean';
  const left_right_left = 'left_right_left';
  const pyre_on_the_path = 'pyre_on_the_path';
  const pyre_on_the_path_clean = 'pyre_on_the_path_clean';
  const good_night = 'good_night';
  const wanna_go_home = 'wanna_go_home';
  const rest_day = 'rest_day';


  export const songs = {
    an_echo: {src: '/audio/music/an_echo.mp3', title:'An Echo', artist: 'Alex Moliski'},
    an_echo_clean: {src: '/audio/music/an_echo_clean.mp3', title:'An Echo', artist: 'Alex Moliski'},
    the_grind: {src: '/audio/music/the_grind.mp3', title:'The Grind', artist: 'Alex Moliski'},
    midday_diddle: {src: '/audio/music/midday_diddle.mp3', title:'Midday Diddle', artist: 'Alex Moliski'},
    hare_and_humming_bird: {src: '/audio/music/hare_and_humming_bird.mp3', title:'The Hare and the Hummingbird', artist: 'Alex Moliski'},
    hare_and_humming_bird_clean: {src: '/audio/music/hare_and_humming_bird_clean.mp3', title:'The Hare and the Hummingbird', artist: 'Alex Moliski'},
    left_right_left_clean: {src: '/audio/music/left_right_left_clean.mp3', title:'Left Right Left', artist: 'Alex Moliski'},
    left_right_left: {src: '/audio/music/left_right_left.mp3', title:'Left Right Left', artist: 'Alex Moliski'},
    pyre_on_the_path: {src: '/audio/music/pyre_on_the_path.mp3', title:'Pyre on the Path', artist: 'Alex Moliski'},
    pyre_on_the_path_clean: {src: '/audio/music/pyre_on_the_path_clean.mp3', title:'Pyre on the Path', artist: 'Alex Moliski'},
    good_night: {src: '/audio/music/good_night.mp3', title:'Good Night', artist: 'Alex Moliski'},
    wanna_go_home: {src: '/audio/music/wanna_go_home.mp3', title:'I Wanna Go Home', artist: 'Adam Moliski'},
    rest_day: {src: '/audio/music/rest_day.mp3', title:'Rest Day', artist: 'Alex Moliski'},
  }
  export default {
    name: "AudioController",
    props: ['loading', 'audio_enabled'],
    components: {BorderBox},
    data() {
      return {
        song: null,
        visible: false,
      };
    },
    mounted() {
      EventBus.$on('change_song', (e) => this.change_song(e));
    },
    computed: {
      active_song() {
        return songs[this.desired_song];
      },
      desired_song() {
        const scene = this.$store.getters.active.scene;
        const disposition = this.$store.getters.active.morale;
        switch(scene) {
          case "hike_cades_cove":
          case "hike_green_tunnel":
          case "hike_highlands":
          case "hike_town":
            if (disposition > 80) {
              return hare_and_humming_bird;
            }
            if (disposition > 30) {
              return left_right_left;
            }
            else {
              return wanna_go_home;
            }

          case "hike_cades_cove__dawn_dusk":
          case "hike_green_tunnel__dawn_dusk":
          case "hike_town__dawn_dusk":
          case "hike_highlands__dawn_dusk":
            return midday_diddle;

          case "hike_cades_cove__rainy":
          case "hike_highlands__rainy":
          case "hike_green_tunnel__rainy":
          case "hike_town_rainy":
            return an_echo;

          case "zero_day__rainy":
          case "zero_day":
            return rest_day;


          case "interstitials":
            return left_right_left;
          case "campsite_morning":
            return hare_and_humming_bird;
          case "campsite_evening":
            return pyre_on_the_path;
          case "campsite_evening__rainy":
            return pyre_on_the_path;
          case 'campsite_midnight':
            return an_echo;
        }
        return left_right_left;
      },
    },
    methods: {
      play_song(song_id) {
        const selected_song = songs[song_id];
        this.show_song_popup();
        if (this.song) {
          this.song.pause();
          this.song.remove();
          this.song = null;
        }
        this.song = new Audio();
        this.song.src = selected_song.src;
        this.song.load();
        this.song.loop = true;
        this.song.play();
      },
      show_song_popup(){
        this.visible = true;
        setTimeout(() => this.visible = false, 3000);
      },
      change_song(song_id) {
        this.play_song(songs[song_id]);
      },
    },
    watch: {
      loading() {
        console.log('Audio Controller: ac loaded', !this.loading);
        if (this.audio_enabled && !this.loading){
          this.play_song(this.desired_song);
        }
      },
      desired_song(){
        if (this.audio_enabled && !this.loading){
          this.show_song_popup(this.desired_song);
          this.play_song(this.desired_song);
        }
      },
      audio_enabled(){
        if (this.audio_enabled && !this.loading){
          this.show_song_popup(this.desired_song);
          this.play_song(this.desired_song);
        }
      }
    },
  }
</script>

<style lang="scss">
  .__audio_controller__ {
    pointer-events: none;
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    @media screen and (min-width: 800px) {
      align-items: start;
      margin-left: -33px;
    }
    flex-direction: column;
    justify-content: end;

    .song_display{
      transition: opacity 0.5s;
      opacity: 0;
      pointer-events: none;
      &.visible {
        opacity: 1;
        pointer-events: all;
      }
      transform: scale(.8);
      margin-bottom: 120px;
      display: flex;
      flex-direction: row;
      .song_title {
        font-weight: lighten;
        text-align: start;
        color: #fbefe0;
        font-size: 1.5em;
        margin-bottom: .15em;
        margin-left: .5em;
        font-family: 'Pexico', Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .song_artist {
        font-size: 1.25em;
        margin-left: 1em;
        text-align: start;
        color: #43875b;
        font-family: 'Pexico', Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .song_info {
        margin-left: -12px;
        min-width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
</style>
