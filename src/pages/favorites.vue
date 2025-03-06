<script setup>
import useProducts from "@/composables/useProducts";
import { useFavoritesStore } from "@/stores/favorites";
import { onMounted, ref, computed } from "vue";

const favoritesStore = useFavoritesStore();

const selectedCategory = ref(null);

const filteredProducts = computed(() => {
	if (!selectedCategory.value) {
		return favoritesStore.favorites;
	}
	return favoritesStore.favorites.filter(
		(product) => product.category === selectedCategory.value
	);
});

onMounted(() => {
	favoritesStore.updateFavoriteCategories();
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
							:items="favoritesStore.categories"
							label="Категории"
							clearable
						></v-select>
					</v-card-text>
				</v-card>
			</v-col>

			<!-- products -->
			<v-col md="9">
				<h1 class="mb-4 text-h3">Избранное</h1>
				<v-row v-if="favoritesStore.favorites.length">
					<v-col v-for="product in filteredProducts" :key="product.id" md="4">
						<v-card>
							<v-img :src="product.image" height="200px"></v-img>
							<v-card-title>{{ product.name }}</v-card-title>
							<v-card-subtitle>{{ product.price }} ₽</v-card-subtitle>

							<v-card-actions class="d-flex flex-column text-sm justify-center">
								<v-btn
									color="error"
									@click="favoritesStore.removeFavorite(product)"
								>
									Удалить
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>

				<v-row v-else>
					<v-col>
						<v-alert type="info">Нет избранных товаров</v-alert>
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
