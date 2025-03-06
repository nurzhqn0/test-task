import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
	state: () => ({
		favorites: [],
		categories: [],
	}),
	actions: {
		addFavorite(product) {
			if (!this.favorites.some((fav) => fav.id === product.id)) {
				this.favorites.push(product);
				this.updateFavoriteCategories();
			}
		},
		removeFavorite(product) {
			this.favorites = this.favorites.filter((fav) => fav.id !== product.id);
			this.updateFavoriteCategories();
		},

		updateFavoriteCategories() {
			this.categories = Array.from(
				new Set(this.favorites.map((fav) => fav.category))
			);
		},
	},
});
