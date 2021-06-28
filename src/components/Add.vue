<template>
  <p class="pt-2">
    To generate a certificate, complete the form below.
    <br />
    Identification code will be automatically generated.
  </p>
  <div class="form-horizontal p-centered">
    <div class="form-group">
      <div class="col-2 col-sm-12"></div>
      <div class="col-2 col-sm-12">
        <label class="form-label" for="f_name">First Name</label>
      </div>
      <div class="col-6 col-sm-12">
        <input
          class="form-input"
          type="text"
          id="f_name"
          placeholder="John"
          v-model="f_name"
        />
      </div>
      <div class="col-2 col-sm-12"></div>
    </div>
    <div class="form-group">
      <div class="col-2 col-sm-12"></div>
      <div class="col-2 col-sm-12">
        <label class="form-label" for="l_name">Last Name</label>
      </div>
      <div class="col-6 col-sm-12">
        <input
          class="form-input"
          type="text"
          id="l_name"
          placeholder="Doe"
          v-model="l_name"
        />
      </div>
      <div class="col-2 col-sm-12"></div>
    </div>
    <div class="form-group">
      <div class="col-2 col-sm-12"></div>
      <div class="col-2 col-sm-12">
        <label class="form-label" for="mother_name">Mother</label>
      </div>
      <div class="col-6 col-sm-12">
        <input
          class="form-input"
          type="text"
          id="mother_name"
          placeholder="Marry"
          v-model="mother"
        />
      </div>
      <div class="col-2 col-sm-12"></div>
    </div>
    <div class="form-group">
      <div class="col-2 col-sm-12"></div>
      <div class="col-2 col-sm-12">
        <label class="form-label" for="father_name">Father</label>
      </div>
      <div class="col-6 col-sm-12">
        <input
          class="form-input"
          type="text"
          id="father_name"
          placeholder="Mike"
          v-model="father"
        />
      </div>
      <div class="col-2 col-sm-12"></div>
    </div>
    <div class="form-group">
      <div class="col-2 col-sm-12"></div>
      <div class="col-2 col-sm-12">
        <label class="form-label">Birth Date</label>
      </div>
      <div class="col-6 col-sm-12">
        <DatePicker
          v-model="date"
          :mode="'date'"
          :is-required="true"
          :max-date="new Date()"
        />
      </div>
      <div class="col-2 col-sm-12"></div>
    </div>
    <button class="btn btn-primary"
            :class="!this.canSave ? 'tooltip': ''"
            @click="save()"
            :data-tooltip="buttonTooltip"
            :disabled="!canSave">Save</button>
  </div>
</template>

<script>
import { API_URL, API_SAVE } from "../utils/constants";
import { DatePicker } from "v-calendar";

export default {
  name: "Add",
  components: {
    DatePicker
  },
  data() {
    return {
      date: new Date(),
      f_name: null,
      l_name: null,
      mother: null,
      father: null
    };
  },
  computed: {
    canSave() {
      return (
        this.f_name && this.l_name && this.mother && this.father && this.date
      );
    },
    buttonTooltip() {
      return this.canSave ? null : 'All inputs are required';
    },
  },
  methods: {
    async save() {
      let url = API_URL + API_SAVE;

      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: this.date,
          f_name: this.f_name,
          l_name: this.l_name,
          mother: this.mother,
          father: this.father,
        })
      });
      const content = await rawResponse.json();
      if (content.status === 0) {
        this.date = new Date();
        this.f_name = null;
        this.l_name = null;
        this.mother = null;
        this.father = null;
      }
    },
  },
};
</script>
