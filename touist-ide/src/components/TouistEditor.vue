<template>
  <div class="touist-editor">
    <div class="topbar">
      <div class="left-actions">
        <div @click="deleteFile(openFile.name)" class="delete">Delete <i class="fa fa-close"></i></div>
      </div>
      <div class="right-actions">
        <div @click="solve(openFile.name)" class="solve">Solve <i class="fa fa-check"></i></div>
      </div>
      <input
        @keyup.enter="saveName"
        @blur="saveName"
        class="name-input"
        type="text"
        :value="openFile.name"
        v-model="editedName"
        v-if="editName"
        ref="nameInput"
      />
      <span class="name" @click="changeName" v-else>{{ openFile.name }}</span>
    </div>
    <div class="editor-wrapper">
      <div class="editor">
        <textarea ref="codemirrorTextarea"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CodeMirror from 'codemirror';

import debounce from '@/utils/debounce';

export default {
  name: 'TouistEditor',
  data: () => ({
    editName: false,
    editedName: '',
  }),
  created() {
    if (!this.openFile) {
      this.$router.replace(`/editor/${this.defaultFile.name}`);
    }
  },
  mounted() {
    this.codemirror = CodeMirror.fromTextArea(this.$refs.codemirrorTextarea, {
      lineNumbers: true,
      mode: 'touist',
      gutters: [
        'CodeMirror-lint-markers',
      ],
      lint: { lintOnChange: false },
      scrollbarStyle: 'overlay',
      lineWrapping: true,
    });

    this.codemirror.vueComponent = this;
    this.codemirror.on('change', cm => this.update(cm.getValue()));
  },
  computed: {
    ...mapGetters(['openFile', 'defaultFile']),
  },
  methods: {
    ...mapActions(['updateLatex', 'updateContent']),
    ...mapMutations(['setName', 'deleteFile']),
    update: debounce(async function updatea(newContent) {
      await this.updateLatex({
        newContent,
        fileName: this.openFile.name,
      });
      this.updateContent({ fileName: this.openFile.name, newContent });
      this.codemirror.performLint();
    }, 300),
    saveName() {
      this.editName = false;
      this.setName({ fileName: this.openFile.name, name: this.editedName });
      this.$router.replace(`/editor/${this.editedName}`);
    },
    changeName() {
      this.editedName = this.openFile.name;
      this.editName = true;
      setTimeout(() => this.$refs.nameInput.focus(), 50);
    },
  },
  watch: {
    openFile(newOpenFile) {
      if (!newOpenFile) {
        this.$router.replace(`/editor/${this.defaultFile.name}`);
        return;
      }
      this.codemirror.setValue(newOpenFile.content);
    },
  },
};
</script>


<style lang="scss">
.touist-editor {
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .topbar {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    user-select: none;
    padding: 10px;
    color: #F2F1EF;
    background-color: #5D8CAE;
    text-align: center;
    font-weight: bold;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    z-index: 10;
    position: relative;

    .left-actions {
      position: absolute;
      left: 10px;

      .delete {
        cursor: pointer;
        background-color: #EF4836;
        padding: 5px;
        border-radius: 3px;
      }
    }

    .right-actions {
      position: absolute;
      right: 10px;

      .solve {
        cursor: pointer;
        text-transform: uppercase;
        background-color: #03C9A9;
        padding: 5px 10px;
        border-radius: 3px;
      }
    }

    .name-input {
      margin: 0;
      font-size: 14px;
      padding: 5px;
      border-radius: 5px;
      border: none;
      background-color: rgba(0, 0, 0, 0.5);
      color: #F2F1EF;
      text-align: center;
    }

    .name {
      padding: 10px;
    }
  }

  .editor-wrapper {
    flex: 1;
    align-self: stretch;
    max-height: calc(100% - 36px);
  }

  .editor {
    max-height: 100%;
    height: 100%;
  }

  .CodeMirror {
    max-height: 100%;
    height: 100%;
    min-height: 100%;
    width: 100%;
  }
}
</style>
