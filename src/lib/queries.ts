// brand

export const getBrand = async () =>
  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Brands` +
        `?fields=name,tagline,lightLogo,darkLogo,homepage.slug,` + //  brand fields
        `header.item.id,header.item.slug,header.collection,header.item.name,` + // header fields
        `footer.id,footer.sort,footer.item.id,footer.item.name,` + // footer columns
        `footer.item.links.item.slug,footer.item.links.collection,footer.item.links.sort,footer.item.links.item.name` + // footer fields
        `&filter[domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}`
    )
  ).json()

// colors
export const getBrandColors = async () =>
  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Brands` +
        `?fields=primaryColor,accentColor` +
        `&filter[domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}`
    )
  ).json()

// core page
// export const getPage = async (path: any) =>
//   await (
//     await fetch(
//       `${process.env.NEXT_PUBLIC_REST_API}/Pages` +
//         `?fields=id,slug,name,` + // key fields
//         `sections.*` + // sections fields
//         `&filter[brand][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}` +
//         `&filter[slug][_eq]=${path}`
//     )
//   ).json()

export async function getPage(path: any) {
  // console.log('getPage->', path)

  return await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Pages` +
        `?fields=id,slug,name,` + // key fields
        `sections.*` + // sections fields
        `&filter[brand][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}` +
        `&filter[slug][_eq]=${path}`
    )
  ).json()
}

export async function getCourseContent(id: any) {
  // console.log('id', id)

  let content = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Courses` +
        `?fields=id,slug,name,description,image,modules.item.*,modules.item.content.*,modules.item.content.item.*,modules.item.content.item.links.item.id,modules.item.content.item.links.item.slug,modules.item.content.item.links.item.name,modules.item.content.item.links.item.description,modules.item.content.item.links.item.title,modules.item.content.item.links.collection` +
        `&filter[slug][_eq]=${id}`
    )
  ).json()
  // console.log('content--', content)
  content = content.data[0]
  return content
}

export async function getPurchases() {
  return ''
}

