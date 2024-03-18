import { AccordionWrapper } from '@/components/accordion-wrapper';
import { Separator } from '@/components/ui/separator';
import { constants } from '@/shared/constants';

const questions: Array<{ title: string; content: string }> = [
  {
    title: 'Ordering Process: How do I place an order?',
    content: `Placing an order with ${constants.name} is quick and easy! Simply browse our website, select the items you love, and add them to your shopping cart. Once you're ready to checkout, follow the prompts to enter your shipping and payment information. Confirm your order, and you're all set!`
  },
  {
    title: "Ordering Process: Can I modify or cancel my order after it's been placed?",
    content:
      "We strive to process orders as quickly as possible to ensure fast delivery. Once an order has been placed, modifications or cancellations may not always be possible. However, please contact our customer support team immediately, and we'll do our best to assist you."
  },
  {
    title: 'Shipping and Delivery: How long will it take to receive my order?',
    content:
      'We understand the excitement of receiving your new items! Our standard shipping typically takes [X] business days for domestic orders and [X] business days for international orders. However, please note that shipping times may vary depending on your location and any unforeseen circumstances.'
  },
  {
    title: 'Shipping and Delivery: Do you offer expedited shipping options?',
    content:
      "Yes, we offer expedited shipping for customers who need their orders to arrive sooner. During checkout, you'll have the option to select expedited shipping for an additional fee. Please refer to our shipping policy for more information on available shipping options and rates."
  },
  {
    title: 'Returns and Exchanges: What is your return policy?',
    content:
      "We want you to love your purchase! If for any reason you're not completely satisfied with your order, you may return it within [X] days of receipt for a full refund or exchange. Please ensure that the items are in their original condition with tags attached. Certain exclusions may apply, so please review our return policy for detailed information."
  },
  {
    title: 'Returns and Exchanges: How do I initiate a return or exchange?',
    content:
      "To initiate a return or exchange, please contact our customer support team with your order number and reason for return. We'll provide you with further instructions and assist you throughout the process. Please note that return shipping fees may apply, except in cases of defective or incorrect items."
  },
  {
    title: 'Product Information: How can I find information about sizing and fit?',
    content:
      'We provide detailed sizing charts and fit guides on each product page to help you find the perfect fit. If you have specific questions about sizing or need personalized recommendations, our customer support team is here to assist you. Feel free to reach out to us with any inquiries!'
  },
  {
    title:
      'Product Information: Are your products ethically sourced and environmentally friendly?',
    content:
      'We are committed to ethical and sustainable practices. We work closely with our suppliers to ensure that our products meet high standards of quality, fairness, and environmental responsibility. Many of our items are made from eco-friendly materials and produced under fair labor conditions.'
  }
];

export default function Page() {
  return (
    <main className='mx-auto mt-24 flex w-full max-w-5xl flex-col gap-8 px-4 font-sans-body text-lg'>
      <h1>
        <i className='text-primary'>FAQ</i> (Frequently Asked Questions)
      </h1>
      <h2>Welcome to Our FAQ Page</h2>
      <div className='flex flex-col gap-3'>
        <p>
          Have questions? You're in the right place! Our Frequently Asked Questions (FAQ)
          page is designed to provide you with quick and comprehensive answers to common
          queries about shopping with us. Whether you're curious about our ordering process,
          shipping policies, returns, or product information, we're here to ensure your
          shopping experience is seamless and enjoyable.
        </p>

        <p>
          Browse through our FAQ section to find the answers you need. Can't find what
          you're looking for? Don't worry, our dedicated customer support team is always
          ready to assist you. At {constants.name}, we believe in transparency and strive to
          provide you with all the information you need to shop confidently.
        </p>

        <p>
          Thank you for choosing us as your trusted fashion destination. Let's get your
          questions answered and your shopping journey underway!
        </p>
      </div>

      <Separator decorative />
      <AccordionWrapper data={[...questions]} />

      <p>
        If you have any additional questions or concerns, please don't hesitate to contact
        us. Our customer support team is here to assist you and provide you with the best
        shopping experience possible!
      </p>
    </main>
  );
}
