<template>
  <div class="fullpage">
    <div class="container ">
      <div class="row ">
        <div class="col-md-6 ">
          <div class="card">
            <form @submit.prevent="onSubmit" class="box shadow">
              <h1>Login</h1>
              <p class="text-muted">Please enter your login and password!</p>
              <input type="text" placeholder="Username" v-model="name" />
              <small v-if="error" class="error-text"
                >Пожалуйта введите свое имя</small
              >
              <input type="submit" name="" value="Login" href="#" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      error: false
    };
  },
  methods: {
    onSubmit() {
      console.log("name=", this.name);
      // if(this.name.length !=0 && this.name === 'admin') {
      //     this.$store.commit('setName', this.name)
      //     this.$store.commit('login')
      //     this.$store.commit('isAdmin')
      //     this.$router.push('/admin')

      // } else if(this.name.length != 0){
      //  this.$store.commit('setName', this.name)
      //     this.$store.commit('login')
      //     this.$router.push('/user')
      // }
      //     else {
      //     this.error= true
      // }
      if (this.name == "admin") {
        this.$store.commit("login");
        this.$store.commit("setName", this.name);
        this.$router.push("/admin");
      } else if (this.name) {
        this.$store.commit("login");
        this.$store.commit("setName", this.name);
        this.$router.push("/user");
      } else {
        this.error = "Пожалуйста введите свое имя";
      }
    }
  }
};
</script>

<style scoped>
.fullpage {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  height: 100vh;
  background: linear-gradient(to right, #b92b27, #1565c0);
}

.card {
  margin-bottom: 20px;
  border: none;
}

.box {
  width: 500px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  background: #191919;
  text-align: center;
  transition: 0.25s;
  margin-top: 100px;
}

.box input[type="text"],
.box input[type="password"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 10px 10px;
  width: 250px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
}

.box h1 {
  color: white;
  text-transform: uppercase;
  font-weight: 500;
}

.box input[type="text"]:focus,
.box input[type="password"]:focus {
  width: 300px;
  border-color: #2ecc71;
}

.box input[type="submit"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #2ecc71;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}

.box input[type="submit"]:hover {
  background: #2ecc71;
}

.forgot {
  text-decoration: underline;
}

ul.social-network {
  list-style: none;
  display: inline;
  margin-left: 0 !important;
  padding: 0;
}

ul.social-network li {
  display: inline;
  margin: 0 5px;
}

.social-network a.icoFacebook:hover {
  background-color: #3b5998;
}

.social-network a.icoTwitter:hover {
  background-color: #33ccff;
}

.social-network a.icoGoogle:hover {
  background-color: #bd3518;
}

.social-network a.icoFacebook:hover i,
.social-network a.icoTwitter:hover i,
.social-network a.icoGoogle:hover i {
  color: #fff;
}

a.socialIcon:hover,
.socialHoverClass {
  color: #44bcdd;
}

.social-circle li a {
  display: inline-block;
  position: relative;
  margin: 0 auto 0 auto;
  border-radius: 50%;
  text-align: center;
  width: 50px;
  height: 50px;
  font-size: 20px;
}

.social-circle li i {
  margin: 0;
  line-height: 50px;
  text-align: center;
}

.social-circle li a:hover i,
.triggeredHover {
  transform: rotate(360deg);
  transition: all 0.2s;
}

.social-circle i {
  color: #fff;
  transition: all 0.8s;
  transition: all 0.8s;
}
.error-text {
  color: red;
}
</style>