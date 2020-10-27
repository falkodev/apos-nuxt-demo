<template>
  <section class="home">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="content"></div>
    <div class="home-menu-items">
      <div v-for="item in menuItems" :key="item._id" class="home-menu-items__item">
        <img :src="item.picture._urls['one-third']" />
        <v-btn
          v-if="$store.state.auth && $store.state.auth.loggedIn"
          color="primary"
          class="white-text"
          @click="add(item)"
        >
          Order
        </v-btn>
        <LoginModal v-else classes="primary white-text" :block="true" :redirect-to="$route.fullPath" label="Order" />

        <span>{{ item.description }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import LoginModal from '~/components/LoginModal'

export default {
  components: {
    LoginModal,
  },

  async asyncData({ $axios }) {
    let menuItems = []
    try {
      const { results } = await $axios.$get('/api/v1/menu-items')
      if (results.length) {
        menuItems = results
      }

      const pages = await $axios.$get('/api/v1/apostrophe-pages')
      const homepage = pages._children.find(child => child.type === 'front-home')

      if (homepage) {
        const content = await $axios.$get(`/api/v1/apostrophe-pages/${homepage._id}?render=front-home`)
        const htmlString = content.rendered['front-home']
        const htmlSplit = htmlString.split('data-svg-xlink=')

        for (let i = 1; i < htmlSplit.length; i++) {
          const xlinkIndex = htmlSplit[i].indexOf('>')
          const xlink = htmlSplit[i].slice(1, xlinkIndex - 1)
          const divIndex = htmlSplit[i].indexOf('</div>', htmlSplit[i].indexOf('</div>') + 1)
          htmlSplit[i] =
            htmlSplit[i].slice(0, divIndex) + `<svg><use xlink:href="#${xlink}" /></svg>` + htmlSplit[i].slice(divIndex)
        }

        const newHtmlString = htmlSplit.join('data-svg-xlink=')

        return {
          content: newHtmlString,
          menuItems,
        }
      }
      throw new Error('no defined homepage')
    } catch (error) {
      if (menuItems) {
        return {
          content: '',
          menuItems,
        }
      }
      return {
        content: '',
        menuItems: [],
      }
    }
  },

  methods: {
    ...mapMutations(['addToOrder']),
    add(item) {
      this.addToOrder(item)
    },
  },
}
</script>

<style lang="scss">
.home {
  width: 100%;
  padding: 0px;
}

.home-menu-items {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;

  &__item {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 10px;

    & > img {
      width: inherit;
      height: 500px;
      object-fit: cover;
    }
  }
}
</style>
