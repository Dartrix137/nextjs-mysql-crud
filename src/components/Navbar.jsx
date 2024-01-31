import Link from 'next/link'
function Navbar() {
  return (
    <nav className='bg-zinc-900 text-white py-3 mb-2'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link className='text-3xl' href={"/products"}>NextMySQL</Link>
        <ul>
          <li>
            <Link className='text-sky-500 hover:text-sky-700' href="/new">
              New Product
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar