<template>
  <div id="app" class="container bg-light">
    <h1 class="pt-4">CRUD usando Vue.js, Axios e Firebase</h1>
    <b-card>
      <b-form-group label="Nome:">
        <b-form-input placeholder="Digite seu nome" v-model="usuario.nome" type="text" size="lg"></b-form-input>
      </b-form-group>

      <b-form-group label="Email:">
        <b-form-input
          @keydown.enter="salvarDados"
          placeholder="Digite seu e-mail"
          v-model="usuario.email"
          type="email"
          size="lg"
        ></b-form-input>
      </b-form-group>

      <hr />

      <b-button @click="salvarDados" class="w-100 mt-1" variant="info">Salvar</b-button>
    </b-card>

    <hr class="bg-dark" />

    <h3 v-if="usuarios">Usuários</h3>

    <b-list-group>
      <b-list-group-item v-for="(usuario, id) in usuarios" :key="id">
        <strong>Nome:</strong>
        {{ usuario.nome }}
        <br />

        <strong>E-mail:</strong>
        {{ usuario.email }}
        <br />

        <strong>ID:</strong>
        {{ id }}
        <br />

        <b-button @click="carregarForm(id)" class="mt-1 w-100" variant="warning">Editar</b-button>

        <b-button @click="deletarUsuario(id)" class="mt-1 w-100" variant="danger">Deletar</b-button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  data: () => ({
    usuarios: [],

    id: null,

    usuario: {
      nome: "",
      email: ""
    }
  }),

  created() {
    this.obterUsuarios();
  },

  methods: {
    limparForm() {
      this.usuario = {
        nome: "",
        email: ""
      };

      this.id = null;
    },

    salvarDados() {
      const metodo = this.id ? "patch" : "post";
      const finalUrl = this.id ? `/${this.id}.json` : ".json";

      this.$httpClient[metodo](`/usuarios${finalUrl}`, this.usuario)
        .then(() => {
          this.limparForm();

          this.$swal({
            icon: "success",
            title: "Sucesso",
            text:
              metodo == "patch"
                ? "O usuário foi alterado com sucesso!"
                : "O usuário foi salvo com sucesso!"
          });

          this.obterUsuarios();
        })
        .catch(() => {
          this.$swal({
            icon: "error",
            title: "Ops...",
            text: "Algum problema ocorreu durante a sua requisição :("
          });
        });
    },

    obterUsuarios() {
      this.$httpClient.get("usuarios.json").then(resp => {
        this.usuarios = resp.data;
      });
    },

    carregarForm(userID) {
      this.id = userID;
      this.usuario = { ...this.usuarios[userID] };
    },

    deletarUsuario(userID) {
      this.$swal({
        icon: "warning",
        title: "Tem certeza?",
        text:
          "Uma vez deletado, você não terá como recuperar os dados deste usuário!",
        buttons: {
          cancel: "Cancelar",
          ok: {
            text: "Sim, tenho certeza",
            value: true
          }
        },
        dangerMode: true
      }).then(value => {
        if (value) {
          this.$httpClient.delete(`/usuarios/${userID}.json`).then(() => {
            this.limparForm();
            this.obterUsuarios();
          });

          this.$swal({
            icon: "success",
            title: "Okay",
            text: "O usuário foi excluído com sucesso!"
          });
        } else {
          this.$swal("O usuário não foi excluído :)");
        }
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.5rem;
}

#app h1 {
  text-align: center;
  margin: 50px;
}
</style>
