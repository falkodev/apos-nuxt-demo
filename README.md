# Headless Apostrophe with Docker / Nuxt / Nginx

This project is a demonstration of using Apostrophe in headless mode, adding Nuxt for the frontend, and Nginx as reverse-proxy.

![](.readme-assets/frontend-login.png)

## Without Docker

### Installation

Having `npm` and `node` installed on the machine, run `npm run install-app`.

### Usage

Go to `http://localhost:1337/apos` to access the backend and `http://localhost:3333` for the frontend.

## With Docker

### Installation

Having `docker` installed, run `make`.

### Usage

Run `make` for the `development` environment, `make prod` for the `production` environment.
Go to `http://localhost/apos` to access the backend and `http://localhost` for the frontend.

### Other Docker commands

Run `docker-compose up` for production in Docker or `make prod`.

`docker-compose ps` for running instances.<br />
`docker-compose stop`<br />
`docker-compose build` to rebuild image<br />
`docker run -ti apos-nuxt-demo_demo-demo-backend sh` to log into the container<br />

Save database:
`docker run --rm --link demo-db:mongo --net apos-nuxt-demo_demo_default -v $(pwd)/server/data/db:/backup mongo bash -c 'mongodump --out /backup --host mongo:27018 --db network'`

Drop database:
`docker exec network-db mongo --port 27018 --eval "db.getSiblingDB('apos-nuxt-demo').dropDatabase()";`

Restore in container:
'docker run --rm --link demo-db:mongo --net apos-nuxt-demo_demo_default -v \$(pwd)/server/data/db:/backup mongo mongorestore /backup --host mongo:27018'

### Fixtures

docker-compose exec demo-backend node app fixtures:all

### Clear Docker logs

dev: docker run -it --rm --privileged --pid=host apos-nuxt-demo_demo-demo-backend nsenter -t 1 -m -u -n -i -- sh -c 'truncate -s 0 /var/lib/docker/containers/*/*-json.log'

### Nginx

You can access Nginx logs by going to `/reverse-proxy/logs`.

## Tutorial

We are going to create an online restaurant shop, enabling visitors to register and order food.

Start by cloning this project.

`git clone git@github.com:falkodev/apos-nuxt-demo.git` //TODO: change url to an apostrophe one when ready

If you have Docker installed, run `make` otherwise `npm run install-app`. `http://localhost:1337/apos` for the backend and `http://localhost:3333` for the frontend should be accessible (ports are not mandatory if you use Docker).

We are going to create dishes for our customers. To facilitate this step, fixtures have been created. They will create an admin user on Apostrophe, and documents in the "Products" module.

Here is the schema of the "Products" module:

```js
{
  name: 'description',
  type: 'string',
  required: true,
},
{
  name: 'picture',
  type: 'attachment',
  group: 'images',
}
```

By default, Apostrophe adds a title, a slug, a "published" status, and a "trash" status to every piece. In this schema, we add a description and a picture.

On another teminal, run `docker-compose exec demo-backend node app fixtures:all` if you use Docker, `cd backend && node app fixtures:all` otherwise.

Now, go to `http://localhost:1337/apos/login` and enter the following credentials: "admin" as username, "admin" as password.

<br><img src=".readme-assets/backend-login.png" width="400"><br>

The Apostrophe admin bar will be displayed.

<br><img src=".readme-assets/admin-bar.png" width="800"><br>

You can click on "Products" to look at the generated products by the "fixtures" step.

<br><img src=".readme-assets/products-list.png" width="800"><br>
<br><img src=".readme-assets/product-edit.png" width="800"><br>

If you reload `http://localhost:3333`, you will see the products are now displayed.

<br><img src=".readme-assets/frontend-homepage.png" width="800"><br>

How does this work?

On the backend, [`apostrophe-headless`](https://github.com/apostrophecms/apostrophe-headless) has been installed, and the products module has been declared as a headless module with the `restApi` option, therefore exposing REST routes:

```js
// backend/lib/modules/products/index.js
module.exports = {
  extend: 'apostrophe-pieces',
  name: 'product',
  alias: 'product',
  restApi: true,
  ...
}
```

This way, products are automatically exposed on `/api/v1/products`. On the frontend, the `index` page fetches the products on this route. Nuxt declares pages in the `pages` folder. `index.vue` is thus the default page. In the `asyncData` method in this component, the following GET request is made:

```js
// in frontend/pages/index.vue
const { results } = await $axios.$get('/api/v1/products')
```

The products are displayed in the component's template part, with a classical `v-for` loop:

```html
<!-- in frontend/pages/index.vue -->
<template>
  <section class="homepage">
    <div class="homepage-products">
      <div v-for="product in products" :key="product._id" class="homepage-products__item">
        <img :src="product.picture._urls['one-third']" />
        <span>{{ product.description }}</span>
      </div>
    </div>
  </section>
</template>
```

You can notice Apostrophe has automatically resized the pictures. We chose to display the "one-third" format here.

//TODO: editable homepage on Apos
