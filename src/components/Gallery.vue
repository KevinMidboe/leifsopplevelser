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

import { imagesByAdventureId } from '@/utils/leifsbackend-api'


export default {
  name: 'Gallery-Item',
  components: { GalleryImage, GalleryText },
  props: {
    short: {
      default: false,
      type: Boolean
    },
    id: {
      type: Number
    }
  },
  data() {
    return {
      selected: undefined,
      wide: false,
      gallery: []
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
  created() {
    imagesByAdventureId(this.id)
      .then(images => {
        console.log('events', images)
        images.forEach(image => {
          this.gallery.push({
            type: 'image',
            url: 'http://localhost:5000/images/' + image.filename
          })
        })
      })
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