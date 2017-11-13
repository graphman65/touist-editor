<template>
  <div class="editor-page">
    <nav class="file-list-container" :class="{ open: fileListOpen }">
      <FileList />
      <div
        :style="{ left: fileListOpen ?  '250px' : '0px' }"
        @click="fileListOpen = !fileListOpen"
        class="file-list-toggle" :class="{  open: fileListToggleOpen }">
        <i class="fa" :class="{ 'fa-chevron-left': fileListOpen, 'fa-chevron-right': !fileListOpen }"></i>
      </div>
    </nav>
    <main :style="{ width: fileListOpen ? 'calc(100% - 250px)' : '100%'}">
      <section class="editor-container" :style="{ width: editorWidth, maxWidth: editorWidth, minWidth: editorWidth }">
        <TouistEditor @openModelList="modelListOpen = true" />
        <div class="resizer" @dragstart="startDrag" @dragend="endDrag" draggable="true"></div>
        <div class="resizer-indicator"
      </section>
      <section
        class="preview-model-container"
        :style="{ width: rightWidth, maxWidth: rightWidth, minWidth: rightWidth }"
      >
        <ModelList @closeModelList="modelListOpen = false" v-show="modelListOpen" />
        <LatexPreview v-show="!modelListOpen" />
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FileList from '@/components/FileList';
import TouistEditor from '@/components/TouistEditor';
import LatexPreview from '@/components/LatexPreview';
import ModelList from '@/components/ModelList';

export default {
  name: 'Editor',
  components: {
    FileList,
    TouistEditor,
    LatexPreview,
    ModelList,
  },
  data: () => ({
    fileListOpen: true,
    fileListToggleOpen: true,
    modelListOpen: false,
    dragging: false,
    startDragX: 0,
    xOffset: 0,
  }),
  created() {
    document.addEventListener('keydown', async (e) => {
      if (e.keyCode === 27 && this.modelListOpen) {
        this.modelListOpen = false;
      }

      if (e.keyCode === 13 && e.ctrlKey && this.openFile) {
        await this.solve(this.openFile.name);
        this.modelListOpen = true;
      }
    });
    document.addEventListener('mousemove', (e) => {
      this.fileListToggleOpen = e.clientX <= (this.fileListOpen ? 300 : 50);
    });
  },
  computed: {
    ...mapGetters(['openFile']),
    rightWidth() {
      return `calc(40% - ${this.xOffset}px)`;
    },
    editorWidth() {
      return `calc(60% + ${this.xOffset}px)`;
    },
  },
  methods: {
    ...mapActions(['solve']),
    startDrag(e) {
      this.dragging = true;
      this.startDragX = e.clientX;
    },
    endDrag(e) {
      this.dragging = false;
      this.xOffset += e.clientX - this.startDragX;
    },
  },
  watch: {
    $route(old, n) {
      if (old.path !== n.path) this.modelListOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";

.editor-page {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.file-list-toggle {
  height: 50px;
  width: 25px;
  padding: 2px;
  display: flex;
  align-items: center;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  border-right: 1px solid $dark_color;
  border-top: 1px solid $dark_color;
  border-bottom: 1px solid $dark_color;
  background-color: $mid_color;
  position: absolute;
  top: calc(50vh - 20px);
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.1s, left 0.2s ease;
  cursor: pointer;

  &.open {
    opacity: 1;
  }
}

.file-list-container {
  width: 0px;
  transition: width 0.2s ease, min-width 0.3s ease;

  &.open {
    width: 250px;
    // min-width: 250px;
  }
}

main {
  display: flex;
  flex-direction: row;
  height: 100%;
  transition: width 0.2s ease;
}

.editor-container {
  z-index: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}

.preview-model-container {
  box-shadow: -1px 0px 5px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.resizer {
  position: absolute;
  height: 100vh;
  width: 10px;
  right: 0;
  background-color: transparent;
  z-index: 1000;
  cursor: ew-resize;
}
</style>
