import Image from 'next/image';
import css from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={css.page}>
      <div className={css.background}>
        <Image src="/background.png" alt="Truck background" layout="fill" objectFit="cover" />
        <div className={css.overlay} />
      </div>
      <main className={css.main}>
        <div className={css.containerText}>
          <h1 className={css.title}>Campers of your dreams</h1>
          <p className={css.about}>You can find everything you want in our catalog</p>
        </div>
        <Link href="./catalog" className={css.mainButton}>
          View Now
        </Link>
      </main>
    </div>
  );
}
