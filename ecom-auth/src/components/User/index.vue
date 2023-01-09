<template>
  <v-container fluid>
    <v-layout column>
      <v-card>
        <v-card-text>
          <v-flex class="mb-4">
            <v-avatar color="red">
              <span class="text-h5">{{
                getUserInfo.fullname.substring(0, 1)
              }}</span>
            </v-avatar>
          </v-flex>
          <v-text-field
            v-model="getUserInfo.fullname"
            label="FullName"
          ></v-text-field>
          <v-text-field
            v-model="getUserInfo.email"
            label="Email Address"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary">
            <v-icon left dark>check</v-icon>
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  pageTitle: "My Profile",
  async mounted() {
    await this.$store.dispatch("authUser");
  },
  computed: {
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
};
</script>
