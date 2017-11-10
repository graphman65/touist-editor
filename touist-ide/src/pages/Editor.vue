<template>
  <div class="editor-page">
    <nav class="file-list-container" :class="{ open: fileListOpen }">
      <FileList />
    </nav>
    <main>
      <section class="editor-container">
        <TouistEditor @openModelList="modelListOpen = true" />
      </section>
      <section class="modellist-container" v-show="modelListOpen">
        <ModelList @closeModelList="modelListOpen = false" />
      </section>
      <section class="preview-container" v-show="!modelListOpen">
        <LatexPreview />
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
    modelListOpen: false,
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
  },
  computed: {
    ...mapGetters(['openFile']),
  },
  methods: {
    ...mapActions(['solve']),
  },
  watch: {
    $route(old, n) {
      if (old.path !== n.path) this.modelListOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-page {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.file-list-container {
  width: 0px;

  &.open {
    width: 250px;
    min-width: 250px;
  }
}

main {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}

.editor-container {
  width: 60%;
  min-width: 60%;
  max-width: 60%;
  z-index: 0;
  display: flex;
  flex-direction: column;
}

.modellist-container {
  width: 40%;
  min-width: 40%;
  box-shadow: -1px 0px 5px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.preview-container {
  width: 40%;
  min-width: 40%;
  box-shadow: -1px 0px 5px rgba(0, 0, 0, 0.5);
  z-index: 10;
}
</style>
