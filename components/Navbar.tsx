// Next
import Link from 'next/link';
import Image from 'next/image';
// Assets
import Logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <Link href='/'>
      <Image alt='Pokemon Logo' src={Logo} width={300} height={100} />
    </Link>
  );
}
