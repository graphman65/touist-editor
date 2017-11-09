<template>
  <div class="sudoku-container">
    <table>
      <thead>
        <tbody>
          <tr v-for="y in 4">
            <td v-for="x in 4">
              {{ values[`${y}-${x}`] }}
            </td>
          </tr>
        </tbody>
      </thead>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'SudokuModel',
  props: ['currentModelIndex', 'models'],
  data: () => ({
    values: {},
  }),
  mounted() {
    this.updateSudoku(this.models[this.currentModelIndex]);
  },
  methods: {
    updateSudoku(model) {
      const re = /\w*\((\d),(\d),(\d)\)/;
      Object.keys(model).filter(key => !!model[key]).forEach((key) => {
        const match = re.exec(key);
        Vue.set(this.values, `${match[1]}-${match[2]}`, match[3]);
      });
    },
  },
  watch: {
    currentModelIndex(newModelIndex) {
      this.updateSudoku(this.models[newModelIndex]);
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/variables.scss";

.sudoku-container {
  max-height: calc(100vh - 240px);
  overflow: auto;
  margin: 10px;
}

table {
  user-select: none;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;

  td {
    font-size: 18px;
    padding: 15px 20px;
    border: 2px solid $mid_color;
  }
}
</style>
