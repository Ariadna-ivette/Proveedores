<template>
    <div>
  
      <Navbar />
  
      <b-container fluid="md">
        <b-card class="bcard" no-body>
  
          <b-card-header class="bcardheaderblack" header-tag="nav">
  
            <back-button />
            <b class="titlealm">Almacén</b>
  
          </b-card-header>
          <b-card-header class="bcardheader" header-tag="nav">
  
            <b-row>
  
              <div class="mt-3">
                <b-button-toolbar class="btn-toolbar float-end" aria-label="Toolbar with button groups and input groups">
                  <b-button-group size="sm" right class="btn-sm">
                    <button ref="listbutton" class="btn btn-primary"><b-icon icon="list-stars"
                        aria-hidden="true"></b-icon></button>
                    <button class="btn btn-primary" v-b-modal.modalAddAlmacen><b-icon icon="plus-square"
                        aria-hidden="true"></b-icon></button>
  
                    <b-modal id="modalAddAlmacen" ref="AddAlmacenModal" hide-footer title="Add New Almacen">
  
                      <label class="form-label"><b>Código</b></label>
                      <input v-model="InputCodigo" class="form-control" type="Codigo" id="codigoInput" required
                        placeholder="Codigo">
  
                      <label class="form-label"><b>Nombre</b></label>
                      <input v-model="InputNombre" class="form-control" type="Nombre" id="nombreInput" required
                        placeholder="Nombre">
  
                    </b-modal>
  
  
                    <b-alert class="fixed-bottom" variant="success" v-model="SuccessAlert">Entry {{ alertMessage
                    }}</b-alert>
  
                    <button class="btn btn-warning" :disabled="selected.length === 0 && selected.length < 2"
                      v-b-modal.modalEditAlmacen @click="ModifyElement">
                      <b-icon icon="pencil-fill" aria-hidden="true"></b-icon></button>
  
                    <b-modal id="modalEditAlmacen" ref="ModifyModal" hide-footer title="Modify Almacen">
  
                        <label class="form-label"><b>Código</b></label>
                      <input v-model="InputCodigoModify" class="form-control" type="Codigo" id="codigoInput" required
                        placeholder="Codigo">
  
                        <label class="form-label"><b>Nombre</b></label>
                      <input v-model="InputNombreModify" class="form-control" type="Nombre" id="nombreInput" required
                        placeholder="Nombre">

  
                      <b-button block @click="hideModal">Cancel</b-button>
                      <b-button class="mr-2" variant="primary" @click="() => { SaveChanges(); ShowAlert(); }">Modify
                        Almacen</b-button>
  
                    </b-modal>
  
  
                    <b-button variant="danger" block :disabled="!AllowEdit && selected.length === 0"
                      v-b-modal.modalDeleteAlmacen>
                      <b-icon icon="trash-fill" aria-hidden="true"></b-icon></b-button>
  
                    <b-modal id="modalDeleteAlmacen" ref="DeleteAlmacenModal" hide-footer title="Delete Almacen">
  
                      <label class="form-label"><b>Do you want to delete row?</b></label>
  
                      <b-button block @click="hideModal">Cancel</b-button>
                      <b-button class="mr-2" variant="danger" @click="() => { DeleteElement(); ShowAlert(); }">Delete
                      </b-button>
  
                    </b-modal>
  
  
  
                  </b-button-group>
                </b-button-toolbar>
  
              </div>
  
            </b-row>
  
          </b-card-header>
  
  
  
          <b-card-body>
            <b-table border-color="black" select-mode="single" :items="items" :fields="fields" selectable
              @row-selected="onRowSelected" class="selectableTable"></b-table>
            <!--    <p>Selected rows: {{ selected }}</p>  -->
  
          </b-card-body>
        </b-card>
      </b-container>
  
    </div>
  </template>
    
    
  <script>
  import BackButton from '../components/BackButton.vue';
  import Navbar from '../components/Navbar.vue';
  
  
  // import { Api } from '@/Api'
  
  export default {
    components: {
      BackButton,
      Navbar
    },
    /*  mounted() {
         Api.get(``)
         .then((response) => {
             console.log(response)
             this.items = response.data
         })
         .catch((error) => {
             console.log(error)
         })
     }, */
    data() {
      return {
        fields: ['Codigo', 'Nombre' ],
        items: [
          { Codigo: '', Nombre: "" },
          { Codigo: '', Nombre: "" }
        ],
        selected: [],
        nombre: '',
        nombreState: null,
        sentData: [],
        showAddCondition: false,
        modes: ['single'],
        busy: false,
        InputCodigo: null,
        InputNombre: null,
        InputNombreModify: null,
        InputCodigoModify: null,
        SuccessAlert: false,
        alertMessage: "",
      };
    },
  
  
    methods: {
      OpenClosemodal() {
        this.AddAlmacenModal = false;
  
      },
      AllowEdit() {
        return this.selected.length > 0
      },
      Addnewelelement() {
        this.items.push({
          Nombre: this.InputNombre,
          Codigo: this.InputCodigo,
        });
        this.hideModal()
        this.InputClean()
        this.alertMessage = "Almacen created"
      },
      ModifyElement() {
        console.log(this.InputNombreModify)
        console.log(this.selected[0].Nombre)
        console.log(this.selected[0].Codigo)
        console.log(this.selected)
        this.InputNombreModify = this.selected[0].Nombre
        this.InputCodigoModify = this.selected[0].Codigo
        this.alertMessage = "Almacen Modified"
      },
      DeleteElement() {
        var index = this.items.indexOf(this.selected[0])
        this.items.splice(index, 1)
        this.hideModal()
        this.alertMessage = "Almacen deleted"
      },
      SaveChanges() {
        var index = this.items.indexOf(this.selected[0])
        this.items[index].Nombre = this.InputNombreModify
        this.items[index].Codigo = this.InputCodigoModify
        this.hideModal()
      },
      onRowSelected(items) {
        if (!items) return;
        this.selected = items
  
      },
      hideModal() {
        this.$refs['modalAddAlmacen'].hide();
        this.$refs['modalEditAlmacen'].hide();
        this.$refs['modalDeleteAlmacen'].hide();
      },
      InputClean() {
        this.InputNombre = ""
        this.InputCodigo = ""
      },
      ShowAlert() {
        this.SuccessAlert = true;
        this.mounted()
      },
      mounted() {
        // sirve para desactivar la alerta después de 5 segundos
        setTimeout(() => {
          this.SuccessAlert = false;
        }, 5000);
  
      }
    }
  };
  
  </script>
  
  <style>
  .button-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .bcardheaderblack {
    background: #303030;
    border: 1px solid #767676;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  
  .cb-1 {
    border-top-color: black;
  }
  
  .title {
    position: absolute;
    width: 130px;
    height: 34px;
    left: 122px;
    top: 38px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: normal;
    color: #FFFFFF;
  }
  
  .bcard {
    width: 95%;
    height: 95%;
  }
  
  .titlealm {
    position: relative;
    width: 50px;
    height: 49px;
    left: 75%;
    top: 30%;
  
    font-family: Arial, Helvetica, sans-serif;
    font-style: normal;
    color: #FFFFFF;
  }
  
  .selectableTable {
    border-color: #767676;
    border-top-color: black;
  }
  
  .btn-toolbar {
    float: end;
    border-bottom-color: black;
  }
  </style>