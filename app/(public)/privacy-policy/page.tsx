import { constants } from '@/shared/constants';

export default function Page() {
  return (
    <main className='mt-[70px] flex w-full flex-col gap-12 px-4 font-sans'>
      <section className='mx-auto w-full max-w-5xl'>
        <h1>Privacy Policy</h1>

        <p className='py-3 leading-relaxed'>
          At {constants.name}, accessible from {constants.url}, one of our main priorities
          is the privacy of our visitors. This Privacy Policy document contains types of
          information that is collected and recorded by {constants.name} and how we use it.
        </p>
        <p className='py-3 leading-relaxed'>
          If you have additional questions or require more information about our Privacy
          Policy, do not hesitate to contact us.
        </p>
        <h2 className='py-2 leading-relaxed'>Log Files</h2>
        <p className='py-3 leading-relaxed'>
          {constants.name} follows a standard procedure of using log files. These files log
          visitors when they visit websites. All hosting companies do this and a part of
          hosting services' analytics. The information collected by log files include
          internet protocol (IP) addresses, browser type, Internet Service Provider (ISP),
          date and time stamp, referring/exit pages, and possibly the number of clicks.
          These are not linked to any information that is personally identifiable. The
          purpose of the information is for analyzing trends, administering the site,
          tracking users' movement on the website, and gathering demographic information.
          Our Privacy Policy was created with the help of the{' '}
          <a
            className='base-link'
            href='https://www.privacypolicyonline.com/privacy-policy-generator/'>
            Privacy Policy Generator
          </a>
          .
        </p>
        <h2 className='py-2 leading-relaxed'>Cookies and Web Beacons</h2>
        <p className='py-3 leading-relaxed'>
          Like any other website, {constants.name} uses "cookies". These cookies are used to
          store information including visitors' preferences, and the pages on the website
          that the visitor accessed or visited. The information is used to optimize the
          users' experience by customizing our web page content based on visitors' browser
          type and/or other information.
        </p>
        <p className='py-3 leading-relaxed'>
          For more general information on cookies, please read{' '}
          <a
            className='base-link'
            href='https://www.privacypolicyonline.com/what-are-cookies/'>
            the "Cookies" article from the Privacy Policy Generator
          </a>
          .
        </p>

        <h2 className='py-2 leading-relaxed'>Google DoubleClick DART Cookie</h2>
        <p className='py-3 leading-relaxed'>
          Google is one of a third-party vendor on our site. It also uses cookies, known as
          DART cookies, to serve ads to our site visitors based upon their visit to
          www.website.com and other sites on the internet. However, visitors may choose to
          decline the use of DART cookies by visiting the Google ad and content network
          Privacy Policy at the following URL –{' '}
          <a className='base-link' href='https://policies.google.com/technologies/ads'>
            https://policies.google.com/technologies/ads
          </a>
          .
        </p>
        <h2 className='py-2 leading-relaxed'>Privacy Policies</h2>
        <p className='py-3 leading-relaxed'>
          You may consult this list to find the Privacy Policy for each of the advertising
          partners of {constants.name}.
        </p>
        <p className='py-3 leading-relaxed'>
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript,
          or Web Beacons that are used in their respective advertisements and links that
          appear on {constants.name}, which are sent directly to users' browser. They
          automatically receive your IP address when this occurs. These technologies are
          used to measure the effectiveness of their advertising campaigns and/or to
          personalize the advertising content that you see on websites that you visit.
        </p>
        <p className='py-3 leading-relaxed'>
          Note that {constants.name} has no access to or control over these cookies that are
          used by third-party advertisers.
        </p>
        <h2 className='py-2 leading-relaxed'>Third Party Privacy Policies</h2>
        <p className='py-3 leading-relaxed'>
          {constants.name}'s Privacy Policy does not apply to other advertisers or websites.
          Thus, we are advising you to consult the respective Privacy Policies of these
          third-party ad servers for more detailed information. It may include their
          practices and instructions about how to opt-out of certain options.{' '}
        </p>
        <p className='py-3 leading-relaxed'>
          You can choose to disable cookies through your individual browser options. To know
          more detailed information about cookie management with specific web browsers, it
          can be found at the browsers' respective websites. What Are Cookies?
        </p>
        <h2 className='py-2 leading-relaxed'>Children's Information</h2>
        <p className='py-3 leading-relaxed'>
          Another part of our priority is adding protection for children while using the
          internet. We encourage parents and guardians to observe, participate in, and/or
          monitor and guide their online activity.
        </p>
        <p className='py-3 leading-relaxed'>
          {constants.name} does not knowingly collect any Personal Identifiable Information
          from children under the age of 13. If you think that your child provided this kind
          of information on our website, we strongly encourage you to contact us immediately
          and we will do our best efforts to promptly remove such information from our
          records.
        </p>
        <h2 className='py-2 leading-relaxed'>Online Privacy Policy Only</h2>
        <p className='py-3 leading-relaxed'>
          This Privacy Policy applies only to our online activities and is valid for
          visitors to our website with regards to the information that they shared and/or
          collect in {constants.name}. This policy is not applicable to any information
          collected offline or via channels other than this website.
        </p>
        <h2 className='py-2 leading-relaxed'>Consent</h2>
        <p className='py-3 leading-relaxed'>
          By using our website, you hereby consent to our Privacy Policy and agree to its
          Terms and Conditions.
        </p>
      </section>
    </main>
  );
}
