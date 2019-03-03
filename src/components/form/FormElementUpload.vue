<template>
  <div class="form-item">
    <label class="title">last opp bilder</label>

    <input id="file-upload" type="file" @change="processFiles" multiple>
    <div class="previewWindow" v-if="files.length">
      <p class="previewWindow--title">{{ files.length }} bilder lagt til</p>
      <div class="previewWindow--image">
        <!-- <img v-for="file in files" :src="file.url" @click="popOver(file)"/> -->
        <div class="img" v-for="file in files" v-bind:style="{ 'background-image': `url(${file.url}`}" @click="popOver(file)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'

import { imagesByAdventureId, createImages } from '@/utils/leifsbackend-api'

export default {
  props: {
    adventureId: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      files: [],
      previewFiles: []
    }
  },
  watch: {
    files() {
      this.$emit('newFiles', this.files)
    }
  },
  beforeMount() {
    if (this.adventureId) {
      imagesByAdventureId(this.adventureId)
      .then(images => {
        images.forEach(image => {
          let [filename, filextension] = image.filename.split('.')
          const url = `${'https://leifsopplevelser.no/assets'}/${filename}_thumb.${filextension}`;

          this.files.push({
            type: 'image',
            url
          })
        })
      })
    }
  },
  methods: {
    setPopoverAlbum: (album) => store.dispatch('setPopoverAlbum', album),
    setPopoverAlbumIndex: (index) => store.dispatch('setPopoverAlbumIndex', index),
    showPopover: () => store.dispatch('showPopover'),

    uploadFiles(fileList) {
      console.log('sending fileList', fileList)
      let formData = new FormData();
      for( var i = 0; i < fileList.length; i++ ){
        let file = fileList[i];
        formData.append('images', file, file.name);
      }

      console.log('formdata', formData)
      createImages(formData, 1, this.progressEvent) // passes formData (fileList of images) and adventureId
    },

    progressEvent(event) {
      console.log(100 * (event.loaded / event.totalSize))
    },

    processFiles(event) {
      const files = event.target.files;
      this.uploadFiles(event.target.files)

      let mappedFiles = []
      let album = this.files || [];

      // Files is a object with index keys so we need to map to a list
      for (var i = files.length - 1; i >= 0; i--) {
        mappedFiles.push({
          url: URL.createObjectURL(files[i]),
          index: i,
        })
      }

      mappedFiles.reverse();
      album = album.concat(mappedFiles)
      console.log('Packed uploaded album:', album)

      this.setPopoverAlbum(album)
      this.files = album;
    },
    popOver(image) {
      console.log('popover called')
      this.setPopoverAlbumIndex(image.index)
      this.showPopover()
      // EventBus.$emit('openPopover', image);
    }
  }
}
</script>

<style lang="scss" scoped>
.previewWindow {
  -webkit-appearance: none;
  -webkit-rtl-ordering: logical;
  -webkit-user-select: text;
  background-color: #fafafa;
  border: 1px solid #cccccc;
  border-radius: 3px;
  border-image-outset: 0px;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: auto;
  display: inline-block;
  font-family: 'Proxima Nova';
  letter-spacing: normal;
  font-size: 14px;
  line-height: 16px;
  width: 100%;

  margin-top: -6px;
  border-top: unset;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;

  &--title {
    padding-left: 0.6rem;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    margin-bottom: 0.8rem;
    width: calc(100% - 0.6rem);
    font-size: 1rem;
    border-bottom: 1px solid #cccccc;
  }


  &--image {
    width: 100%;
    margin-left: 0.1rem;

    & .img {
      display: inline-block;
      margin: 0.1rem;
      width: calc(25% - 0.3rem);
      height: 100px;
      background-size: cover;
      background-origin: content-box;
      background-repeat: no-repeat;
    }
    // max-width: 250px;
  }
}
</style>