export async function getPost(path: any) {
  return await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Posts` +
        `?fields=slug,name,image,description,content,status,date_created` +
        `&filter[slug][_eq]=${path}`
    )
  ).json()
}

export async function getSection(params: any) {
  let section: any = {}
  let posts: any
  switch (params.collection) {
    case 'BasicContent':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=*,item.id,item.content,item.section_name` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      return section.data[0].item
      break
    case 'CallToAction':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.*,item.buttons.collection,` +
            `item.buttons.item.id,item.buttons.item.slug,item.buttons.item.name` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      return section.data[0].item
      break
    case 'Hero':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.id,item.image,item.section_name,item.style,item.text,item.buttons.collection,` +
            `item.buttons.item.id,item.buttons.item.slug,item.buttons.item.name` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      return section.data[0].item

      break
    case 'Team':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.id,item.text,item.section_name` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()

      section = section.data[0].item

      let team = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/Brands` +
            `?fields=team.id,team.sort,team.directus_users_id.first_name,team.directus_users_id.last_name,team.directus_users_id.title,team.directus_users_id.description,team.directus_users_id.avatar` +
            `&filter[domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}`
        )
      ).json()

      section.team = team.data[0].team

      return section
      break
    case 'FeatureMajor':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.*,item.buttons.collection,` +
            `item.buttons.item.id,item.buttons.item.slug,item.buttons.item.name` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      return section.data[0].item
      break
    case 'FeatureList':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.id,item.text,item.section_name,item.items` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      return section.data[0].item
      break
    case 'PostsRecent':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.id,item.text,item.section_name,item.limit` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      section = section.data[0].item

      posts = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/Posts` +
            `?fields=id,slug,name,description,date_created,image` +
            `&filter[brands][brands_id][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}` +
            `&filter[status][_eq]=published` +
            `&sort[]=-date_created&limit=${section.limit ? section.limit : 3}`
        )
      ).json()
      section.posts = posts.data
      return section
      break
    case 'ProductsAll':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.id,item.text,item.section_name,item.filter,item.pagination` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      section = section.data[0].item
      // console.log(section)

      let products = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/Products` +
            `?fields=id,stripeId,slug,name,description,image,type` +
            `&filter[status][_eq]=published` +
            `&filter[type][_in]=${
              section.filter ? section.filter.slice(0, -1) : 'all'
            }` +
            `&filter[brands][Brands_id][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}`
        )
      ).json()
      // console.log(products)
      section.products = products.data
      return section
    case 'ProductComponents':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.id,item.text,item.section_name,item.items.*,` +
            `item.items.item.id,item.items.item.name,item.items.item.description,` + // products
            `item.items.item.modules.item.id,item.items.item.modules.item.name,item.items.item.modules.item.description,item.items.item.modules.sort` + // modules
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      section = section.data[0].item

      return section
      break
    case 'ProductFAQs':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.*` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      return section.data[0].item
      break
    case 'ProductsFeatured':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.id,item.text,item.section_name,item.items.*` +
            `item.items.item.id,item.items.item.slug,item.items.item.name,item.items.item.description,item.items.item.image,item.items.item.type` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      return section.data[0].item
      break
    case 'ProductPeek':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.id,item.text,item.section_name` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()

      section = section.data[0].item
      let videos = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.items.*,item.items.CourseContent_id.id,item.items.CourseContent_id.name,item.items.CourseContent_id.video` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()

      section.videos = videos.data[0].item.items
      return section
    case 'ProductPricing':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.id,item.text,item.section_name,item.prices.*,products_id.stripeId` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      section = section.data[0].item
      // console.log('here pricing section', section)

      let { data: stripePrices } = await (
        await fetch(
          `https://api.stripe.com/v1/prices/search?query=product:"${params.product_id}" AND active:"true"`,
          {
            method: 'GET',
            headers: {
              'Stripe-Version': '2022-08-01',
              search_api_beta: 'v1',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PRODUCTINFO}`,
              'Content-Type': 'application/json',
            },
          }
        )
      ).json()
      // console.log('stripe prices', stripePrices)

      let consolidatedPrices: any = []

      section.prices?.map((price: any) => {
        stripePrices?.map((stripePrice: any) => {
          // find price in stripePrices
          if (stripePrice.id === price.stripeId) {
            consolidatedPrices.push({
              ...price,
              ...stripePrice,
            })
            // console.log('consolidatedPrices', consolidatedPrices)
          }
        })
      })

      section.prices = consolidatedPrices
      // console.log('section + prices', section)

      return section
    case 'ProductReviews':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=*,item.*,item.items.*,item.items.ReviewId.*` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      section = section.data[0].item
      // console.log('section', section)
      return section
    case 'PostsAll':
      section = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/${
            params.pages_id ? 'PageSections' : 'ProductSections'
          }` +
            `?fields=item.id,item.text,item.section_name,item.limit` +
            `&filter[id][_eq]=${params.id}`
        )
      ).json()
      section = section.data[0].item

      posts = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_REST_API}/Posts` +
            `?fields=id,slug,name,description,date_created,image` +
            `&filter[brands][brands_id][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}` +
            `&filter[status][_eq]=published` +
            `&sort[]=-date_created`
        )
      ).json()
      section.posts = posts.data
      return section
      break
  }
}

export async function getProduct(path: any) {
  // console.log('query', path)
  return await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Products` +
        `?fields=image,id,type,description,library_access,showcases,stripeId,slug,name,sections.*` + // key fields
        `&filter[status][_eq]=published` +
        `&filter[slug][_eq]=${path}`
    )
  ).json()
}

export async function getPosts(id: any, type: any) {
  let section = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/${type}` +
        `?fields=item.id,item.text,item.section_name,item.limit` +
        `&filter[id][_eq]=${id}`
    )
  ).json()
  section = section.data[0].item

  let posts = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Posts` +
        `?fields=id,slug,name,description,date_created,image` +
        `&filter[brands][brands_id][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}` +
        `&filter[status][_eq]=published` +
        `&sort[]=-date_created`
    )
  ).json()
  section.posts = posts.data
  return section
}
