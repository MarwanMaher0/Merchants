<script>
export default {};
</script>

<template>
  <div>
    <div class="container-fluid">
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

                      <h4 class="font-size-18 mt-4">Register account</h4>
                      <p class="text-muted">Get your free E-com account now.</p>
                    </div>

                    <div class="p-2 mt-5">

                      <form class="form-horizontal">
                        <div class="auth-form-group-custom mb-4">
                          <i class="ri-user-2-line auti-custom-input-icon"></i>
                          <label class="from-label" for="username">Username</label>
                          <input type="text" class="form-control" id="username" placeholder="Enter username" />
                        </div>

                        <div class="auth-form-group-custom mb-4">
                          <i class="ri-mail-line auti-custom-input-icon"></i>
                          <label class="from-label" for="useremail">Email</label>
                          <input type="email" class="form-control" id="useremail" placeholder="Enter email" />
                        </div>

                        <div class="auth-form-group-custom mb-4">
                          <i class="ri-lock-2-line auti-custom-input-icon"></i>
                          <label class="from-label" for="userpassword">Password</label>
                          <input type="password" class="form-control" id="userpassword" placeholder="Enter password" />
                        </div>

                        <div class="text-center">
                          <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Register</button>
                        </div>

                        <div class="mt-4 text-center">
                          <p class="mb-0">
                            By registering you agree to the E-com
                            <a href="#" class="text-primary">Terms of Use</a>
                          </p>
                        </div>
                      </form>
                    </div>

                    <div class="mt-5 text-center">
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
</template>