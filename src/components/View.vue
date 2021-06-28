<template>
    <div v-if="loading" class="container">
        Loading...
    </div>
    <div v-else class="container">
        <div class="input-group">
            <input type="text"
                   class="form-input"
                   placeholder="Search"
                   v-model="search">
        </div>
        <div v-if="items.length === 0" class="container pt-2">
            Nothing found
        </div>
        <div v-else class="columns">
            <div v-for="(item, index) in items"
                 :key="index"
                 class="column col-6 col-xs-12">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title h5">{{item.f_name}} {{item.l_name}}</div>
                    </div>
                    <div class="card-body">
                        Birth date: {{formatDate(item.birth_date)}}
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
  import { API_URL, API_VIEW } from "../utils/constants";

  export default {
    name: "View",
    data() {
      return {
        search: '',
        loading: true,
        items: []
      };
    },
    mounted() {
      this.getData();
    },
    watch: {
      search() {
        this.getData();
      },
    },
    methods: {
      getData() {
        let url = API_URL + API_VIEW;
        if (this.search.length > 0) {
          url += '?search=' + this.search;
        }

        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.loading = false;
            this.items = data
          });
      },

      formatDate(dateString) {
        const date = Date.parse(dateString);
        return new Date(date).toISOString().slice(0, 10);
      },
    },
  }
</script>

<style scoped>
.column {
    padding: .4rem;
}
</style>
