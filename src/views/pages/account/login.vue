<template>
  <div>
    <div class="home-btn d-none ">
      <router-link to="/">
        <i class="mdi mdi-home-variant h2 text-white"></i>
      </router-link>
    </div>
    <div>
      <div class="container-fluid p-0">
        <div class="row g-0">
          <div class="col-lg-4">
            <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <div>
                      <div class="text-center">
                        <div>
                          <router-link to="/" class="logo">
                            <img src="@/assets/images/logo.png" height="20" alt="logo" />
                          </router-link>
                        </div>

                        <h4 class="font-size-18 mt-4">Welcome Back !</h4>
                        <p class="text-muted">Sign in to continue to E-com.</p>
                      </div>

                      <div class="p-2 mt-5">
                        <form class="form-horizontal" @submit.prevent="postlogin">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="email">Email</label>
                            <input type="email" v-model="form.email" class="form-control" id="email"
                              placeholder="Enter email" />
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-lock-2-line auti-custom-input-icon"></i>
                            <label for="userpassword">Password</label>
                            <input v-model="form.password" type="password" class="form-control" id="userpassword"
                              placeholder="Enter password" />
                          </div>

                          <div class="form-check custom-checkbox">
                            <input type="checkbox" class="form-check-input" id="customControlInline" />
                            <label class="form-check-label" for="customControlInline">Remember me</label>
                          </div>

                          <div class="mt-4 text-center">
                            <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
                          </div>

                          <div class="mt-4 text-center">
                            <router-link tag="a" to="/forgot-password" class="text-muted">
                              <i class="mdi mdi-lock me-1"></i> Forgot your password?
                            </router-link>
                          </div>
                        </form>
                      </div>

                      <div class="mt-5 text-center">
                        <p>
                          Don't have an account ?
                          <router-link tag="a" to="/register"
                            class="font-weight-medium text-primary">Register</router-link>
                        </p>
                        <p>

                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="authentication-bg">
              <div class="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from "@vuelidate/validators";
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

// Reactive references for email, password, and form submission state
const form = reactive({
  email: "",
  password: "",
  submitted: false,
});
const password = ref("");
const submitted = ref(false);

// Lifecycle hook to add class to body when component is mounted
onMounted(() => {
  document.body.classList.add("auth-body-bg");
});

// Validation rules for email and password fields
const rules = {
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Please enter a valid email", email),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
  },
};

// Create a Vuelidate instance for validation
const v$ = useVuelidate(rules, { email, password });

const postlogin = async () => {

  const response = await axios.post('/merchants/login/', {
    email_or_phone: form.email,
    password: form.password
  },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })


    .then(response => {
      localStorage.setItem('token-access', response.data.access);
      localStorage.setItem('token-refresh', response.data.refresh);
      router.push('/');

    })
    .catch(error => {
      regError.value = 'Username already exists or other registration error';
      isRegisterError.value = true;
      tryingToRegister.value = false;
    });

};

// Function to handle form submission and login request
const tryToLogIn = async () => {
  submitted.value = true;
  v$.value.$touch();

  // Check if form is valid
  if (v$.value.$invalid) {
    return;
  } else {
    postlogin();
  }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
