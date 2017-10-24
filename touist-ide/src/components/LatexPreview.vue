<template>
  <div class="preview">
    <div class="actions">
      <span @click="zoom += 0.1"><i class="fa fa-plus-circle fa-2x fa-fw"></i></span>
      <span @click="zoom -= 0.1"><i class="fa fa-minus-circle fa-2x"></i></span>
    </div>
    <div :style="{ fontSize: `${Math.round(zoom * 16)}px` }" v-html="latexHtml"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import katex from 'katex';

import 'katex/dist/katex.min.css';

export default {
  name: 'LatexPreview',
  data: () => ({
    latexHtml: '',
    error: false,
    zoom: 1,
  }),
  computed: {
    ...mapGetters(['openFileLatex']),
    ...mapGetters(['openFile']),
  },
  watch: {
    openFileLatex(newLatex) {
      try {
        this.latexHtml = katex.renderToString(newLatex, { displayMode: true });
        this.error = false;
      } catch (e) {
        console.error(e);
        this.error = true;
      }
    },
  },
};
</script>

<style lang="scss">
.preview {
  position: relative;
  padding: 20px;
  height: 100%;
  width: 100%;
  background-color: #48929B;
  color: white;
}

.actions {
  position: absolute;
  bottom: 15px;
  right: 15px;
  user-select: none;

  span {
    cursor: pointer;
    font-size: 20px;
    color: white;
  }
}

.katex-display {
  // font-size: 20px;
  margin: 0!important;
}
</style>
