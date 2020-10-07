<template>
  <section class="homepage">
    <div class="homepage-products">
      <div v-for="product in products" :key="product._id" class="homepage-products__item">
        <img :src="product.picture._urls['one-third']" />
        <span>{{ product.description }}</span>
      </div>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="content"></div>
  </section>
</template>

<script>
export default {
  components: {},

  async asyncData({ $axios }) {
    try {
      const { results: products } = await $axios.$get('/api/v1/products')
      const pages = await $axios.$get('/api/v1/apostrophe-pages')
      const homepage = pages._children.find(child => child.type === 'front-homepage')

      if (homepage) {
        const content = await $axios.$get(`/api/v1/apostrophe-pages/${homepage._id}?render=front-homepage`)
        const htmlString = content.rendered['front-homepage']
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
          products,
        }
      }
      throw new Error('no defined homepage')
    } catch (error) {
      return {
        content: '',
        products: [],
      }
    }
  },
}
</script>

<style lang="scss">
.homepage {
  width: 100%;
  padding: 0px;
}

.homepage-products {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: center;
  align-items: start;

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
