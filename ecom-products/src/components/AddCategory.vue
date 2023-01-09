<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        <v-icon left>
        mdi-plus
      </v-icon>Category
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Category</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="catform">
            <v-text-field
              v-model="categoryData.name"
              label="Name"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="addCategory">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    nameRules: [v => !!v || "Name is required"],
    categoryData: {
      name: ""
    }
  }),
  methods: {
    async addCategory() {
      let valid = this.$refs.catform.validate();
      if (valid) {
        this.dialog = false;
        await this.$store.dispatch("addCategory", this.categoryData);
        await this.$store.dispatch("getAllCategory");
      }
    }
  }
};
</script>

<style></style>
