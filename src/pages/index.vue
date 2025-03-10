<script setup>
import useProducts from "@/composables/useProducts";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";
import { onMounted, ref, computed } from "vue";

const { flags, products, getAllProducts, categories } = useProducts();

const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();

const selectedCategory = ref(null);

const filteredProducts = computed(() => {
	if (!products.value) return [];
	if (!selectedCategory.value) return products.value;
	return products.value.filter(
		(product) => product.category === selectedCategory.value
	);
});

onMounted(() => {
	getAllProducts();
});
</script>

<template>
	<v-container class="h-100">
		<v-row>
			<!-- category -->
			<v-col md="3">
				<v-card>
					<v-card-title>Фильтры</v-card-title>
					<v-card-text>
						<v-select
							v-model="selectedCategory"
							:items="categories"
							label="Категории"
							clearable
						></v-select>
					</v-card-text>
				</v-card>
			</v-col>

			<!-- products -->
			<v-col v-if="!flags.isLoading" md="9">
				<h1 class="mb-4 text-h3">Все товары</h1>
				<v-row v-if="products.length">
					<v-col v-for="product in filteredProducts" :key="product.id" md="4">
						<v-card>
							<v-img :src="product.image" height="200px"></v-img>
							<v-card-title>{{ product.name }}</v-card-title>
							<v-card-subtitle>{{ product.price }} ₽</v-card-subtitle>

							<v-card-actions class="d-flex flex-column text-sm justify-center">
								<v-btn
									color="primary"
									@click="favoritesStore.addFavorite(product)"
									class="mb-2"
								>
									Добавить в избранное
								</v-btn>

								<v-btn
									color="primary"
									@click="cartStore.add(product)"
									class="mb-2"
								>
									Добавить в корзину
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>

				<v-row v-else>
					<v-col>
						<v-alert type="info">Товары не найдены</v-alert>
					</v-col>
				</v-row>
			</v-col>

			<v-col v-else class="d-flex justify-center align-center" md="9">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
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
