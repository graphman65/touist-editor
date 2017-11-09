<template>
  <div class="preview">
    <input class="zoom-range" type="range" min="0" max="2" step="0.1" v-model="zoom">
    <div :style="{ fontSize: `${Math.round(+zoom * 14)}px` }" v-html="latexHtml"></div>
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
    currentLatexFile: '',
  }),
  computed: {
    ...mapGetters(['openFile', 'openFileLatex']),
  },
  methods: {
    updateLatex(latex) {
      if (latex === null) return;
      try {
        this.latexHtml = katex.renderToString(latex, { displayMode: true });
        this.error = false;
      } catch (e) {
        console.error(e);
        this.error = true;
      }
    },
  },
  watch: {
    openFileLatex(newLatex) {
      this.updateLatex(newLatex);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/variables.scss";

.preview {
  position: relative;
  padding: 20px;
  height: 100%;
  width: 100%;
  background-color: $dark_color;
  color: white;

  .zoom-range {
    -webkit-appearance: none;
    position: absolute;
    bottom: 20px;
    width: calc(100% - 40px);
    height: 10px;
    border-radius: 5px;
    background: $mid_color;
    outline: none;
    padding: 0;
    margin: 0;
  }

  .zoom-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: $primary_color;
    cursor: pointer;
    -webkit-transition: background .15s ease-in-out;
    transition: background .15s ease-in-out;
  }
  .zoom-range::-webkit-slider-thumb:hover {
    background: $secondary_color;
  }

  .zoom-range:active::-webkit-slider-thumb {
    background: $secondary_color;
  }

  .zoom-range::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border: 0;
    border-radius: 50%;
    background: $primary_color;
    cursor: pointer;
    -webkit-transition: background .15s ease-in-out;
    transition: background .15s ease-in-out;
  }

  .zoom-range::-moz-range-thumb:hover {
    background: $secondary_color;
  }

  .zoom-range:active::-moz-range-thumb {
    background: $secondary_color;
  }


  .katex-display {
    max-width: 100%;
    max-height: 100%;
    transition: font-size 0.8s;
    // font-size: 20px;
    margin: 0!important;
  }
}

</style>
