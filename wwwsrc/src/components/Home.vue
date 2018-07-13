<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">Home
            <span class="sr-only">(current)</span>
          </a>
          <button type="button" class='btn btn-link' data-toggle="modal" data-target="#createKeepModal">Create Keep</button>
          <!-- Modal -->
          <div class="modal fade" id="createKeepModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Create a New Keep</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form v-on:submit.prevent="newKeep">
                    <div class="form-group">
                      <input type="text" name="keepTitle" v-model="
                            keep.title" class="form-control" id="formGroupExampleInput" placeholder="Title" required>
                    </div>
                    <div class="form-group">
                      <input type="text" name="keepDescription" v-model="
                                keep.description" class="form-control" id="formGroupExampleInput" placeholder="Description">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="button" @click="newKeep" class="btn btn-primary" data-dismiss="modal">Create Keep</button>
                </div>
              </div>
            </div>
          </div>
          <button @click="logout" type="button" class='btn btn-link'>Logout</button>
        </div>
      </div>
    </nav>
    <h1>
      <span class="headline">My Keeps</span>
    </h1>
    <div>

    </div>
  </div>
</template>

<script>
  import router from '../router'
  import keep from './Keep'
  export default {
    name: 'Home',
    components: {
      keep
    },
    mounted() {
      if (!this.$store.state.user._id) {
        router.push({ name: 'login' })
      }
      this.$store.dispatch('getKeeps')
    },
    data() {
      return {
        keep: {
          img: '',
          name: '',
          description: '',
          authorId: ''
        }
      }
    },
    computed: {
      keeps() {
        return this.$store.state.keeps
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      },
      newKeep() {
        this.$store.dispatch('addKeep', this.keep)
      },
      getKeeps() {
        this.$store.dispatch('geKeeps')
      },
      deleteKeep(keep) {
        this.$store.dispatch('deleteKeep', keep)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>