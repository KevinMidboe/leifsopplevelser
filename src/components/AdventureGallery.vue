<template>
  <div>
    <button @click="toggleView">Toggle view</button>

    <div class="gallery-container" :class="mobileFriendly ? 'mobile' : 'large'">

      <gallery-image v-for="(image, key) in gallery" :image="image" :index="key" :thumbnail="true" @click="imageSelected"></gallery-image>

    </div>

    <div class="gallery--load-more">
      <button class="button">View all</button>
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
    id: {
      type: Number
    }
  },
  data() {
    return {
      selected: undefined,
      wide: false,
      gallery: [],
      ASSET_URL: 'https://leifsopplevelser.no/assets',
      mobileFriendly: undefined
    }
  },
  watch: {
    gallery: function (val) {
      this.setPopoverAlbum(val)
    }
  },
  created() {
    
    this.adventureImages = imagesByAdventureId(this.id)
      .then(adventureImages => {
        adventureImages.forEach(image => {
          let [filename, filextension] = image.filename.split('.')

          console.log('filename:', filename)
          console.log('filextension:', filextension)
          const url = `${this.ASSET_URL}/${filename}_lg.${filextension}`

          this.gallery.push({
            type: 'image',
            url
          })
        })
      })

    this.setPopoverAlbum(this.gallery)

    // const that = this;
    // window.addEventListener('resize', function() {
    //   that.setMobileFriendly()
    // });
  },
  methods: {
    setMobileFriendly() {
      const monitor = document.getElementsByClassName('gallery-container');
      const image = document.getElementsByClassName('gallery-image')

      if (monitor === undefined || image === undefined)
        return
      console.log('monitor and image', monitor[0].offsetWidth, image[0].offsetWidth)

      this.mobileFriendly = monitor[0].offsetWidth < image[0].offsetWidth * 1.5;
    },
    toggleView() {
      this.wide = !this.wide;
    },
    // setPopoverAlbum: (album) => store.dispatch('setPopoverAlbum', album),

    imageSelected(selectedImage) {
      const selectedImageIndex = this.gallery.findIndex(image => selectedImage === image);

      console.log('this is the selected image index', selectedImageIndex)

      store.dispatch('setPopoverAlbum', this.gallery);
      store.dispatch('setPopoverAlbumIndex', selectedImageIndex)
      store.dispatch('showPopover');
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
@import '../scss/buttons.scss';

  .gallery-container {
    display: flex;
    flex-direction: row;
    // justify-content: space-evenly;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1rem 0.5rem;

    &.mobile {
      // background-color: NavajoWhite;
    }
  }

  .gallery--load-more {
    display: flex;
    justify-content: center;
  }
</style>