<template>
  <div class="wrapper">
    <table>
      <thead class="row">
        <th class="col col_number">#</th>
        <th class="col col_date">Date</th>
        <th class="col col_category">Category</th>
        <th class="col col_value">Value</th>
      </thead>
      <tbody>
        <tr class="row" v-for="(item, idx) in list" :key="idx">
          <td class="cell">{{ idx + 1 + offset}}</td>
          <td class="cell">{{ item.date }}</td>
          <td class="cell">{{ item.category }}</td>
          <td class="cell">{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
      validator: (list) => {
        return list.reduce((prev, item) => {
          return prev && ('date' in item
              && 'category' in item
              && 'value' in item)
        }, true) ;
      }
    },
    offset: {
      type: Number,
      default: 0
    }
  },
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  text-align: left;
}
.col {
  min-width: 100px;
  padding: 10px 0;
  &_number{
    min-width: 45px;
  }
  &_value {
    min-width: 50px;
  }
  &_category {
    min-width: 200px;
  }
}
.cell {
  padding: 10px 0;
}
.row {
  border-bottom: 1px solid #ddd;
}
</style>