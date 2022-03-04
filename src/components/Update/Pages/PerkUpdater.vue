<template>
  <div class="__perk_updater__">

    <h3>Active Blurbs</h3>

    <div class="perk_list_container">
      <div class="perks">
        <button
            v-for="blurb in active_blurbs"
            @click="selected_blurb = blurb.id"
            :key="blurb.id"
            :class="{active: blurb.id===selected_blurb, perk_button:true}">
          <Perk :perk="blurb.perk"  />
        </button>
      </div>
    </div>

    <BorderBox class="blurb" v-if="active_blurb">
        <div class="image">
          <img :src="require(`@/assets/dialogue/${expression_images[active_blurb.pages[active_blurb.current_page].image]}`)" />
        </div>
        <div class="top_left"/>
        <div class="bottom_left">
          <button style="padding-top: 10px; padding-bottom: 10px;" @click="active_blurb.current_page--" v-if="active_blurb.current_page !== 0">&lt;</button>
        </div>
        <div class="blurb_text center">

          {{active_blurb.pages[active_blurb.current_page].text}}
        </div>
        <div class="top_right">
          <button v-on:click='delete_blurb(active_blurb.id)' class="close_button">X</button>
        </div>
        <div class="bottom_right">
          <button style="padding-top: 10px; padding-bottom: 10px;" @click="active_blurb.current_page++" v-if="active_blurb.current_page !== active_blurb.pages.length - 1">&gt;</button>
        </div>
    </BorderBox>

    <h3>New Blurb</h3>

    <div class="perk_list_container">
      <div class="perks">
        <button
            :class="{active: selected_perk===perk, perk_button:true}"
            :key='perk' v-for="perk in perk_list.slice(0,perk_list.length/2)"  v-on:click="() => selected_perk = perk">
          <Perk :perk="perk" />
        </button>
      </div>
      <div class="perks">
        <button
            :class="{active: selected_perk===perk, perk_button:true}"
            :key='perk' v-for="perk in perk_list.slice(perk_list.length/2)"  v-on:click="() => selected_perk = perk">
          <Perk :perk="perk" />
        </button>
      </div>
    </div>


    <div v-for="page in new_blurbs" :key="page.page_no">
        Page {{page.page_no+1}}
        <div class="new_blurb_pages">
          <div v-if="page.expression_picker_open" class="expression_list_container">
              <div class="expressions">
                <button
                    v-for="expression in expressions"
                    @click="page.image = expression[0]; page.expression_picker_open=false;"
                    :key="expression[0]"
                    :class="{active: page.image===expression[0], perk_button:true}">
                  <img :src="require(`@/assets/dialogue/${expression[1]}`)" />
                </button>
              </div>
          </div>
          <div class="new_blurb_row" v-else>
            <BorderButton :border_width="8" @click="page.expression_picker_open = true">
              <img :src="require(`@/assets/dialogue/${expression_images[page.image]}`)" />
            </BorderButton>
            <textarea v-model="page.text" style="flex-grow:1"/>
            <button :disabled="page.page_no === 0" @click="remove_page(page.page_no)">X</button>
          </div>
        </div>
    </div>

    <div class="dialog_bottom" style="display: flex; flex-direction: row; justify-content: center">
      <BorderButton @click="add_page" style="margin-right: 2em;">Add Page</BorderButton>
      <BorderButton @click="save">
        <span style="padding: 5px 40px">Save Blurb</span>
      </BorderButton>
    </div>

  </div>
</template>

<script>

import perks from "../../GUI/perks";
import BorderBox from "../../BorderBox";
import Perk from "../../GUI/Perk";
import AvatarBox from "../../AvatarBox";
import BorderButton from "@/components/BorderButton";
import axios from 'axios';


import expression_images from '@/components/images.js'

