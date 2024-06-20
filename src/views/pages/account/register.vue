<template>
  <div>
    <div class="home-btn d-none ">
      <router-link to="/">
        <i class="mdi mdi-home-variant h2 text-white"></i>
      </router-link>
    </div>
    <div>
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-lg-4">
            <div class="authentication-page-content p-4 d-flex align-items-center ">
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

                        <h4 class="font-size-18 pt-4">Register account</h4>
                        <p class="text-muted">Get your free E-com account now.</p>
                      </div>

                      <div class="p-2 pt-5">
                        <b-alert v-model="registerSuccess" class="pt-3" variant="success" dismissible>Registration
                          successful.</b-alert>

                        <b-alert v-model="isRegisterError" class="pt-3" variant="danger" dismissible>{{ regError
                          }}</b-alert>

                        <form class="form-horizontal" @submit.prevent="tryToRegisterIn">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-user-2-line auti-custom-input-icon"></i>
                            <label for="username">Business Name</label>
                            <input v-model="user.business_name" type="text" class="form-control" id="business_name"
                              placeholder="Enter business name" />
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="useremail">Email</label>
                            <input v-model="user.email" type="email" class="form-control" id="useremail"
                              placeholder="Enter email" />
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-lock-2-line auti-custom-input-icon"></i>
                            <label for="userpassword">Password</label>
                            <input v-model="user.password" type="password" class="form-control" id="userpassword"
                              placeholder="Enter password" />
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-phone-line auti-custom-input-icon"></i>
                            <label for="phonenumber">Phone Number</label>
                            <input v-model="user.phone_number" type="text" class="form-control" id="phonenumber"
                              placeholder="Enter phone number" />
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-map-pin-line auti-custom-input-icon"></i>
                            <label for="address">Address</label>
                            <input v-model="user.address" type="text" class="form-control" id="address"
                              placeholder="Enter address" />
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-money-dollar-circle-line auti-custom-input-icon"></i>
                            <label for="paymentinfo">Payment Information</label>
                            <input v-model="user.payment_information" type="text" class="form-control" id="paymentinfo"
                              placeholder="Enter payment information" />
                          </div>
                          <div class="">

                            <div class="form-group auth-form-group-custom ">
                              <label for="termsagreement">
                                <input v-model="user.terms_agreement" type="checkbox" id="termsagreement" />
                                I agree to the terms and conditions
                              </label>
                            </div>
                            <div class="text-center pt-5">
                              <button class="btn btn-primary w-md waves-effect waves-light"
                                type="submit">Register</button>
                            </div>
                          </div>



                          <div class="pt-4 text-center">
                            <p class="mb-0">
                              By registering you agree to the E-com
                              <a href="#" class="text-primary">Terms of Use</a>
                            </p>
                          </div>
                        </form>
                      </div>

                      <div class="pt-5 text-center">
                        <p>
                          Already have an account ?
                          <router-link tag="a" to="/login" class="font-weight-medium text-primary">Login</router-link>
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
import { ref, reactive, onMounted } from 'vue';
import { required, email, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useRouter } from 'vue-router';
import axios from 'axios';

const user = reactive({
  business_name: '',
  email: '',
  password: '',
  phone_number: '',
  address: '',
  payment_information: '',
  terms_agreement: false
});

const submitted = ref(false);
const regError = ref(null);
const tryingToRegister = ref(false);
const isRegisterError = ref(false);
const registerSuccess = ref(false);

const router = useRouter();

const rules = {
  user: {
    business_name: { required: helpers.withMessage('Business name is required', required) },
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Please enter a valid email', email),
    },
    password: { required: helpers.withMessage('Password is required', required) },
    phone_number: { required: helpers.withMessage('Phone number is required', required) },
    address: { required: helpers.withMessage('Address is required', required) },
    payment_information: { required: helpers.withMessage('Payment information is required', required) },
    terms_agreement: { required: helpers.withMessage('You must agree to the terms', required) },
  },
};

const v$ = useVuelidate(rules, { user });

onMounted(() => {
  document.body.classList.add('auth-body-bg');
});

const register = () => {
  console.log(user);
  axios.post('/merchants/signup/',
    {
      business_name: user.business_name,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
      address: user.address,
      payment_information: user.payment_information,
      terms_agreement: user.terms_agreement
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
    .then(response => {
      router.push({ name: 'login-1' });

    })
    .catch(error => {
      regError.value = 'Username already exists or other registration error';
      isRegisterError.value = true;
      tryingToRegister.value = false;
    });
}

const tryToRegisterIn = async () => {
  v$.value.$touch();
  if (v$.value.$error) {
    return;
  }
  tryingToRegister.value = true;
  await register();
};
</script>


<style scoped>
/* Add your styles here */
</style>
