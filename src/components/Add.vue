<template>
  <form class="form-horizontal p-centered">
      <div class="form-group">
        <div class="col-2 col-sm-12">
        </div>
        <div class="col-2 col-sm-12">
          <label class="form-label" for="f_name">First Name</label>
        </div>
        <div class="col-6 col-sm-12">
          <input class="form-input" type="text" id="f_name" placeholder="John">
        </div>
        <div class="col-2 col-sm-12">
        </div>
      </div>
      <div class="form-group">
      <div class="col-2 col-sm-12">
      </div>
      <div class="col-2 col-sm-12">
        <label class="form-label" for="l_name">Last Name</label>
      </div>
      <div class="col-6 col-sm-12">
        <input class="form-input" type="text" id="l_name" placeholder="Doe">
      </div>
      <div class="col-2 col-sm-12">
      </div>
    </div>
      <div class="form-group">
        <div class="col-2 col-sm-12">
        </div>
        <div class="col-2 col-sm-12">
          <label class="form-label">Birth Date</label>
        </div>
        <div class="col-6 col-sm-12">
          <DatePicker v-model="date" :mode="'date'"
                      :is-required="true"
                      :max-date="new Date()"
          />
        </div>
        <div class="col-2 col-sm-12">
        </div>
      </div>
    </form>
</template>

<script>
import { DatePicker } from 'v-calendar';

export default {
  name: 'HelloWorld',
  components: {
    DatePicker,
  },
  data() {
    return {
      date: new Date(),
    };
  },
  watch: {
    date() {
      console.log(this.date);
    },
  },
}
</script>

<style scoped>
.form-horizontal {
  width: 50%;
}
</style>
