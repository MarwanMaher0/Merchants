<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <form-wizard @on-complete="submitForm" color="#5664d2">
              <tab-content title="Basic Info">
                <div class="tab-pane" id="basic-info">
                  <h4 class="card-title">Basic Information</h4>
                  <p class="card-title-desc">Fill all information below</p>
                  <form>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="productname">Product Name</label>
                          <input v-model="product.name" id="productname" name="productname" type="text"
                            class="form-control" required />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="price">Price</label>
                          <input v-model="product.price" id="price" name="price" type="number" class="form-control"
                            required />
                        </div>
                      </div>
                    </div>


                    <div class="mb-3">
                      <label for="manufacturer">Manufacturer</label>
                      <input v-model="product.manufacturer" id="manufacturer" name="manufacturer" type="text"
                        class="form-control" />
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="barcode">Bar Code</label>
                          <input v-model="product.bar_code" id="barcode" name="barcode" type="text" class="form-control"
                            required />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="productimage">Product Image</label>
                          <input type="file" @change="handleFileChange" id="productimage" name="productimage"
                            class="form-control" required />
                        </div>
                      </div>

                    </div>



                    <div class="row">
                      <div class="col-md-6">

                        <div class="mb-3">
                          <label for="quantity">Quantity</label>
                          <input v-model="product.quantity" id="quantity" name="quantity" type="number"
                            class="form-control" required />
                        </div>
                      </div>

                      <div class="col-md-6">

                        <div class="mb-3">
                          <label for="onsale">On Sale</label>
                          <select v-model="product.on_sale" id="onsale" name="onsale" class="form-control" required>
                            <option :value="true">Yes</option>
                            <option :value="false">No</option>
                          </select>
                        </div>
                      </div>

                    </div>
                    <div class="mb-3" v-if="product.on_sale">
                      <label for="salepercent">Sale Percent</label>
                      <input v-model="product.sale_percent" id="salepercent" name="salepercent" type="number"
                        class="form-control" required />
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label">Category</label>
                          <multiselect v-model="product.category" :options="['Electronic', 'Fashion', 'Fitness']">
                          </multiselect>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label">Features</label>
                          <multiselect v-model="product.features" :options="options" mode="tags" :searchable="true">
                          </multiselect>
                        </div>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="description">Product Description</label>
                      <textarea v-model="product.description" class="form-control" id="description" rows="5"
                        required></textarea>
                    </div>
                  </form>
                </div>
              </tab-content>

            </form-wizard>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import Multiselect from "@vueform/multiselect";
import { FormWizard, TabContent } from 'vue3-form-wizard'

import 'vue3-form-wizard/dist/style.css'
import axios from 'axios'

// Reactive state
const title = "Add Product"
const items = ref([
  { text: "Ecommerce" },
  { text: "Add Product", active: true }
])
const options = [
  "Touchscreen",
  "Call Function",
  "Notifications",
  "Fitness",
  "Outdoor"
]

// Form state
const product = ref({
  name: '',
  price: '',
  manufacturer: '',
  description: '',
  bar_code: '',
  quantity: '',
  on_sale: false,
  sale_percent: '',
  category: null,
  features: [],
  image: ""
})

// Form submission
const submitForm = async () => {
  try {
    const response = await axios.post('/api/products-for-merchants/', {
      bar_code: product.value.bar_code,
      name: product.value.name,
      description: product.value.description,
      price: product.value.price,
      quantity: product.value.quantity,
      on_sale: product.value.on_sale,
      sale_percent: product.value.sale_percent,
      manufacturer: product.value.manufacturer,
      category: product.value.category,
      features: product.value.features
    })
    console.log(response.data)
    alert('Product added successfully!')
  } catch (error) {
    console.error(error)
    alert('Failed to add product.')
  }
}
const handleFileChange = (event) => {
  const file = event.target.files[0];
  // Assuming you want to store the file object for further processing
  product.image = file;
}
</script>

<style>
/* Add any custom styles here */
</style>
