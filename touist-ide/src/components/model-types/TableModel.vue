<template>
  <div class="table-container">
    <table>
      <thead>
        <tbody>
          <tr v-for="(value, key) in models[currentModelIndex]">
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
  props: ['currentModelIndex', 'models'],
};
</script>

<style lang="scss">
@import "../../assets/variables.scss";

.table-container {
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

  th, td {
    padding: 10px 30px;
    border: 2px solid $mid_color;
  }
}
</style>
