<template>
    <div>
  
      <Navbar />
  
      <b-container fluid="md">
        <b-card class="bcard" no-body>
  
          <b-card-header class="bcardheaderblack" header-tag="nav">
  
            <back-button />
            <b class="titleart">Articulos</b>
  
          </b-card-header>
          <b-card-header class="bcardheader" header-tag="nav">
  
            <b-row>
  
              <div class="mt-3">
                <b-button-toolbar class="btn-toolbar float-end" aria-label="Toolbar with button groups and input groups">
                  <b-button-group size="sm" right class="btn-sm">
                    <button ref="listbutton" class="btn btn-primary"><b-icon icon="list-stars"
                        aria-hidden="true"></b-icon></button>
                    <button class="btn btn-primary" v-b-modal.modalAddArticulo><b-icon icon="plus-square"
                        aria-hidden="true"></b-icon></button>
  
                    <b-modal id="modalAddArticulo" ref="AddArticuloModal" hide-footer title="Add New Articulo">
  
                      <label class="form-label"><b>Código</b></label>
                      <input v-model="InputCodigo" class="form-control" type="Codigo" id="codigoInput" required
                        placeholder="Codigo">
  
                      <label class="form-label"><b>Nombre</b></label>
                      <input v-model="InputNombre" class="form-control" type="Nombre" id="nombreInput" required
                        placeholder="Nombre">
  
                      <label class="form-label"><b>Código de barras</b></label>
                      <input v-model="InputCodigoDeBarras" class="form-control" type="CodigoDeBarras" id="codigoDeBarrasInput" required
                        placeholder="Codigo De Barras">
  
                      <label class="form-label"><b>Unidad de Medida</b></label>
                      <input v-model="InputUnidadDeMedida" class="form-control" type="UnidadDeMedida" id="unidadDeMedidaInput" required
                        placeholder="Unidad De Medida">
  
                      <label class="form-label"><b>Stock Vendido</b></label>
                      <input v-model="InputStockVendido" class="form-control" type="StockVendido" id="stockVendidoInput" required
                        placeholder="Stock Vendido">
  
                      <label class="form-label"><b>Stock Minimo</b></label>
                      <input v-model="InputStockMinimoTitle" class="form-control" type="StockMinimo" id="stockMinimoInput" required
                        placeholder="Stock Minimo">

                      <label class="form-label"><b>Stock Máximo</b></label>
                      <input v-model="InputStockMaximoTitle" class="form-control" type="StockMaximo" id="stockMaximoInput" required
                        placeholder="Stock Maximo">
  
                    </b-modal>
  
  
                    <b-alert class="fixed-bottom" variant="success" v-model="SuccessAlert">Entry {{ alertMessage
                    }}</b-alert>
  
                    <button class="btn btn-warning" :disabled="selected.length === 0 && selected.length < 2"
                      v-b-modal.modalEditArticulo @click="ModifyElement">
                      <b-icon icon="pencil-fill" aria-hidden="true"></b-icon></button>
  
                    <b-modal id="modalEditArticulo" ref="ModifyModal" hide-footer title="Modify Articulo">
  
                        <label class="form-label"><b>Código</b></label>
                      <input v-model="InputCodigoModify" class="form-control" type="Codigo" id="codigoInput" required
                        placeholder="Codigo">
  
                        <label class="form-label"><b>Nombre</b></label>
                      <input v-model="InputNombreModify" class="form-control" type="Nombre" id="nombreInput" required
                        placeholder="Nombre">
  
                      <label class="form-label"><b>Código De Barras</b></label>
                      <input v-model="InputCodigoDeBarrasModify" class="form-control" type="CodigoDeBarras" id="codigoDeBarrasInput" required
                        placeholder="Codigo De Barras">
  
                      <label class="form-label"><b>Unidad De Medida</b></label>
                      <input v-model="InputUnidadDeMedidaModify" class="form-control" type="UnidadDeMedida" id="unidadDeMedidaInput"
                        required placeholder="UnidadDeMedida">
  
                      <label class="form-label"><b>Stock Vendido</b></label>
                      <input v-model="InputStockVendidoModify" class="form-control" type="StockVendido" id="stockVendidoInput" required
                        placeholder="Stock Vendido">
  
                      <label class="form-label"><b>Stock Mínimo</b></label>
                      <input v-model="InputStockMinimoModify" class="form-control" type="StockMinimo" id="stockMinimoInput" required
                        placeholder="Stock Minimo">

                      <label class="form-label"><b>Stock Máximo</b></label>
                      <input v-model="InputStockMaximoModify" class="form-control" type="StockMaximo" id="stockMaximoInput" required
                        placeholder="Stock Maximo">

  
                      <b-button block @click="hideModal">Cancel</b-button>
                      <b-button class="mr-2" variant="primary" @click="() => { SaveChanges(); ShowAlert(); }">Modificar
                        Articulo</b-button>
  
                    </b-modal>
  
  
                    <b-button variant="danger" block :disabled="!AllowEdit && selected.length === 0"
                      v-b-modal.modalDeleteArticulo>
                      <b-icon icon="trash-fill" aria-hidden="true"></b-icon></b-button>
  
                    <b-modal id="modalDeleteArticulo" ref="DeleteArticuloModal" hide-footer title="Delete Articulo">
  
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
        fields: ['Codigo', 'Nombre', 'CodigoDeBarras', 'UnidadDeMedida', 'StockVendiddo', 'StockMinimo', 'StockMaximo'],
        items: [
          { Codigo: '', Nombre: "", CodigoDeBarras: '', UnidadDeMedida: ' ', StockVendido: ' ', StockMinimo: ' ', StockMaximo: ' ' },
          { Codigo: '', Nombre: "", CodigoDeBarras: '', UnidadDeMedida: '', StockVendido: ' ', StockMinimo: ' ', StockMaximo: ' '}
        ],
        selected: [],
        unidadDeMedida: '',
        unidadDeMedidaState: null,
        sentData: [],
        showAddCondition: false,
        modes: ['single'],
        busy: false,
        InputId: null,
        InputNombre: null,
        InputCodigo: null,
        InputCodigoDeBarras: null,
        InputUnidadDeMedidaName: null,
        InputStockVendido: null,
        InputStockMinimo: null,
        InputStockMaximo: null,
        InputCodigoModify: null,
        InputNombreModify: null,
        InputCodigoDeBarrasModify: null,
        InputUnidadDeMedidaModify: null,
        InputStockVendidoModify: null,
        InputStockMinimoModify: null,
        InputStockMaximoModify: null,
        SuccessAlert: false,
        alertMessage: "",
      };
    },
  
  
    methods: {
      OpenClosemodal() {
        this.AddArticuloModal = false;
  
      },
      AllowEdit() {
        return this.selected.length > 0
      },
      Addnewelelement() {
        this.items.push({
          Id: + new Date(),
          Codigo: this.InputCodigo,
          Nombre: this.InputNombre,
          CodigoDeBarras: this.InputCodigoDeBarras,
          UnidadDeMedida: this.InputUnidadDeMedida,
          StockVendido: this.InputStockVendido,
          StockMinimo: this.InputStockMinimo,
          StockMaximo: this.InputStockMaximo,
        });
        this.hideModal()
        this.InputClean()
        this.alertMessage = "Articulo created"
      },
      ModifyElement() {
        console.log(this.InputNombreModify)
        console.log(this.selected[0].Nombre)
        console.log(this.selected[0].Codigo)
        console.log(this.selected[0].CodigoDeBarras)
        console.log(this.selected[0].UnidadDeMedida)
        console.log(this.selected[0].StockVendido)
        console.log(this.selected[0].StockMinimo)
        console.log(this.selected[0].StockMaximo)
        console.log(this.selected)
        this.InputNombreModify = this.selected[0].Nombre
        this.InputCodigoModify = this.selected[0].Codigo
        this.InputCodigoDeBarrasModify = this.selected[0].CodigoDeBarras
        this.InputUnidadDeMedidaModify = this.selected[0].UnidadDeMedida
        this.InputStockVendidoModify = this.selected[0].StockVendido
        this.InputStockMinimoModify = this.selected[0].StockMinimo
        this.InputStockMaximoModify = this.selected[0].StockMaximo
        this.alertMessage = "Articulo Modificado"
      },
      DeleteElement() {
        var index = this.items.indexOf(this.selected[0])
        this.items.splice(index, 1)
        this.hideModal()
        this.alertMessage = "Articulo eliminado"
      },
      SaveChanges() {
        var index = this.items.indexOf(this.selected[0])
        this.items[index].Nombre = this.InputNombreModify
        this.items[index].Codigo = this.InputCodigoModify
        this.items[index].CodigoDeBarras = this.InputCodigoDeBarrasModify
        this.items[index].UnidadDeMedida = this.InputUnidadDeMedidaModify
        this.items[index].StockVendido = this.InputStockVendidoModify
        this.items[index].StockMinimo = this.InputStockMinimoModify
        this.items[index].StockMaximo = this.InputStockMaximoModify
        this.hideModal()
      },
      onRowSelected(items) {
        if (!items) return;
        this.selected = items
  
      },
      hideModal() {
        this.$refs['modalAddArticulo'].hide();
        this.$refs['modalEditArticulo'].hide();
        this.$refs['modalDeleteArticulo'].hide();
      },
      InputClean() {
        //this.InputId = ""
        this.InputNombre = ""
        this.InputCodigo = ""
        this.InputCodigoDeBarras = ""
        this.InputUnidadDeMedida = ""
        this.InputStockVendido = ""
        this.InputStockMinimo = ""
        this.InputStockMaximo = ""
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
  
  .titleart {
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