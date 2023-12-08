import Link from 'next/link';
import { constants } from '@/shared/constants';

type Navigation = { url: string; label: string }[][];

const navigation: Navigation = [[
  
]];

export default function Footer() {
  return (
    <footer>
      <nav>
        {navigation.map((column, index) => (
          <section key={index}>
            {column.map(({ url, label }, i) => (
              <Link key={i} href={url}>
                <span>{label}</span>
              </Link>
            ))}
          </section>
        ))}
      </nav>
      <p className=''>
        &copy; {new Date().getFullYear()} - {constants.name}
      </p>
    </footer>
  );
}
