<template>
  <div class="model-list">
    <div @click="$emit('closeModelList')" class="back-to-editor">Back to code</div>
    <header>Model list</header>
    <div class="model-types">
      <i
        class="fa fa-columns fa-fw fa-2x"
        @click="modelType = 'table-model'"
        :class="{ selected: modelType === 'table-model' }"
      ></i>
      <i
        class="fa fa-table fa-fw fa-2x"
        @click="modelType = 'sudoku-model'"
        :class="{ selected: modelType === 'sudoku-model' }"
      ></i>
    </div>
    <div v-if="openFile && openFile.models && openFile.models.length > 0">
      <div class="actions">
        <div @click="currentModelIndex -= 1" class="previous-model" :class="{ disabled: currentModelIndex <= 0 }">
          Previous model
        </div>
        <div>Model {{ currentModelIndex + 1 }} / {{ openFile.models.length }}</div>
        <div @click="currentModelIndex += 1" class="next-model" :class="{ disabled: currentModelIndex >= openFile.models.length - 1 }">
          Next model
        </div>
      </div>
      <component :is="modelType" :currentModelIndex="currentModelIndex" :models="openFile.models"></component>
    </div>
    <div class="no-model" v-else>
      No model found
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as modelTypes from './model-types';

export default {
  name: 'ModelList',
  components: {
    ...modelTypes,
  },
  data: () => ({
    modelType: 'sudoku-model',
    currentModelIndex: 0,
  }),
  computed: {
    ...mapGetters(['openFile']),
  },
};
</script>

<style lang="scss">
@import "../assets/variables.scss";

.model-list {
  padding: 30px 10px;
  border-top: 1px solid $mid_color;
  box-shadow: 0 -4px 5px -5px rgba(0, 0, 0, 0.5);
  z-index: 100;
  background-color: #ECF0F1;
  text-align: center;
  height: 100%;

  header {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }

  .back-to-editor {
    border-radius: 5px;
    padding: 10px;
    color: white;
    margin-bottom: 20px;
    display: inline-block;
    background-color: $dark_color;
    cursor: pointer;
    user-select: none;
  }

  .no-model {
    color: $secondary_color;
    font-size: 20px;
    font-weight: bold;
  }

  .model-true {
    color: $ternary_color;
  }

  .model-false {
    color: $secondary_color;
  }

  .model-types {
    margin-bottom: 10px;

    i {
      cursor: pointer;
      user-select: none;
    }

    .selected {
      color: $secondary_color;
    }
  }

  .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 20px;

    .next-model, .previous-model {
      border-radius: 5px;
      padding: 5px;
      color: white;
      width: 170px;
      user-select: none;
      cursor: pointer;

      &.disabled {
        pointer-events: none;
        background-color: $mid_color;
        cursor: not-allowed;
      }
    }

    .next-model {
      margin-left: 20px;
      background-color: $primary_color;
    }

    .previous-model {
      margin-right: 20px;
      background-color: $secondary_color;
    }
  }
}
</style>
