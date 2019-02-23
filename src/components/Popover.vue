<template>
  <div class="popover">
    <div class="popover-content" @click="hidePopover" v-touch:swipe.left="backwards" v-touch:swipe.right="forwards">
      <div class="image-container">
        <img :src="album[index].url" />
      
        <div class="other-elements">
          <p>There is something here</p>
        </div>
      
      </div>
    </div>
    
    <div style="position: fixed; width: 100%; bottom: 2rem">
      <div style="display: block; width: max-content; margin: 0 auto;">
        <button @click="backwards">Backwards</button>
        <button @click="forwards">Forwards</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  computed: {
    album: () => store.getters.popoverAlbum,
    index: () => store.getters.popoverAlbumIndex,
  },
  created() {
    window.addEventListener('keyup', this.arrowNavigation)
  },
  methods: {
    hidePopover: () => store.dispatch('hidePopover'),
    forwards: () => store.dispatch('incrementPopoverImage'),
    backwards: () => store.dispatch('decrementPopoverImage'),

    arrowNavigation(event) {
      if (event.key === 'ArrowLeft') {
        this.backwards()
      } else if (event.key === 'ArrowRight') {
        this.forwards()
      } else if (event.key === 'Escape') {
        this.hidePopover()
      }
    },
    beforeDestroy() {
      window.removeEventListener('keyup')
    }
  }
}
</script>

<style lang="scss" scoped>
  .popover {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0,0,0,0.7);

    &-content {
      height: 100%;
      // margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      // flex-direction: column;
      overflow: auto;
    }

    .image-container {
      // background-color: white;
      // padding: 0.4rem;
    }
   
    img {
      max-height: 92vh;
      max-width: 92vw;

      @media screen and (max-width: 600px) {
        max-width: 95vw;
      }
    }

    .other-elements {
      margin-top: -3px;
      // height: 100px;
      padding: 1rem;
      color: white;
      background-color: rgba(0,0,0,0.75);
    }

    .hover-options {
      position: relative;
      background-color: rgba(0,0,0,0.4);
      font-family: 'Proxima Nova Bold';
      font-weight: 600;
      width: calc(100% - 2rem);
      padding: 0.6rem 1rem;
      margin-top: -38px;
      z-index: 3;

      span {
        cursor: pointer;
        padding: 0.1rem 0.2rem;
      }

      span:not(:first-child) {
        margin-left: 2rem;
      }
    }
  }
</style>