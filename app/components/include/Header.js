import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <div>
          <Link href="/">나의 사진 일기</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
