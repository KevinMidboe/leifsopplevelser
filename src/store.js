import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  popover: false,
  popoverAlbum: [],
  popoverAlbumIndex: 0,
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
  },

  setPopoverAlbumIndex (state, index) {
    state.popoverAlbumIndex = index;
  },

  incrementPopoverImage (state) {
    let index = state.popoverAlbumIndex;
    index++
    console.log('Setting popover index:', index)

    if (index > state.popoverAlbum.length - 1) {
      index = 0;
    }

    state.popoverAlbumIndex = index;
  },

  decrementPopoverImage (state) {
    let index = state.popoverAlbumIndex;
    index--
    console.log('Setting popover index:', index)

    if (index < 0) {
      index = state.popoverAlbum.length - 1;
    }

    state.popoverAlbumIndex = index;
  }
}


const actions = {
  showPopover: ({ commit }) => commit('showPopover'),
  hidePopover: ({ commit }) => commit('hidePopover'),
  setPopoverAlbum: ({ commit }, payload) => commit('setPopoverAlbum', payload),
  setPopoverAlbumIndex: ({ commit }, payload) => commit('setPopoverAlbumIndex', payload),
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