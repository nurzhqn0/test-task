<script setup>
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
</script>

<template>
	<v-container class="h-100">
		<v-row>
			<!-- summary -->
			<v-col md="3">
				<v-card class="mb-4">
					<v-card-title>Итого</v-card-title>
					<v-card-text>
						<div class="d-flex justify-space-between">
							<span>Количество товаров:</span>
							<span>{{ cartStore.cart.length }}</span>
						</div>
						<div class="d-flex justify-space-between">
							<span>Общая стоимость:</span>
							<span>{{ cartStore.sum }} ₽</span>
						</div>
					</v-card-text>
					<v-card-actions>
						<v-btn color="primary" block>Оформить заказ</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>

			<!-- products -->
			<v-col md="9">
				<h1 class="mb-4 text-h3">Корзина</h1>
				<v-row v-if="cartStore.cart.length">
					<v-col v-for="product in cartStore.cart" :key="product.id" md="4">
						<v-card class="mb-4">
							<v-img :src="product.image" height="200px"></v-img>
							<v-card-title>{{ product.name }}</v-card-title>
							<v-card-subtitle>{{ product.price }} ₽</v-card-subtitle>
							<v-card-actions class="d-flex flex-column text-sm justify-center">
								<v-btn
									color="error"
									@click="cartStore.remove(product)"
									class="mb-2"
								>
									Удалить
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>

				<v-row v-else>
					<v-col>
						<v-alert type="info">Нет товаров в корзине</v-alert>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
.d-flex {
	display: flex;
}
.justify-center {
	justify-content: center;
}
.justify-space-between {
	justify-content: space-between;
}
.mb-2 {
	margin-bottom: 8px;
}
.mb-4 {
	margin-bottom: 16px;
}
.mt-4 {
	margin-top: 16px;
}
</style>
