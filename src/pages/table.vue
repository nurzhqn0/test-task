<script>
import { generateData } from "@/composables/dataGeneration";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";

export default {
	name: "App",
	components: {
		AgGridVue,
	},
	data() {
		return {
			columnDefs: [
				{ headerName: "Val1", field: "val1", filter: false },
				{ headerName: "Val2", field: "val2", filter: false },
				{ headerName: "Val3", field: "val3", filter: false, aggFunc: "sum" },
				{ headerName: "Val4", field: "val4", filter: false, aggFunc: "avg" },
				{ headerName: "Val5", field: "val5", filter: false, aggFunc: "sum" },
				{ headerName: "Val6", field: "val6", filter: "agTextColumnFilter" },
				{ headerName: "Val7", field: "val7", filter: false },
				{ headerName: "Val8", field: "val8", filter: false },
			],
			defaultColDef: {
				sortable: true,
				resizable: true,
			},
			rowData: [],
			pinnedRowData: [],
		};
	},
	computed: {
		totalRow() {
			if (!this.rowData.length) return [];

			const total = {
				val1: "Итого",
				val2: null,
				val3: this.rowData.reduce(
					(sum, row) => sum + (parseFloat(row.val3) || 0),
					0
				),
				val4: this.rowData.length
					? this.rowData.reduce(
							(sum, row) => sum + (parseFloat(row.val4) || 0),
							0
					  ) / this.rowData.length
					: 0,
				val5: null,
				val6: null,
				val7: null,
				val8: null,
			};
			return [total];
		},
	},
	methods: {
		onRowClicked(event) {
			alert("Вы выбрали строку:\n" + JSON.stringify(event.data, null, 2));
		},
		loadData() {
			this.rowData = generateData(100);
			this.pinnedRowData = this.totalRow;
		},
	},
	mounted() {
		this.loadData();
	},
};
</script>

<template>
	<v-container class="h-100">
		<div class="text-h3 mb-4">Таблица</div>
		<div class="ag-theme-alpine" style="height: 600px; width: 100%">
			<AgGridVue
				style="width: 100%; height: 100%"
				class="ag-theme-alpine"
				:columnDefs="columnDefs"
				:rowData="rowData"
				:pinnedBottomRowData="pinnedRowData"
				:defaultColDef="defaultColDef"
				rowSelection="single"
				@rowClicked="onRowClicked"
			/>
		</div>
	</v-container>
</template>

<style scoped>
.mb-4 {
	margin-bottom: 16px;
}
</style>
