import Image from 'next/image'

export default function ContactFooter() {
  return (
    <div className="kk-contact-footer">
      <section className="container">
        <p className="h3 kk-m-0-auto">Contact Us</p>
        <div className="row" itemScope itemType="http://schema.org/LocalBusiness">
          <div className="col-sm-6 text-center">
            <a itemProp="url" href="http://www.kandkblueberries.com/">
              <Image
                width={225}
                height={140}
                itemProp="logo"
                className="kk-footer-logo"
                src="/logo.png"
                alt=""
              />
            </a>
            <div>
              <strong itemProp="name">K &amp; K Blueberries</strong>
            </div>
            <div>
              <em>U-Pick Blueberries in Hermiston, Oregon</em>
            </div>
            <hr />
            <div
              itemProp="address"
              itemScope
              itemType="http://schema.org/PostalAddress"
            >
              <span itemProp="streetAddress">29555 Minnehaha Rd</span>
              <br />
              <span itemProp="addressLocality">Hermiston</span>,{' '}
              <span itemProp="addressRegion">Oregon</span>{' '}
              <span itemProp="postalCode">97838</span>
            </div>
            <div
              itemProp="geo"
              itemScope
              itemType="http://schema.org/GeoCoordinates"
            >
              <meta itemProp="latitude" content="45.810609" />
              <meta itemProp="longitude" content="-119.335015" />
            </div>
            <hr />
            <div>
              <span>
                <strong>Open Blueberry Season:</strong>
              </span>
              <br />
              <meta itemProp="openingHours" content="Mo-Fr 06:30-13:00" />
              <meta itemProp="openingHours" content="Mo-Fr 17:00-20:00" />
              <meta itemProp="openingHours" content="Sa 6:30-20:00" />
              <meta itemProp="openingHours" content="Su 07:00-14:00" />
              Weekdays: 6:30am–1pm <em>and</em> 5pm–8:00pm
              <br />
              Saturday: 6:30am–8:00pm
              <br />
              Sunday: 7am–2pm
              <hr className="invisible" />
              <p className="kk-m-0-auto kk-max-width-345">
                <em>
                  We close in high temperatures for our patrons safety. Please
                  call for up to date information
                </em>
              </p>
            </div>
            <hr />
            <div>
              <strong>Phone: </strong>
              <span itemProp="telephone">(541) 567-3146</span>
            </div>
            <div>
              <strong>Email: </strong>
              <a itemProp="email" href="mailto:kathy@kandkblueberries.com">
                kathy@kandkblueberries.com
              </a>
            </div>
          </div>
          <div className="col-sm-6 text-center">
            <div className="kk-m-20-auto">
              <a
                itemProp="sameAs"
                href="https://www.facebook.com/K-and-K-Blueberries-104303779663777/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  width={144}
                  height={27}
                  src="/find_us_on_facebook.png"
                  alt="Find us on Facebook"
                />
              </a>
            </div>
            <div className="kk-m-20-auto">
              <strong className="kk-display-block">
                <em>Proud Member of: </em>
              </strong>
              <a
                href="https://hermistonchamber.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  width={160}
                  height={85}
                  src="/hermiston_chamber.png"
                  alt="Hermiston Chamber of Commerce"
                />
              </a>
            </div>
            <a
              itemProp="hasMap"
              title="Open Map"
              href="https://goo.gl/maps/FtEFbnttPW22"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/staticmap.png"
                className="img-responsive kk-footer-map"
                width={395}
                height={270}
                alt="Map to K & K Blueberries"
              />
            </a>
          </div>
          <meta itemProp="MakesOffer" content="U-Pick Blueberries" />
        </div>
      </section>
    </div>
  )
}
