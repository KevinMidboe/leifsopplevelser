<template>
  <div>
    <button @click="toggleView">Toggle view</button>

    <div class="gallery-container">

      
      <div v-for="(item, key) in gallery">
        <gallery-image v-if="item.type === 'image'" :image="item" :index="key" :wide="wide" @click="imageSelected"></gallery-image> 
        <gallery-text v-if="item.type === 'text'" :text="item"></gallery-text> 
      </div>

    </div>
  </div>
</template>

<script>
import GalleryImage from '@/components/GalleryImage'
import GalleryText from '@/components/GalleryText'

import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'Gallery-Item',
  components: { GalleryImage, GalleryText },
  props: {
    short: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      selected: undefined,
      wide: false,
      gallery: [
        {
          type: 'image',
          name: 'Dress to impress', 
          url: "https://static1.squarespace.com/static/585040955016e131e74667b0/5a4eeae7ec212d38915e64cd/5a4eeae7419202bdaaeaffc1/1515121386282/The-Marias-Art-2.jpg"
        },
        {
          type: 'image',
          name: 'Couple',
          url: 'https://static1.squarespace.com/static/585040955016e131e74667b0/5a4eeae7ec212d38915e64cd/5a4eeaebec212d38915e659c/1515121395460/The-Marias-Art-6.PNG'
        },
        {
          type: 'image',
          name: 'Nice jacket',
          url: 'https://static1.squarespace.com/static/585040955016e131e74667b0/5a4eeae7ec212d38915e64cd/5a4eeae8ec212d38915e64d2/1515121386336/The-Marias-Art-3.jpg?format=500w'
        },
        // {
        //   type: 'text',
        //   title: 'title',
        //   subtext: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        // },
        {
          type: 'image',
          name: 'plants 4 life',
          url: 'https://static1.squarespace.com/static/585040955016e131e74667b0/5a4eeae7ec212d38915e64cd/5a4eeaee0852296d709ba5a6/1515121396456/The-Marias-Art-10.PNG?format=500w'
        },
        {
          type: 'image',
          name: 'Two brothers and a mountain that could never beat them',
          url: 'https://api.kevinmidboe.com/files/images/DSC_9029.JPG'
        },
        // {
        //   type: 'image',
        //   name: 'Two brothers meant for each other',
        //   url: 'http://localhost:3000/uploads/avatars/responsive/eea452299eba7225036aa836f35d86d0_xs.png'
        // }
      ]
    }
  },
  created() {
    this.setPopoverAlbum(this.gallery)
  },
  watch: {
    gallery: function (val) {
      this.setPopoverAlbum(val)
    }
  },
  methods: {
    toggleView() {
      this.wide = !this.wide;
    },
    setPopoverAlbum: (album) => store.dispatch('setPopoverAlbum', album),

    imageSelected(image) {
      console.log('selected image', image)
      this.selected = image;
      // store.dispatch('incrementPopoverImage', this.selectedIndexInGallery())
    },
    selectedIndexInGallery() {
      const gallery = this.gallery;
      const selected = this.selected;

      for(var i = 0; i < gallery.length; i += 1) {
        if(gallery[i] === selected) {
          return i;
        }
      }
      return -1;
    },
  }
}
</script>

<style lang="scss" scoped>
  .gallery-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 1rem 0;
  }
</style>