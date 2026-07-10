'use client';
import Link from 'next/link';
import css from './Header.module.css';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
  return (
    <header>
      <div className={css.containerHeader}>
        <div className={css.logo}>
          <Link href="/">
            <svg width={136} height={16}>
              <use href="/TravelTrucks_logo.svg"></use>
            </svg>
          </Link>
        </div>
        <nav className={css.menu}>
          <ul className={css.menuList}>
            <li className={css.menuItem}>
              <Link href="/" className={`${css.menuLink} ${isActive('/') ? css.active : ''}`}>
                Home
              </Link>
            </li>
            <li className={css.menuItem}>
              <Link href="/catalog" className={`${css.menuLink} ${isActive('/catalog') ? css.active : ''}`}>
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
