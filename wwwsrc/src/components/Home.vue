<template>
    <div>
        <nav class="navbar navbar-expand-lg text-light bg-dark">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">

                    <a class="nav-item nav-link active" href="#">Home
                        <span class="sr-only">(current)</span>
                    </a>
                    <a class="nav-item nav-link" data-toggle="modal" data-target="#createKeepModal" href="#">Create Keep</a>
                    <div class="modal fade" id="createKeepModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Create Keep</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form v-on:submit.prevent="createKeep">
                                        <div class="form-group">
                                            <input type="text" name="name" v-model="keep.name" class="form-control" id="formGroupExampleInput" placeholder="Name" required>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" name="description" v-model="keep.description" class="form-control" id="formGroupExampleInput" placeholder="Description">
                                        </div>
                                        <div class="form-group">
                                            <input type="text" name="img" v-model="keep.img" class="form-control" id="formGroupExampleInput" placeholder="Image">
                                        </div>
                                        <div class="dropdown">
                                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                Public or Private
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item" href="#">Public</a>
                                                <a class="dropdown-item" href="#">Private</a>
                                            </div>
                                            <button type="submit" @click="createKeep" class="btn btn1" data-dismiss="modal">Create Keep</button>
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="nav-item nav-link" data-toggle="modal" data-target="#createVaultModal" href="#">Create Vault</a>
                    <div class="modal fade" id="createVaultModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Create Vault</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form v-on:submit.prevent="createVault">
                                        <div class="form-group">
                                            <input type="text" name="name" v-model="vault.name" class="form-control" id="formGroupExampleInput" placeholder="Name" required>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" name="description" v-model="vault.description" class="form-control" id="formGroupExampleInput" placeholder="Description">
                                        </div>
                                        <!-- <div class="form-group">
                                            <input type="text" name="img" v-model="Vault.img" class="form-control" id="formGroupExampleInput" placeholder="Image">
                                        </div> -->
                                        <button type="submit" @click="createVault" class="btn btn1" data-dismiss="modal">Create Vault</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a @click="viewProfile" class="nav-item nav-link" href="#/Profile">My Profile</a>
                    <a @click='logout' class="nav-item nav-link" href="#">Log Out</a>

                </div>
            </div>
        </nav>
        <div class="keepbody">
            <h1>Welcome to KEEPR</h1>
            <h2>If you like an image, add it to your VAULT</h2>

            <div class="modal fade" id="viewKeepModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{viewKeep.name}}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img :src="viewKeep.img" alt="">
                            <h3>{{viewKeep.description}}</h3>
                            <button class="btn" @click="addToVault(keep)">Add to Vault </button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 d-flex justify-content-around flex-wrap">
                        <div v-for="keep in keeps" :key="keep.id" class="card mb-4 text-center">
                            <h3 class="card-text">{{keep.name}}</h3>
                            <h3 class="card-text">{{keep.description}}</h3>
                            <div class="container">
                                <img :src="keep.img" alt="">
                                <button class="btn" data-toggle="modal" data-target="#viewingKeepModal" @click="addView(keep)">View</button>
                                <!-- <button class="btn" @click="addToVault(keep)">Add to Vault </button> -->
                                <button class="btn2">Saves: {{keep.saves}}</button>
                                <button class="btn3">Views:{{keep.views}}</button>
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
        name: 'Home',
        components: {
        },
        data() {
            return {
                keep: {
                    name: '',
                    description: '',
                    img: '',
                    views: 0,
                    keeps: 0,
                    userId: '',
                    private: 0,
                },
                publicSetting: "Public",
                home: true,
                profile: false,
                show: 0,
                viewKeep: {},
                vault: {
                    name: '',
                    description: ''
                },
                viewKeep: {

                }
                // vault: {
                //     name: "",
                //     description: "",
                // }
            }
        },
        mounted() {
            this.$store.dispatch("getKeeps")
            this.$store.dispatch("getVaults")
        },

        computed: {
            user() {
                return this.$store.state.user
            },
            keeps() {
                return this.$store.state.keeps
            },
            vaults() {
                return this.$store.state.vaults
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            createKeep() {
                console.log(this.keep)
                this.$store.dispatch('addKeep', this.keep)
            },
            viewProfile() {
                router.push({ name: 'Profile' })
            },
            createVault() {
                console.log(this.vault)
                this.$store.dispatch('addVault', this.vault)
            },
            addView(keep) {
                keep.views++
                this.$store.dispatch('updateKeep', keep)
                this.viewKeep = keep
                $('#viewKeepModal').modal('show')

            }
        }
    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    img {
        height: 50vh;
        width: 35vh;
    }

    .keepbody {
        background-image: url("../assets/stars2.jpg");
        background-size: 100%;
        

    }

    h1 {
        color: rgb(209, 186, 186)
    }

    h2 {
        color: rgb(209, 186, 186)
    }

    .container {
        position: relative;
    }

    .container .btn {
        position: absolute;
        top: 95%;
        left: 15%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        background-color: rgb(204, 198, 198);
        color: blue;
        font-size: 16px;
        /* padding: 12px 24px; */
        border: none;
        cursor: pointer;
        border-radius: 5px;
        height: 40px;
        text-align: center;
    }

    .container .btn2 {
        position: absolute;
        top: 95%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        background-color: rgb(204, 198, 198);
        color: blue;
        font-size: 16px;
        /* padding: 12px 24px; */
        border: none;
        cursor: pointer;
        border-radius: 5px;
        height: 40px;
        text-align: center;
    }

    .container .btn3 {
        position: absolute;
        top: 95%;
        left: 85%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        background-color: rgb(204, 198, 198);
        color: blue;
        font-size: 16px;
        /* padding: 12px 24px; */
        border: none;
        cursor: pointer;
        border-radius: 5px;
        height: 40px;
        text-align: center;
    }

    .container .btn:hover {
        background-color: black;
    }
</style>