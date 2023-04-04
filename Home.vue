<template>
	<div>
		<Navbar />
		
		<b-container class="my-5">
			<b-row>
				<b-col
					v-for="button in buttons"
					:key="button.title"
					cols="4"
					md="3"
					lg="3"
					class="my-3"
				>
					<HomeButton
						:title="button.title"
						:link="button.link"
						:icon="button.icon"
					/>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>
    
<script>
 import HomeButton from '../components/HomeButton.vue';
 import Navbar from '../components/Navbar.vue'; 

 export default {
	data() {
		return {
			buttons: [
				{
					title: "Datos de proveedores",
					link: { name: "datosdeproveedores" },
					icon: "file-earmark-person"
				},
				{
					title: "Articulos",
					link: { name: "articulos" },
					icon: "code-square"
				},
				{
					title: "Almacen",
					link: { name: "almacen" },
					icon: "door-open"
				},
				{
					title: "Inventario",
					link: { name: "inventario" },
					icon: "door-open"
				},
			]
		};
	},
	components: {
		HomeButton,
		Navbar
	}
 };
</script>