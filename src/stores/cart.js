import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
	state: () => ({
		cart: [],
		sum: 0,
	}),
	getters: {
		sum: (state) =>
			state.cart.reduce((total, product) => total + product.price, 0),
	},
	actions: {
		add(product) {
			if (!this.cart.some((item) => item.id === product.id)) {
				this.cart.push(product);
			}
		},
		remove(product) {
			this.cart = this.cart.filter((item) => item.id !== product.id);
		},
	},
});
