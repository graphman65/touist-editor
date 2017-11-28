<template>
  <div class="table-container">
    <table>
      <thead>
        <tbody>
          <tr v-for="(value, key) in models[currentModelIndex]" v-if="valid(key, value)">
            <th>{{ key }}</th>
            <td>
              <i class="fa fa-check-circle model-true" v-if="value"></i>
              <i class="fa fa-times-circle model-false" v-else></i>
            </td>
          </tr>
        </tbody>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TableModel',
  props: ['currentModelIndex', 'models', 'keyFilter', 'valueFilter'],
  computed: {
    filterRegexp() {
      try {
        return new RegExp(this.keyFilter.split(':')[0]);
      } catch (e) {
        return null;
      }
    },
  },
  methods: {
    valid(key, value) {
      return (this.keyFilter.length === 0 || (this.filterRegexp && this.filterRegexp.test(key))) &&
             (this.valueFilter === null || value === this.valueFilter);
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/variables.scss";

.table-container {
  max-height: calc(100vh - 250px);
  overflow: auto;
}

table {
  user-select: none;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;

  th, td {
    padding: 10px 30px;
    border: 2px solid $mid_color;
  }
}
</style>
