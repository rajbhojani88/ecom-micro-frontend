<template>
  <v-container>
    <v-row>
      <v-col align="center" md="6" offset-md="3">
        <v-card class="pa-2" outlined tile>
          <template v-slot:header>
            <div>Word of the Day</div>
          </template>
          <v-form ref="regform" @submit.prevent="register">
            <v-text-field
              v-model="registerData.fullname"
              label="Full Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerData.email"
              :rules="registerData.emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerData.password"
              :counter="10"
              :rules="registerData.passwordRules"
              label="password"
              required
              type="Password"
            ></v-text-field>

            <v-btn color="primary" class="mr-4" type="submit"> Register </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      registerData: {
        fullname: "",
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
      },
    };
  },
  methods: {
    async register() {
      try {
        let valid = this.$refs.regform.validate();
        if (valid) {
          await this.$store.dispatch("register", {
            fullname: this.registerData.fullname,
            email: this.registerData.email,
            password: this.registerData.password,
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

<style></style>
