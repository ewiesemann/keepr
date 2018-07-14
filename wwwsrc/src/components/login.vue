<template>
    <div class="fullscreen">
        <div class="home container-fluid">
            <div class="main-top-style">
                <h1>Welcome to KEEPR</h1>
                <!-- Login Modal -->
                <button type="button" class="btn btn1 mt-1 btnwidth2 mr-4" data-toggle="modal" data-target="#loginModal">Login</button>
                <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form v-on:submit.prevent="ownerLogin">
                                    <div class="form-group">
                                        <input type="text" name="ownerUsername" v-model="
                                      login.username" class="form-control" id="formGroupExampleInput" placeholder="Username"
                                            required>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="password" v-model="
                                          login.password" class="form-control" id="formGroupExampleInput" placeholder="Password">
                                    </div>
                                    <button type="button" @click="ownerLogin" class="btn btn1" data-dismiss="modal">Login</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Register Modal -->
                <button type="button" class="btn btn1 mt-1 btnwidth2 ml-4" data-toggle="modal" data-target="#registerModal">Register</button>
                <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form v-on:submit.prevent="ownerRegister">
                                    <div class="form-group">
                                        <input type="text" name="username" v-model="register.username" class="form-control" id="formGroupExampleInput" placeholder="Username"
                                            required>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="businessName" v-model="register.businessName" class="form-control" id="formGroupExampleInput" placeholder="Business Name"
                                            required>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="email" v-model="register.email" class="form-control" id="formGroupExampleInput" placeholder="email">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="password" v-model="register.password" class="form-control" id="formGroupExampleInput" placeholder="Password">
                                    </div>
                                    <button type="button" @click="ownerRegister" class="btn btn1" data-dismiss="modal">Register</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import router from '../router'
    export default {
        name: '',
        components: {

        },
        data() {
            return {
                login: {
                    username: '',
                    password: ''
                },
                register: {
                    username: '',
                    email: '',
                    password: '',
                },
            }
        }
    }
</script>

<style>
</style>