import dynamic from 'next/dynamic'
export { default as Layout } from './Default'
export { default as CourseLayout } from './Course'
export { default as PageNotFound } from './PageNotFound'
import { SwrBrand } from '@/lib/swr-helpers'
import { SwrSection } from '@/lib/swr-helpers'

const CallToAction = dynamic(
  () => import('@/components/organisms/CallToAction')
)
const BasicContent = dynamic(
  () => import('@/components/organisms/BasicContent')
)
const FeatureMajor = dynamic(
  () => import('@/components/organisms/Feature/FeatureMajor')
)
const FeatureList = dynamic(
  () => import('@/components/organisms/Feature/FeatureList')
)
const Hero = dynamic(() => import('@/components/organisms/Hero'))
const Team = dynamic(() => import('@/components/organisms/Team'))
const PostsAll = dynamic(() => import('@/components/organisms/Post/PostsAll'))
const PostsRecent = dynamic(
  () => import('@/components/organisms/Post/PostsRecent')
)
const ProductsAll = dynamic(
  () => import('@/components/organisms/Product/ProductsAll')
)
const ProductsFeatured = dynamic(
  () => import('@/components/organisms/Product/ProductsFeatured')
)
const ProductFAQs = dynamic(
  () => import('@/components/organisms/Product/ProductFAQs')
)
const ProductPeek = dynamic(
  () => import('@/components/organisms/Product/ProductPeek')
)
const ProductPricing = dynamic(
  () => import('@/components/organisms/Product/ProductPricing')
)

const ProductComponents = dynamic(
  () => import('@/components/organisms/Product/ProductComponents')
)

const ProductReviews = dynamic(
  () => import('@/components/organisms/Product/ProductReviews')
)

let sectionData: any

export const Section = ({ section, productId }: any) => {
  // console.log('rendering:', section)

  const brand: any = SwrBrand()
  // console.log('brand ->', brand)
  let colors = {
    primaryColor: brand.primaryColor,
    accentColor: brand.accentColor,
  }
  let queryParams = {
    collection: section.collection,
    id: section.id,
    pages_id: section.pages_id,
    product_id: productId,
  }
  // console.log('queryParams:', queryParams)
  sectionData = SwrSection(queryParams)
  // console.log('sectionData:', sectionData)

  switch (section.collection) {
    // General
    case 'BasicContent':
      return (
        <BasicContent
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break
    case 'CallToAction':
      return (
        <CallToAction
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break
    case 'Hero':
      return (
        <Hero data={sectionData ? sectionData : null} colors={colors} />
      )
      break
    case 'Team':
      return (
        <Team data={sectionData ? sectionData : null} colors={colors} />
      )
      break
    case 'FeatureMajor':
      return (
        <FeatureMajor
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break
    case 'FeatureList':
      return (
        <FeatureList
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break

    // Posts
    case 'PostsAll':
      return (
        <PostsAll
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break
    case 'PostsRecent':
      return (
        <PostsRecent
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break

    // Products
    case 'ProductsAll':
      return (
        <ProductsAll
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break
    case 'ProductsFeatured':
      return (
        <ProductsFeatured
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break

    case 'ProductComponents':
      return (
        <ProductComponents
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break
    case 'ProductFAQs':
      return (
        <ProductFAQs
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break
    case 'ProductPeek':
      return (
        <ProductPeek
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break
    case 'ProductPricing':
      return (
        <ProductPricing
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break
    case 'ProductReviews':
      return (
        <ProductReviews
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )
      break

    default:
      return <></>
  }
}
