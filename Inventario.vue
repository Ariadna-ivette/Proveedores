<template>
    <div>
  
      <Navbar />
  
      <b-container fluid="md">
        <b-card class="bcard" no-body>
  
          <b-card-header class="bcardheaderblack" header-tag="nav">
  
            <back-button />
            <b class="titleinv">Inventario</b>
  
          </b-card-header>
          <b-card-header class="bcardheader" header-tag="nav">
  
            <b-row>
  
              <div class="mt-3">
                <b-button-toolbar class="btn-toolbar float-end" aria-label="Toolbar with button groups and input groups">
                  <b-button-group size="sm" right class="btn-sm">
                    <button ref="listbutton" class="btn btn-primary"><b-icon icon="list-stars"
                        aria-hidden="true"></b-icon></button>
                    <button class="btn btn-primary" v-b-modal.modalAddInventario><b-icon icon="plus-square"
                        aria-hidden="true"></b-icon></button>
  
                    <b-modal id="modalAddInventario" ref="AddInventarioModal" hide-footer title="Add New Inventario">
  
                      <label class="form-label"><b>Almacén</b></label>
                      <input v-model="InputAlmacen" class="form-control" type="Almacen" id="almacenInput" required
                        placeholder="Almacen">
  
                      <label class="form-label"><b>Producto</b></label>
                      <input v-model="InputProducto" class="form-control" type="Producto" id="productoInput" required
                        placeholder="Producto">
  
                      <label class="form-label"><b>Proveedor</b></label>
                      <input v-model="InputProveedor" class="form-control" type="Proveedor" id="proveedorInput" required
                        placeholder="Proveedor">
  
                      <label class="form-label"><b>Stock Actual</b></label>
                      <input v-model="InputStockActualTitle" class="form-control" type="StockActual" id="stockActualInput" required
                        placeholder="Stock Actual">
  
                    </b-modal>
  
  
                    <b-alert class="fixed-bottom" variant="success" v-model="SuccessAlert">Entry {{ alertMessage
                    }}</b-alert>
  
                    <button class="btn btn-warning" :disabled="selected.length === 0 && selected.length < 2"
                      v-b-modal.modalEditInventario @click="ModifyElement">
                      <b-icon icon="pencil-fill" aria-hidden="true"></b-icon></button>
  
                    <b-modal id="modalEditInventario" ref="ModifyModal" hide-footer title="Modify Inventario">
  
                        <label class="form-label"><b>Almacén</b></label>
                      <input v-model="InputAlmacenModify" class="form-control" type="Almacen" id="almacenInput" required
                        placeholder="Almacen">
  
                        <label class="form-label"><b>Producto</b></label>
                      <input v-model="InputProductoModify" class="form-control" type="Producto" id="productoInput" required
                        placeholder="Producto">
  
                      <label class="form-label"><b>Proveedor</b></label>
                      <input v-model="InputProveedorModify" class="form-control" type="Proveedor" id="proveedorInput" required
                        placeholder="Proveedor">
  
                      <label class="form-label"><b>Unidad De Medida</b></label>
                      <input v-model="InputUnidadDeMedidaModify" class="form-control" type="UnidadDeMedida" id="unidadDeMedidaInput"
                        required placeholder="UnidadDeMedida">
  
                      <label class="form-label"><b>Stock Vendido</b></label>
                      <input v-model="InputStockVendidoModify" class="form-control" type="StockVendido" id="stockVendidoInput" required
                        placeholder="Stock Vendido">
  
                      <label class="form-label"><b>Stock Mínimo</b></label>
                      <input v-model="InputStockMinimoModify" class="form-control" type="StockMinimo" id="stockMinimoInput" required
                        placeholder="Stock Minimo">

                      <label class="form-label"><b>Stock Actual</b></label>
                      <input v-model="InputStockActualModify" class="form-control" type="StockActual" id="stockActualInput" required
                        placeholder="Stock Actual">

  
                      <b-button block @click="hideModal">Cancel</b-button>
                      <b-button class="mr-2" variant="primary" @click="() => { SaveChanges(); ShowAlert(); }">Modificar
                        Inventario</b-button>
  
                    </b-modal>
  
  
                    <b-button variant="danger" block :disabled="!AllowEdit && selected.length === 0"
                      v-b-modal.modalDeleteInventario>
                      <b-icon icon="trash-fill" aria-hidden="true"></b-icon></b-button>
  
                    <b-modal id="modalDeleteInventario" ref="DeleteInventarioModal" hide-footer title="Delete Inventario">
  
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
        fields: ['Almacen', 'Producto', 'Proveedor', 'StockActual'],
        items: [
          { Almacen: '', Producto: "", Proveedor: '', StockActual: ' ' },
          { Almacen: '', Producto: "", Proveedor: '', StockActual: ' ' },
        ],
        selected: [],
        producto: '',
        productoState: null,
        sentData: [],
        showAddCondition: false,
        modes: ['single'],
        busy: false,
        InputProducto: null,
        InputAlmacen: null,
        InputProveedor: null,
        InputStockActual: null,
        InputAlmacenModify: null,
        InputProductoModify: null,
        InputProveedorModify: null,
        InputStockActualModify: null,
        SuccessAlert: false,
        alertMessage: "",
      };
    },
  
  
    methods: {
      OpenClosemodal() {
        this.AddInventarioModal = false;
  
      },
      AllowEdit() {
        return this.selected.length > 0
      },
      Addnewelelement() {
        this.items.push({
          Almacen: this.InputAlmacen,
          Producto: this.InputProducto,
          Proveedor: this.InputProveedor,
          StockActual: this.InputStockActual,
        });
        this.hideModal()
        this.InputClean()
        this.alertMessage = "Inventario created"
      },
      ModifyElement() {
        console.log(this.InputProductoModify)
        console.log(this.selected[0].Producto)
        console.log(this.selected[0].Almacen)
        console.log(this.selected[0].Proveedor)
        console.log(this.selected[0].StockActual)
        console.log(this.selected)
        this.InputProductoModify = this.selected[0].Producto
        this.InputAlmacenModify = this.selected[0].Almacen
        this.InputProveedorModify = this.selected[0].Proveedor
        this.InputStockActualModify = this.selected[0].StockActual
        this.alertMessage = "Inventario Modificado"
      },
      DeleteElement() {
        var index = this.items.indexOf(this.selected[0])
        this.items.splice(index, 1)
        this.hideModal()
        this.alertMessage = "Inventario eliminado"
      },
      SaveChanges() {
        var index = this.items.indexOf(this.selected[0])
        this.items[index].Producto = this.InputProductoModify
        this.items[index].Almacen = this.InputAlmacenModify
        this.items[index].Proveedor = this.InputProveedorModify
        this.items[index].StockActual = this.InputStockActualModify
        this.hideModal()
      },
      onRowSelected(items) {
        if (!items) return;
        this.selected = items
  
      },
      hideModal() {
        this.$refs['modalAddInventario'].hide();
        this.$refs['modalEditInventario'].hide();
        this.$refs['modalDeleteInventario'].hide();
      },
      InputClean() {
        this.InputProducto = ""
        this.InputAlmacen = ""
        this.InputProveedor = ""
        this.InputStockActual = ""
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
  
  .titleinv {
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