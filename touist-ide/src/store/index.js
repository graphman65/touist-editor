import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import axios from 'axios';

import config from '@/config';
import defaultFiles from '@/assets/defaultFiles.json';

Vue.use(Vuex);

const defaultFile = {
  name: 'Default file',
  content: ';; Default file',
  latex: '',
  error: null,
  models: [],
};

const initialState = {
  files: defaultFiles.length > 0 ? defaultFiles : [defaultFile],
};

const mutations = {
  setLatex(state, { fileName, latex }) {
    const found = state.files.find(f => f.name === fileName);
    if (found) {
      Vue.set(found, 'latex', latex);
    }
  },
  setError(state, { fileName, error }) {
    const found = state.files.find(f => f.name === fileName);
    if (found) {
      Vue.set(found, 'error', error);
    }
  },
  setContent(state, { fileName, content }) {
    const found = state.files.find(f => f.name === fileName);
    if (found) {
      Vue.set(found, 'content', content);
    }
  },
  setName(state, { fileName, name }) {
    const found = state.files.find(f => f.name === fileName);
    if (found) {
      Vue.set(found, 'name', name);
    }
  },
  setModels(state, { fileName, models }) {
    const found = state.files.find(f => f.name === fileName);
    if (found) {
      Vue.set(found, 'models', models);
    }
  },
  newFile(state, name) {
    state.files.push({
      ...defaultFile,
      name,
      content: `;; ${name}`,
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
  async updateLatex({ commit, state }, { force = false, fileName, newContent }) {
    const file = state.files.find(f => f.name === fileName);
    if ((!file || newContent === file.content) && !force) return;
    const { error, latex } = (await axios.get(`${config.serverUrl}/latex`, {
      params: {
        source: newContent,
        solver: 'sat',
      },
    })).data;

    commit('setLatex', { fileName, latex });
    commit('setError', { fileName, error });
  },
  async solve({ commit, state }, fileName) {
    const file = state.files.find(f => f.name === fileName);
    if (!file || !file.content) return;
    const { models } = (await axios.get(`${config.serverUrl}/solve`, {
      params: {
        source: file.content,
        solver: 'sat',
      },
    })).data;
    commit('setModels', { fileName, models });
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
  openFileLatex: (state, { openFile }) => openFile && openFile.latex,
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
