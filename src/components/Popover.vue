<template>
  <div>
    <div class="popover" @click="close">
      <div class="image-container">
        <img :src="image.url" />
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

export default {
  components: {

  },
  props: {
    image: {
      type: Object,
      required: true,
    }
  },
  methods: {
    forwards() {
      eventHub.$emit('iteratePopoverImage', 1)
    },
    backwards() {
      eventHub.$emit('iteratePopoverImage', -1)
    },
    close() {
      eventHub.$emit('closePopover')
    }
  }
}
</script>

<style lang="scss" scoped>
  .popover {
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
   
    img {
      max-height: 90vh;
      max-width: 90vw;

      @media screen and (max-width: 600px) {
        max-width: 95vw;
      }
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