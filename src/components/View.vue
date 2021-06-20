<template>
    <div class="container">
        <div class="input-group">
            <input type="text"
                   class="form-input"
                   placeholder="Search"
                   v-model="search">
            <button class="btn btn-primary input-group-btn"
                    :disabled="search.length === 0">
                Submit
            </button>
        </div>
        <div class="columns">
            <div v-for="(item, index) in items"
                 :key="index"
                 class="column col-6 col-xs-12">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title h5">{{item.f_name}} {{item.l_name}}</div>
                    </div>
                    <div class="card-body">
                        Birth date: {{item.date}}
                        <div class="card-subtitle text-gray">
                            Mother: {{item.mother}}
                        </div>
                        <div class="card-subtitle text-gray">
                            Father: {{item.father}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "View",
    data() {
      return {
        search: '',
        items: [
          {
            f_name: 'John',
            l_name: 'Doe',
            mother: 'Marry',
            father: 'Mike',
            date: '18 feb 2020',
          },
          {
            f_name: 'John',
            l_name: 'Doe',
            mother: 'Marry',
            father: 'Mike',
            date: '18 feb 2020',
          },
          {
            f_name: 'John',
            l_name: 'Doe',
            mother: 'Marry',
            father: 'Mike',
            date: '18 feb 2020',
          },
        ]
      };
    },
  }
</script>

<style scoped>
.column {
    padding: .4rem;
}
</style>