export default {
  name: "PerkUpdater",
  data() {
    return {
      selected_blurb: null,
      selected_perk: 'bored',
      active_blurbs: [],
      new_blurbs: [
        { page_no:0, image: 'Neutral_1', text: '', expression_picker_open: false },
      ],
    };
  },
  components: {BorderBox, Perk, AvatarBox, BorderButton},
  computed: {
    perk_list() {
      console.log(Object.keys(perks));
      return Object.keys(perks);
    },
    expressions() {
      return Object.keys(expression_images).map(e => [e, expression_images[e]]);
    },
    expression_images() {
      return expression_images;
    },
    active_blurb() {
      const blurb = this.active_blurbs.find(b => b.id === this.selected_blurb);
      console.log(blurb, this.active_blurbs, this.selected_blurb);
      return blurb;
    }
  },
  mounted() {
    console.log(this.expressions);
    this.get_blurbs();
  },
  methods: {
    remove_page(page_no){
      this.new_blurbs = this.new_blurbs.filter(b => b.page_no !== page_no);
      this.new_blurbs.forEach((e, i) => e.page_no = i);
    },

    add_page() {
      const last_page = this.new_blurbs[this.new_blurbs.length -1];
      this.new_blurbs.push({
        page_no: last_page.page_no + 1,
        image: last_page.image,
        text: '',
        expression_picker_open: false,
      })
    },

    async get_blurbs() {
      const {data} = await axios.get('https://switchbacks.us:5000/blurbs');
      this.active_blurbs = data.map(d => ({
        perk: d.perk,
        id: d.id,
        current_page: 0,
        pages: JSON.parse(d.blurb_text),
      }));
    },

    async delete_blurb(id) {
      await axios.delete(`https://switchbacks.us:5000/blurb/${id}`);
      await this.get_blurbs();
    },

    async save(e){
      const blurb_text = JSON.stringify(this.new_blurbs.map(b => ({
        page_no: b.page_no,
        image: b.image,
        text: b.text,
      })))
      console.log(blurb_text);
      const data = {
        blurb_text: blurb_text,
        perk: this.selected_perk,
      }
      const r = await axios.post('https://switchbacks.us:5000/blurb', data);
      await this.get_blurbs();

      this.new_blurbs = [{ page_no:0, image: 'Neutral_1', text: '', expression_picker_open: false }];
    },
  }
}
</script>

<style lang="scss">
.__perk_updater__ {
  width: 100%;
  .new_blurb_pages {
    display: flex;
    flex-direction: row;
  }
  .expression_container{
    width: 100%;
  }
  .new_blurb_row{
    display: flex;
    flex-direction: row;
    align-items: center;
    width:100%;
    button{
      height: 85px;
    }
  }
  .blurb{
    display: grid;
    grid-template-rows: 30px minmax(30px, auto);
    grid-template-columns: 75px 25px 1fr 25px;
    grid-template-areas:
        "image top_left blurb top_right"
        "image bottom_left blurb bottom_right";
    .bottom_left {grid-area: bottom_left; margin-right: 4px;}
    .bottom_right {grid-area: bottom_right; margin-right: 4px;}
    .top_left {grid-area: top_left; margin-right: 4px;}
    .top_right {grid-area: top_right; margin-right: 4px;}
    .image {grid-area: image; background-color: #5da3b0;}
  }
  .perk {
    background-color: #5da3b0;
    padding: 4px;
    min-width: 40px;
  }
  .blurb_text{
    width: 100%;
  }
  .perk_list_container, .expression_list_container {
    overflow-x: auto;
    background-color: rgba(0,0,0,0.2);
    margin-bottom: 10px;
    .perks, .expressions {
      white-space: nowrap;
      padding-bottom: 5px;
      padding-top: 5px;
      .perk_button {
        background-color: #5da3b0;
        border-radius: 3px;

        border: 2px solid #1b1c47;
        margin: 1px;
        > * {
          filter: grayscale(.6);
          border-color: gray;
        }
      }

      .active:not(.__border_button__) {
        > * {
          filter: none;
          border-color: #ffffff;
        };
        border: 2px solid #a3ff8f;
        background-color: #6ec66e;
      }
      > *{
        cursor: pointer;
      }
    }
    .expressions .perk_button{
      width: 100px;
      height: 80px;
    }
    .perks .perk_button{
      width: 55px;
      height: 55px;
    }
  }
  .x_container{
    height: 26px;
    width: 23px;
  }

  .close_button {
    color: #df7e39;
    transform: scaleX(1.2);
    font-size: 1.3em;
    font-weight: bolder;
    right: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    &:hover{
      color: #ef8b45;
    }
  }
  .side_buttons{
    display: flex;
    flex-direction: column;
    > * {
      height: 100%;
    }
  }
  textarea {
    width: 100%;
    height: 80px;
  }
}
</style>
