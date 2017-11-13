<template>
  <div class="touist-editor">
    <div class="topbar">
      <div class="left-actions">
        <div @click="deleteFile(openFile.name)" class="delete">Delete <i class="fa fa-close"></i></div>
      </div>
      <div class="right-actions">
        <div @click="solverSelectorOpen = !solverSelectorOpen" class="solvers">
          {{ openFile.solver.toUpperCase() }} <i class="fa fa-chevron-down"></i>
          <div class="solver-selector" v-if="solverSelectorOpen">
            <div class="solver" v-for="solver in solvers" @click="changeSolver(solver)">
              {{ solver.toUpperCase() }}
            </div>
          </div>
        </div>
        <div @click="solveFile(openFile.name)" class="solve">Solve <i class="fa fa-check"></i></div>
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

import config from '@/config';
import debounce from '@/utils/debounce';

export default {
  name: 'TouistEditor',
  data: () => ({
    editName: false,
    editedName: '',
    solverSelectorOpen: false,
    solvers: config.solvers,
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
    this.codemirror.on('change', cm => this.update(false, cm.getValue()));
    if (this.openFile) {
      this.codemirror.setValue(this.openFile.content);
      this.updateLatex({
        force: true,
        newContent: this.openFile.content,
        fileName: this.openFile.name,
      });
    }
  },
  computed: {
    ...mapGetters(['openFile', 'defaultFile']),
  },
  methods: {
    ...mapActions(['updateLatex', 'updateContent', 'solve']),
    ...mapMutations(['setName', 'deleteFile', 'setSolver']),
    update: debounce(async function update(newContent) {
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
    async solveFile(fileName) {
      await this.solve(fileName);
      this.$emit('openModelList');
    },
    async changeSolver(solver) {
      this.setSolver({ fileName: this.openFile.name, solver });
      await this.updateLatex({
        newContent: this.openFile.content,
        fileName: this.openFile.name,
        force: true,
      });
      this.codemirror.performLint();
    },
  },
  watch: {
    openFile(newOpenFile) {
      if (!newOpenFile) {
        this.$router.replace(`/editor/${this.defaultFile.name}`);
        return;
      }
      this.codemirror.setValue(newOpenFile.content);
      this.update(true, newOpenFile.content);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/variables.scss";

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
    color: $light_color;
    background-color: $mid_color;
    text-align: center;
    font-weight: bold;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    z-index: 10;
    position: relative;

    .left-actions, .right-actions {
      display: flex;
      flex-direction: row;
    }

    .left-actions {
      position: absolute;
      left: 10px;

      .delete {
        cursor: pointer;
        background-color: $secondary_color;
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
        background-color: $ternary_color;
        padding: 5px 10px;
        border-radius: 3px;
      }

      .solvers {
        cursor: pointer;
        background-color: $primary_color;
        padding: 5px;
        border-radius: 3px;
        margin-right: 5px;
      }

      .solver-selector {
        position: absolute;
        margin-top: 5px;
        cursor: pointer;
        background-color: $dark_color;
        min-width: 50px;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        margin-left: -5px;
      }

      .solver {
        padding: 5px 10px;
        &:hover {
          background-color: $secondary_color;
        }
      }
    }

    .name-input {
      margin: 0;
      font-size: 14px;
      padding: 5px;
      border-radius: 5px;
      border: none;
      background-color: rgba(0, 0, 0, 0.5);
      color: $light_color;
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
