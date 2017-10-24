import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import axios from 'axios';

import config from '@/config';

Vue.use(Vuex);

const defaultFile = {
  name: 'DefaultName',
  content: '',
  latex: '',
  error: null,
  models: '',
};

const initialState = {
  files: [{ ...defaultFile, name: 'test' }],
};

const mutations = {
  setLatex(state, { fileName, latex }) {
    const found = state.files.find(f => f.name === fileName);
    if (found) {
      found.latex = latex;
    }
  },
  setError(state, { fileName, error }) {
    const found = state.files.find(f => f.name === fileName);
    if (found) {
      found.error = error;
    }
  },
  setContent(state, { fileName, content }) {
    const found = state.files.find(f => f.name === fileName);
    if (found) {
      found.content = content;
    }
  },
  setName(state, { fileName, name }) {
    const found = state.files.find(f => f.name === fileName);
    if (found) {
      found.name = name;
    }
  },
  newFile(state, name) {
    state.files.push({
      ...defaultFile,
      name,
      content: `;; File ${name}`,
    });
  },
  deleteFile(state, name) {
    Vue.delete(state.files, state.files.findIndex(f => f.name === name));
    if (state.files.length === 0) {
      state.files.push({
        ...defaultFile,
        name: 'New file',
        content: ';; New file',
      });
    }
  },
};

const actions = {
  async updateLatex({ commit, state }, { fileName, newContent }) {
    const file = state.files.find(f => f.name === fileName);
    if (!file || newContent === file.content) return;
    const { error, latex } = (await axios.get(`${config.serverUrl}/latex`, {
      params: {
        source: newContent,
        solver: 'sat',
      },
    })).data;

    commit('setLatex', { fileName, latex });
    commit('setError', { fileName, error });
  },
  updateContent({ commit }, { fileName, newContent }) {
    commit('setContent', { fileName, content: newContent });
    // save to localstorage/files
  },
};

const getters = {
  openFile: (state) => {
    const fileName = state.route.params.name;
    if (fileName) return state.files.find(f => f.name === fileName);
    return null;
  },
  openFileLatex: (state, { openFile }) => (openFile ? openFile.latex : null),
  defaultFile: state => (state.files.length > 0 ? state.files[0] : null),
};

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  state: initialState,
  strict: config.isDev,
  plugins: config.isDev ? [createLogger()] : [],
});
