<template>
  <section class="homepage">
    <div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="content"></span>
    </div>
  </section>
</template>

<script>
export default {
  components: {},

  async asyncData({ $axios }) {
    try {
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
        }
      }
      throw new Error('no defined homepage')
    } catch (error) {
      return {
        content: '',
      }
    }
  },
}
</script>

<style lang="scss">
.homepage {
  width: 100%;
  max-width: 1200px;
  padding: 0px;
}
</style>
