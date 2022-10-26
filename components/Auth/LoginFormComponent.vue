<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">
                Sign In
              </h5>
              <form class="form-signin" @submit.prevent="submit">
                <div class="form-label-group">
                  <input
                    id="inputEmail"
                    v-model="email"
                    type="email"
                    class="form-control"
                    placeholder="Email address"
                    required
                    autofocus
                  >
                  <label for="inputEmail">Email address</label>
                </div>
                <div class="form-label-group">
                  <input
                    id="inputPassword"
                    v-model="password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    required
                  >
                  <label for="inputPassword">Password</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input id="customCheck1" type="checkbox" class="custom-control-input">
                  <label class="custom-control-label" for="customCheck1">Remember password</label>
                </div>
                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                  Sign in
                </button>
                <hr class="my-4">
                <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit">
                  <font-awesome-icon :icon="['fab', 'google']" /> Sign in with Google
                </button>
                <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit">
                  <font-awesome-icon :icon="['fab', 'facebook']" /> Sign in with Facebook
                </button>
              </form>
              <div>
                No account yet?
                <NuxtLink to="/register">
                  Register here
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
