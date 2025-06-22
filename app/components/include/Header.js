import Link from 'next/link';

const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-full h-[70px] bg-[#2c2c2c]'>
      <nav className='h-[100%]'>
        <div className='h-[100%] flex justify-center items-center'>
          <Link href="/" className='font-bold text-3x1 text-[#fff]'>나의 사진 일기</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
