import { constants } from '@/shared/constants';

export default function Page() {
  return (
    <main className='mt-[70px] flex w-full flex-col gap-12 px-4 font-sans'>
      <h1>About Our Story</h1>
      <p>
        Welcome to {constants.name}, where fashion meets convenience! We are a premier
        online destination for trendsetting individuals seeking quality clothing and
        accessories at their fingertips. Our mission is to provide an unparalleled
        shopping experience that combines the latest fashion trends with exceptional
        customer service.
      </p>
      <p>
        At {constants.name}, we understand that style is a reflection of your unique
        personality. That's why we curate a diverse collection of apparel and
        accessories that cater to all tastes, preferences, and sizes. Whether you're
        looking for casual everyday wear, chic office attire, or statement pieces for
        special occasions, we've got you covered.
      </p>
      <p>
        Our team of fashion enthusiasts scours the globe to bring you the hottest trends
        and timeless classics. From runway-inspired designs to wardrobe essentials, each
        item in our collection is carefully selected for its quality, style, and
        affordability. We believe that everyone deserves to look and feel their best
        without breaking the bank.
      </p>
      <p>
        What sets us apart is our commitment to customer satisfaction. We strive to make
        your shopping experience seamless and enjoyable from start to finish. With
        user-friendly navigation, secure payment options, and fast shipping, we ensure
        that you receive your order promptly and hassle-free. Our dedicated customer
        support team is always available to assist you with any questions or concerns
        you may have.
      </p>
      <p>
        But we're more than just an online store – we're a community of fashion
        enthusiasts who share a passion for self-expression through clothing. Follow us
        on social media for style inspiration, exclusive promotions, and
        behind-the-scenes glimpses of our latest arrivals. Join the conversation and
        connect with like-minded individuals who share your love for fashion.
      </p>
      <p>
        Thank you for choosing {constants.name} as your go-to destination for all your
        fashion needs. Whether you're browsing for the perfect outfit or treating
        yourself to a wardrobe refresh, we're here to help you look and feel your best
        every step of the way. Happy shopping!
      </p>
    </main>
  );
}
