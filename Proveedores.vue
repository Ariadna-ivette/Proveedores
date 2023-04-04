<template>
    <div>
  
      <Navbar />
  
      <b-container fluid="md">
        <b-card class="bcard" no-body>
  
          <b-card-header class="bcardheaderblack" header-tag="nav">
  
            <back-button />
            <b class="titleprov">Proveedores</b>
  
          </b-card-header>
          <b-card-header class="bcardheader" header-tag="nav">
  
            <b-row>
  
              <div class="mt-3">
                <b-button-toolbar class="btn-toolbar float-end" aria-label="Toolbar with button groups and input groups">
                  <b-button-group size="sm" right class="btn-sm">
                    <button ref="listbutton" class="btn btn-primary"><b-icon icon="list-stars"
                        aria-hidden="true"></b-icon></button>
                    <button class="btn btn-primary" v-b-modal.modalAddProveedor><b-icon icon="plus-square"
                        aria-hidden="true"></b-icon></button>
  
                    <b-modal id="modalAddProveedor" ref="AddProveedorModal" hide-footer title="Add New Proveedor">
  
                      <label class="form-label"><b>Id</b></label>
                      <input v-model="InputId" class="form-control" type="Id" id="idInput" required
                        placeholder="This field will be filled itself">
  
                      <label class="form-label"><b>Nombre</b></label>
                      <input v-model="InputNombre" class="form-control" type="Nombre" id="nombreInput" required
                        placeholder="Nombre">
  
                      <label class="form-label"><b>Dirección</b></label>
                      <input v-model="InputDireccion" class="form-control" type="Direccion" id="direccionInput" required
                        placeholder="Direccion">
  
                      <label class="form-label"><b>Teléfono</b></label>
                      <input v-model="InputTelefono" class="form-control" type="Telefono" id="telefonoInput" required
                        placeholder="Telefono">
  
                      <label class="form-label"><b>Correo Electrónico</b></label>
                      <input v-model="InputCorreoElectronico" class="form-control" type="CorreoElectronico" id="correoElectronicoInput" required
                        placeholder="Correo Electronico">
  
                      <label class="form-label"><b>RFC</b></label>
                      <input v-model="InputRFCTitle" class="form-control" type="RFC" id="rfcInput" required
                        placeholder="RFC">
  
                    </b-modal>
  
  
                    <b-alert class="fixed-bottom" variant="success" v-model="SuccessAlert">Entry {{ alertMessage
                    }}</b-alert>
  
                    <button class="btn btn-warning" :disabled="selected.length === 0 && selected.length < 2"
                      v-b-modal.modalEditProveedor @click="ModifyElement">
                      <b-icon icon="pencil-fill" aria-hidden="true"></b-icon></button>
  
                    <b-modal id="modalEditProveedor" ref="ModifyModal" hide-footer title="Modify Proveedor">
  
                      <label class="form-label"><b>Nombre</b></label>
                      <input v-model="InputNombreModify" class="form-control" type="Nombre" id="nombreInput" required
                        placeholder="Nombre">
  
                      <label class="form-label"><b>Dirección</b></label>
                      <input v-model="InputDireccionModify" class="form-control" type="Direccion" id="direccionInput" required
                        placeholder="Direccion">
  
                      <label class="form-label"><b>Teléfono</b></label>
                      <input v-model="InputTelefonoModify" class="form-control" type="Telefono" id="telefonoInput"
                        required placeholder="Telefono">
  
                      <label class="form-label"><b>Correo Electrónico</b></label>
                      <input v-model="InputCorreoElectronicoModify" class="form-control" type="CorreoElectronico" id="correoElectronicoInput" required
                        placeholder="Correo Electronico">
  
                      <label class="form-label"><b>RFC</b></label>
                      <input v-model="InputRFCModify" class="form-control" type="RFC" id="rfcInput"
                        required placeholder="RFC">

  
                      <b-button block @click="hideModal">Cancel</b-button>
                      <b-button class="mr-2" variant="primary" @click="() => { SaveChanges(); ShowAlert(); }">Modify
                        Proveedor</b-button>
  
                    </b-modal>
  
  
                    <b-button variant="danger" block :disabled="!AllowEdit && selected.length === 0"
                      v-b-modal.modalDeleteProveedor>
                      <b-icon icon="trash-fill" aria-hidden="true"></b-icon></b-button>
  
                    <b-modal id="modalDeleteProveedor" ref="DeleteProveedorModal" hide-footer title="Delete Proveedor">
  
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
        fields: ['Id', 'Nombre', 'Direccion', 'Telefono', 'CorreoElectronico', 'RFC'],
        items: [
          { Id: '', Nombre: "", Direccion: '', Telefono: ' ', CorreoElectronico: ' ', RFC: '' },
          { Id: '', Nombre: "", Direccion: '', Telefono: '', CorreoElectronico: ' ', RFC: '' }
        ],
        selected: [],
        telefono: '',
        telefonoState: null,
        sentData: [],
        showAddCondition: false,
        modes: ['single'],
        busy: false,
        InputId: null,
        InputNombre: null,
        InputDireccion: null,
        InputTelefonoName: null,
        InputCorreoElectronico: null,
        InputRFC: null,
        InputNombreModify: null,
        InputDireccionModify: null,
        InputTelefonoModify: null,
        InputCorreoElectronicoModify: null,
        InputRFCModify: null,
        SuccessAlert: false,
        alertMessage: "",
      };
    },
  
  
    methods: {
      OpenClosemodal() {
        this.AddProveedorModal = false;
  
      },
      AllowEdit() {
        return this.selected.length > 0
      },
      Addnewelelement() {
        this.items.push({
          Id: + new Date(),
          Nombre: this.InputNom,
          Direccion: this.InputDireccion,
          Telefono: this.InputTelefono,
          CorreoElectronico: this.InputCorreoElectronico,
          RFC: this.InputRFC,
        });
        this.hideModal()
        this.InputClean()
        this.alertMessage = "Proveedor created"
      },
      ModifyElement() {
        console.log(this.InputNombreModify)
        console.log(this.selected[0].Nombre)
        console.log(this.selected[0].Direccion)
        console.log(this.selected[0].Telefono)
        console.log(this.selected[0].CorreoElectronico)
        console.log(this.selected[0].RFC)
        console.log(this.selected)
        this.InputNombreModify = this.selected[0].Nombre
        this.InputDireccionModify = this.selected[0].Direccion
        this.InputTelefonoModify = this.selected[0].Telefono
        this.InputCorreoElecronicoModify = this.selected[0].CorreoElectronico
        this.InputRFCModify = this.selected[0].RFC
        this.alertMessage = "Proveedor Modified"
      },
      DeleteElement() {
        var index = this.items.indexOf(this.selected[0])
        this.items.splice(index, 1)
        this.hideModal()
        this.alertMessage = "Proveedor deleted"
      },
      SaveChanges() {
        var index = this.items.indexOf(this.selected[0])
        this.items[index].Nombre = this.InputNombreModify
        this.items[index].Direccion = this.InputDireccionModify
        this.items[index].Telefono = this.InputTelefonoModify
        this.items[index].CorreoElectronico = this.InputCorreoElectronicoModify
        this.items[index].RFC = this.InputRFCModify
        this.hideModal()
      },
      onRowSelected(items) {
        if (!items) return;
        this.selected = items
  
      },
      hideModal() {
        this.$refs['modalAddProveedor'].hide();
        this.$refs['modalEditProveedor'].hide();
        this.$refs['modalDeleteProveedor'].hide();
      },
      InputClean() {
        //this.InputId = ""
        this.InputNombre = ""
        this.InputDireccion = ""
        this.InputTelefono = ""
        this.InputCorreoElectronico = ""
        this.InputRFC = ""
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
  
  .titleprov {
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