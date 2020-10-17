<template>
  <v-card>
    <v-list two-line>
      <v-list-item-group multiple>
        <template v-for="(item, index) in Object.values(order)">
          <v-list-item :key="item.title">
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>

              <v-list-item-subtitle class="text--primary" v-text="item.description"></v-list-item-subtitle>
            </v-list-item-content>

            <div class="order-list">
              <v-text-field
                outlined
                class="order-quantity"
                :value="item.quantity"
                color="primary"
                required
                @input="changeQuantity($event, item)"
              />
              <div class="order-actions">
                <v-btn icon @click="add(item)"><v-icon>add</v-icon></v-btn>
                <v-btn icon @click="remove(item)"><v-icon>remove</v-icon></v-btn>
              </div>
            </div>
          </v-list-item>

          <v-divider v-if="index < Object.values(order).length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <v-card-actions>
      <v-btn v-if="Object.values(order).length" block color="primary" :loading="loading" @click="proceed">
        Proceed
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false,
    }
  },

  head: {
    titleTemplate: '%s - My Order',
  },

  computed: {
    ...mapState(['auth', 'order']),
  },

  methods: {
    ...mapActions('snackbar', ['displaySnack']),
    ...mapMutations(['addToOrder', 'removeFromOrder', 'updateQuantity', 'emptyOrder']),
    changeQuantity(quantity, item) {
      this.updateQuantity({ ...item, quantity })
    },
    add(product) {
      this.addToOrder(product)
    },
    remove(product) {
      this.removeFromOrder(product)
    },
    async proceed() {
      this.loading = true
      try {
        const arr = Object.values(this.order)
        const date = Date.now()
        await this.$axios.post('/api/v1/orders', {
          title: `${this.auth.user.email} - ${date}`,
          customerId: this.auth.user._id,
          productsIds: arr.map(product => product._id),
          productsRelationships: arr.reduce((acc, cur) => ({ ...acc, [cur._id]: { quantity: cur.quantity } }), {}),
          date,
        })

        this.loading = false
        this.emptyOrder()
        this.$router.push('/')
        this.displaySnack({ message: 'Order received. It will be ready soon.' })
      } catch (error) {
        this.loading = false
        this.displaySnack({ message: 'Something went wrong', color: 'error' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.order-list {
  display: flex;
  position: relative;
  top: 20px;
}

.order-quantity {
  width: 50px;
  margin-right: 40px;
}

.order-actions {
  display: flex;
  flex-direction: column;
}

.v-card__actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0;

  .v-btn {
    padding: 0;
  }
}
</style>
