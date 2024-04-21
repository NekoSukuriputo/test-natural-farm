<template>
  <v-container fluid>
    <v-sheet class="pa-5" :elevation="1" border height="100%" width="100%">
      <span class="text-h5 my-10">Add Checkout</span>
      <v-form @submit.prevent="onSubmit">
        <v-row class="mt-10">
          <v-col cols="12" sm="4">
            <div>
              <v-autocomplete
                label="Customer"
                :items="customers"
                item-title="customer_name"
                item-value="customers"
                variant="outlined"
                return-object
                v-model="checkoutData.customer"
              ></v-autocomplete>
            </div>
            <div>
              <v-autocomplete
                label="Payment"
                :items="payments"
                item-title="name"
                item-value="payments"
                variant="outlined"
                return-object
                v-model="checkoutData.payment"
              ></v-autocomplete>
            </div>
            <div class="mt-10">
              <p class="text-h5 my-5">Detail Order</p>
              <p class="text-subtitle-1">
                {{ checkoutData.customer.customer_name }}
              </p>
              <p class="text-subtitle-2 text-right">
                {{ checkoutData.payment.name }}
              </p>
              <div class="my-5">
                <p class="text-subtitle-2">Product Order</p>
                <ul class="mx-5" v-auto-animate>
                  <li
                    v-for="(item, index) in checkoutData.products"
                    :key="index"
                  >
                    <p>{{ item.name }}</p>
                    <p>Qty: {{ item.quantity }}</p>
                    <p>Price: {{ formatCurrency(item.price) }}</p>
                    <p>
                      Discount:
                      {{
                        formatCurrency(
                          calculateDiscountPrice(item.price, item.discount)
                        )
                      }}
                      ({{ item.discount }}%)
                    </p>
                    <p>
                      Total:
                      {{
                        formatCurrency(
                          calculateTotal(item.quantity, item.price)
                        )
                      }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </v-col>

          <v-col cols="12" sm="8">
            <p class="text-h6 pb-5">
              Products
              <v-btn
                color="primary"
                class="ml-5"
                prepend-icon="mdi-plus"
                variant="outlined"
                @click="addProduct"
              >
                Add Product
              </v-btn>
            </p>

            <v-card
              elevation="0"
              class="d-flex flex-wrap border border-md"
              min-height="200px"
              v-auto-animate
            >
              <checkout-product-item
                v-auto-animate
                v-for="(product, index) in checkoutData.products"
                :product="product"
                :key="index"
                @change="updateProduct"
                :products="products"
                @delete="deleteProduct"
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row align="end" justify="end" class="ma-10">
          <v-btn
            :disabled="checkoutData.products.length === 0"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Save
          </v-btn>
        </v-row>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import useCustomer from "~/stores/useCustomer";
import usePayment from "~/stores/usePayment";
import useProduct from "~/stores/useProduct";
import userOrder from "~/stores/userOrder";
import useUtils from "~/stores/useUtils";
import type { Customer } from "~/types/customer";
import type { Payment } from "~/types/payment";
import type { Product } from "~/types/product";
import { v4 as uuidv4 } from "uuid";

const customerStore = useCustomer();
const paymentStore = usePayment();
const productsStore = useProduct();
const orderStore = userOrder();
const useUtilsStore = useUtils();

const loading = ref(false);

const customers = computed(() => {
  return customerStore.getCustomers;
});

interface CheckoutData {
  customer: Customer;
  payment: Payment;
  products: Product[];
  additionalDiscount: number;
  totalPrice: number;
  totalDiscount: number;
}

const checkoutData = ref<CheckoutData>({
  customer: { customer_name: "" },
  payment: { name: "" },
  products: [],
  additionalDiscount: 0,
  totalPrice: 0,
  totalDiscount: 0,
});

const payments = computed(() => {
  return paymentStore.getPayments;
});
const products = computed(() => {
  return productsStore.getProducts;
});

const updateProduct = (product: Product) => {
  console.log("updateProduct", product);
  const index = checkoutData.value.products.findIndex(
    (p) => p.id === product.id
  );
  checkoutData.value.products[index] = product;
};
const deleteProduct = (product: Product) => {
  console.log("del", product);
  const index = checkoutData.value.products.findIndex(
    (p) => p.id === product.id
  );
  console.log("index", index);
  checkoutData.value.products.splice(index, 1);
};
const addProduct = () => {
  checkoutData.value.products.push({
    id: uuidv4(),
    name: "",
    price: 0,
    discount: 0,
    quantity: 1,
  });
};

const calculateDiscountPrice = (price: number, discount: number) => {
  console.log("price", price);
  console.log("discount", discount);
  return (checkoutData.value.totalDiscount = (+price * +discount) / 100);
};

const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatter.format(amount);
};
const calculateTotal = (qty, price) => {
  return (checkoutData.value.totalPrice =
    +qty * +price - +checkoutData.value.totalDiscount);
};

const onSubmit = async () => {
  loading.value = true;
  useUtilsStore.showSnackbar();
  setTimeout(() => {
    orderStore.addOrder(checkoutData.value);
  }, 3000);
  loading.value = false;
  useRouter().push("/order");
};
</script>

<style scoped></style>
