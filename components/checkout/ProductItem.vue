<template>
  <v-card class="ma-5 pa-5" width="400px">
    <v-tooltip :text="product?.name || 'Produk'" location="top">
      <template v-slot:activator="{ props }">
        <v-card-title v-bind="props">{{
          product?.name || "Produk"
        }}</v-card-title>
      </template>
    </v-tooltip>
    <v-card-text>
      <!-- Nama Produk -->
      <v-autocomplete
        density="compact"
        label="Nama Produk"
        :items="products"
        item-title="name"
        return-object
        variant="outlined"
        :model-value="product"
        @update:model-value="onchangeProduct"
        clearable
      ></v-autocomplete>

      <div style="max-width: 200px">
        <v-text-field
          density="compact"
          variant="outlined"
          append-icon="mdi-percent"
          label="Diskon"
          :model-value="discount"
          @update:model-value="onChangeDiscount"
          :rules="[isNumber, isInRange]"
          type="number"
          hide-spin-buttons
        ></v-text-field>
      </div>
      <div style="max-width: 200px">
        <p class="text-subtitle-1">Jumlah</p>
        <v-row align="center" justify="center">
          <v-col cols="3">
            <v-btn
              density="compact"
              icon="mdi-minus"
              @click="decrementQuantity"
            >
            </v-btn>
          </v-col>
          <v-col cols="4" dense size="compact">
            <v-text-field
              density="compact"
              variant="solo"
              type="text"
              v-model="quantity"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn density="compact" icon="mdi-plus" @click="incrementQuantity">
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <!-- Diskon -->
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="onDelete" variant="outlined">Hapus</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";

const props = defineProps({
  products: {
    type: Array as unknown as Product[],
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const emit = defineEmits(["change", "delete"]);

const quantity = toRef<number>(props.quantity);

const product = toRef(props.product);

const discount = toRef(props.product.discount);

const incrementQuantity = () => {
  quantity.value++;
  product.value.quantity = quantity.value;
  onChange();
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
    product.value.quantity = quantity.value;
    onChange();
  }
};
const isNumber = (value) => /^\d+$/.test(value) || "Input harus berupa angka";
const isInRange = (value) => value <= 100 || "Input tidak boleh lebih dari 100";

const onChangeDiscount = (value) => {
  product.value.discount = value.slice(0, 3);
  discount.value = value.slice(0, 3);
  emit("change", product.value);
};

const onchangeProduct = (value: any) => {
  console.log("onchangeProduct", value);
  product.value = {
    id: product.value.id,
    productId: value.id,
    name: value.name,
    price: value.price,
    quantity: quantity.value,
    discount: discount.value,
  };
  onChange();
};
const onChange = () => {
  console.log(" product.value", product.value);
  emit("change", product.value);
};
const onDelete = () => {
  emit("delete", product.value);
};
</script>

<style scoped></style>
