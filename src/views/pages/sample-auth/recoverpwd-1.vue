<script>
export default {};
</script>

<template>
  <div>
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

                        <h4 class="font-size-18 mt-4">Reset Password</h4>
                        <p class="text-muted">Reset your password to E-com.</p>
                      </div>

                      <div class="p-2 mt-5">
                        <div class="alert alert-success mb-4" role="alert">Enter your Email and instructions will be
                          sent to you!</div>
                        <form class="form-horizontal">
                          <div class="auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label class="form-label" for="useremail">Email</label>
                            <input type="email" class="form-control" id="useremail" placeholder="Enter email" />
                          </div>

                          <div class="mt-4 text-center">
                            <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Reset</button>
                          </div>
                        </form>
                      </div>

                      <div class="mt-5 text-center">
                        <p>
                          Don't have an account ?
                          <router-link tag="a" to="/auth/login-1" class="font-weight-medium text-primary">Log
                            in</router-link>
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