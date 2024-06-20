<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header.vue";

/**
 * Orders Component
 */
export default {
  components: {
    Layout,
    PageHeader
  },
  data() {
    return {
      title: "Orders",
      items: [
        {
          text: "Ecommerce"
        },
        {
          text: "Orders",
          active: true
        }
      ],
      ordersData: [
        {
          orderid: "#NZ1563",
          date: "28 Mar, 2024",
          billingname: "Frank Dean",
          total: "$164",
          paymentstatus: "Unpaid"
        },
        {
          orderid: "#NZ1564",
          date: "28 Mar, 2024",
          billingname: "Eddy Torres",
          total: "$141",
          paymentstatus: "Paid"
        },
        {
          orderid: "#NZ1565",
          date: "29 Mar, 2024",
          billingname: "Jamison Clark",
          total: "$123",
          paymentstatus: "Paid"
        },
        {
          orderid: "#NZ1566",
          date: "30 Mar, 2024",
          billingname: "Jewel Buckley",
          total: "$112",
          paymentstatus: "Paid"
        },
        {
          orderid: "#NZ1567",
          date: "31 Mar, 2024",
          billingname: "Jeffrey Waltz",
          total: "$105",
          paymentstatus: "Unpaid"
        },
        {
          orderid: "#NZ1568",
          date: "01 Apr, 2024",
          billingname: "Jefferson Allen",
          total: "$160",
          paymentstatus: "Chargeback"
        },
        {
          orderid: "#NZ1569",
          date: "02 Apr, 2024",
          billingname: "Paul Jones",
          total: "$183",
          paymentstatus: "Paid"
        },
        {
          orderid: "#NZ1570",
          date: "03 Apr, 2024",
          billingname: "Donald Bailey",
          total: "$146",
          paymentstatus: "Paid"
        },
        {
          orderid: "#NZ1571",
          date: "03 Apr, 2024",
          billingname: "Jimmy Barker",
          total: "$165",
          paymentstatus: "Unpaid"
        },
        {
          orderid: "#NZ1572",
          date: "04 Apr, 2024",
          billingname: "Walter Brown",
          total: "$172",
          paymentstatus: "Paid"
        },
        {
          orderid: "#NZ1573",
          date: "06 Apr, 2024",
          billingname: "James Hamilton",
          total: "$152",
          paymentstatus: "Paid"
        }
      ],
      totalRows: 1,
      tabIndex: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "orderid",
      sortDesc: false,
      fields: [
        { key: "orderid", sortable: true, label: "Order ID" },
        { key: "date", sortable: true, label: "Date" },
        { key: "billingname", sortable: true, label: "Billing Name" },
        { key: "total", sortable: true, label: "Total" },
        { key: "paymentstatus", sortable: true, label: "Payment Status" },
        { key: "action", label: "Action" }
      ]
    };
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.ordersData.length;
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.ordersData.length;
  },
  methods: {
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body pt-1">
            <BTabs v-model="tabIndex" nav-class="nav-tabs-custom">
              <BTab>
                <template v-slot:title>
                  <a class="font-weight-bold active">All Orders</a>
                </template>
                <div class="row mt-4">
                  <div class="col-sm-12 col-md-6">
                    <div id="tickets-table_length" class="dataTables_length">
                      <label class="d-inline-flex align-items-center">
                        Show&nbsp;
                        <BFormSelect v-model="perPage" size="sm" :options="pageOptions" />&nbsp;entries
                      </label>
                    </div>
                  </div>
                  <!-- Search -->
                  <div class="col-sm-12 col-md-6">
                    <div id="tickets-table_filter" class="dataTables_filter text-md-end">
                      <label class="d-inline-flex align-items-center">
                        Search:
                        <BFormInput v-model="filter" type="search" class="form-control form-control-sm ms-2" />
                      </label>
                    </div>
                  </div>
                  <!-- End search -->
                </div>
                <div class="table-responsive">
                  <BTableSimple class="table-centered datatable dt-responsive nowrap" sortBy="Payment Status">
                    <BThead class="table-light">
                      <BTr>
                        <BTh v-for="(label) in fields">{{ label.label }}</BTh>
                      </BTr>
                    </BThead>
                    <BTbody>
                      <BTr v-for="(transaction) in ordersData" :key="index">
                        <BTd>{{ transaction.orderid }}</BTd>
                        <BTd>{{ transaction.date }}</BTd>
                        <BTd>{{ transaction.billingname }}</BTd>
                        <BTd>{{ transaction.total }}</BTd>
                        <BTd>
                          <div class="badge font-size-12" :class="{
                            'bg-danger-subtle text-danger': `${transaction.paymentstatus}` === 'Chargeback',
                            'bg-success-subtle text-success': `${transaction.paymentstatus}` === 'Paid',
                            'bg-warning-subtle text-warning': `${transaction.paymentstatus}` === 'Unpaid'
                          }">{{ transaction.paymentstatus }}</div>

                        </BTd>
                        <BTd>
                          <a href="javascript:void(0);" class="me-3 text-primary" v-b-tooltip.hover title="Edit">
                            <i class="mdi mdi-pencil font-size-18"></i>
                          </a>
                          <a href="javascript:void(0);" class="text-danger" v-b-tooltip.hover title="Delete">
                            <i class="mdi mdi-trash-can font-size-18"></i>
                          </a>
                        </BTd>
                      </BTr>
                    </BTbody>
                  </BTableSimple>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="dataTables_paginate paging_simple_numbers float-end">
                      <ul class="pagination pagination-rounded mb-0">
                        <!-- pagination -->
                        <BPagination v-model="currentPage" :total-rows="rows" :per-page="perPage" />
                      </ul>
                    </div>
                  </div>
                </div>
              </BTab>
            </BTabs>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>