<template>
  <v-container>
    <v-row>
      <v-col align-self="center" md="6" offset-md="3">
        <v-card class="pa-2" outlined tile>
          <v-form ref="form" @submit.prevent="login">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :counter="10"
              :rules="passwordRules"
              label="Password"
              required
              type="password"
            ></v-text-field>

            <v-btn color="primary" class="mr-4" type="submit"> Login </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    async login() {
      try {
        let valid = this.$refs.form.validate();
        if (valid) {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
