import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  popover: false,
  popoverAlbum: [],
  popoverAlbumLength: 0,
  popoverAlbumIndex: 0
}

const mutations = {
  showPopover (state) {
    state.popover = true;
  },

  hidePopover (state) {
    state.popover = false;
  },

  setPopoverAlbum (state, album) {
    state.popoverAlbum = album;
    state.popoverAlbumLength = album.length - 1;
  },

  setPopoverAlbumIndex (state, index) {
    state.popoverAlbumIndex = index;
    console.log('new index', index);
  },

  incrementPopoverImage (state) {
    let index = state.popoverAlbumIndex;

    if (index < state.popoverAlbumLength) {
      index++;
    } else {
      index = 0;
    }

    state.popoverAlbumIndex = index;
  },

  decrementPopoverImage (state) {
    let index = state.popoverAlbumIndex;

    if (index > 0) {
      index--;
    } else {
      index = state.popoverAlbumLength;
    }

    state.popoverAlbumIndex = index;
  }
}


const actions = {
  showPopover: ({ commit }) => commit('showPopover'),
  hidePopover: ({ commit }) => commit('hidePopover'),
  setPopoverAlbum: ({ commit }, images) => commit('setPopoverAlbum', images),
  setPopoverAlbumIndex: ({ commit }, index) => commit('setPopoverAlbumIndex', index),
  incrementPopoverImage: ({ commit }) => commit('incrementPopoverImage'),
  decrementPopoverImage: ({ commit }) => commit('decrementPopoverImage'),

}

const getters = {
  popoverState: state => state.popover,
  popoverAlbum: state => state.popoverAlbum,
  popoverAlbumIndex: state => state.popoverAlbumIndex,
}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})