<template>
  <div class="editor-page">
    <nav class="file-list-container" :class="{ open: fileListOpen }">
      <FileList />
    </nav>
    <main>
      <section class="editor-container">
        <TouistEditor />
      </section>
      <section class="preview-container">
        <LatexPreview />
      </section>
    </main>
  </div>
</template>

<script>
import FileList from '@/components/FileList';
import TouistEditor from '@/components/TouistEditor';
import LatexPreview from '@/components/LatexPreview';

export default {
  name: 'Editor',
  components: {
    FileList,
    TouistEditor,
    LatexPreview,
  },
  data: () => ({
    fileListOpen: true,
  }),
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
}

.preview-container {
  width: 40%;
  min-width: 40%;
  box-shadow: -3px 0px 3px #264348;
  z-index: 10;
}
</style>
