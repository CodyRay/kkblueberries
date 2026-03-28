import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getHomeData } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Welcome to K & K Blueberries',
}

export default function Home() {
  let homeData: ReturnType<typeof getHomeData>
  try {
    homeData = getHomeData()
  } catch (e) {
    return (
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {String(e)}
        {e instanceof Error && e.stack ? '\n\n' + e.stack : ''}
      </pre>
    )
  }

  const { upickPricePerPound } = homeData

  return (
    <div id="home" className="text-center">
      <h1>Welcome to K &amp; K Blueberries</h1>
      <div className="row">
        <div className="col-sm-3 col-sm-offset-1 hidden-xs">
          <Image
            width={241}
            height={250}
            className="img-responsive img-thumbnail"
            src="/large_blueberries_one_sitting_on_nickle.jpg"
            alt="a bunch of large blueberries, one is sitting on a nickle"
          />
        </div>
        <div className="col-sm-4 kk-m-0-auto">
          <Image
            width={333}
            height={250}
            className="img-responsive img-thumbnail"
            src="/truck.jpg"
            alt="a blue truck that says K and K Blueberries on the side"
          />
        </div>
        <div className="col-sm-3 hidden-xs">
          <Image
            width={241}
            height={250}
            className="img-responsive img-thumbnail"
            src="/two_buckets_of_blueberries.jpg"
            alt="two buckets of blueberries"
          />
        </div>
      </div>
      <h2>
        <span className="icon-blueberries" />
        U-Pick Price
      </h2>
      <span className="h4">${upickPricePerPound} per pound</span>
      <p>
        Please note that we <strong>do not accept credit or debit cards</strong>.
        Cash is preferred, but checks are accepted with ID
      </p>
      <hr />
      <div className="row kk-center-vertical">
        <div className="col-sm-6">
          <p>
            K &amp; K Blueberries offers u-pick blueberries in Hermiston, Oregon.
            Our farm has 20 acres of Dukes; an early, large, easy to pick variety.
            Our season typically runs mid June to mid July (depending on the
            weather). We are{' '}
            <a
              href="https://www.globalgap.org/uk_en/who-we-are/about-us/"
              rel="noopener noreferrer"
              target="_blank"
            >
              GAP certified
            </a>{' '}
            and we water and fertilize using drip lines to limit contact with the
            berries. We have parking on both sides of the driveway heading in
            towards the bushes. Please watch out for sprinklers. We have portable
            toilets and a hand washing station available for our customers.
          </p>
        </div>
        <div className="col-sm-6">
          <Image
            width={469}
            height={250}
            className="img-thumbnail img-responsive"
            src="/rows_of_blueberries.jpg"
            alt="Rows of Blueberries at K & K Blueberries"
          />
        </div>
      </div>
      <div className="kk-mt-20 kk-blue-box">
        <strong>Questions?</strong> Checkout{' '}
        <Link href="/info">our information page</Link> for common questions or
        give us a call at (541) 567-3146
      </div>
      <hr />
      <div className="row kk-center-vertical">
        <div className="col-md-8 col-sm-6">
          <h2>Pre-Ordering</h2>
          <p>
            You can pre-order boxes of blueberries via call or email. Contact us
            with the number of pounds (in 5 pound increments) to confirm
            availability.
          </p>
        </div>
        <div className="col-md-4 col-sm-6">
          <Image
            width={255}
            height={200}
            className="img-responsive img-thumbnail"
            src="/box_of_blueberries.jpg"
            alt="a plastic container of blueberries that says K and K blueberries on the front"
          />
        </div>
      </div>
    </div>
  )
}
