<template>
    <div class="background-container">
    <div class=" container text-dark">
      <div class="row justify-content-md-center">
        <div class="col-md-4 p-2 login justify-content-md-center">
          <h1 class="h3 mb-3 font-weight-normal text-center">Please sign in</h1>


          <p v-if="incorrectAuth">Incorrect credentials - please try again</p>
          <form v-on:submit.prevent="login">
  <div class="mb-3">
    
<input type="email" placeholder="Email" name="email" v-model="email" id="user"  autocomplete="off" class="form-control">
  </div>
  <div class="mb-3">
    <input type="password" name="password" id="pass" v-model="password" class="form-control" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
          
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    name: 'login',
    data(){
        return {
            email:'',
            password: '',
            incorrectAuth: false,
        }
    },

 methods: {
    login(){
      this.$store.dispatch('userLogin', {
        email: this.email,
        password: this.password,
      })
      .then(() => {
        this.$router.push({ name: 'dashboard' })
       
      })
      .catch(err => {
        this.incorrectAuth = true
      })
    }
 }
}

</script>

<style>
 
.background-container {
background-image: url('../assets/background.jpg'); 
background-size: cover;
background-position: center;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
}

  .login{
    background-color:#fff;
    
  }
  input {
    padding: 25px 10px;
}
</style>