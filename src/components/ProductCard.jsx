import Link from "next/link"

function ProductCard({ product }) {
    return (
        <Link className='bg-white rounded-lg border-gray-800 mb-3 hover:bg-gray-200 hover:cursor-pointer' href={`products/${product.id}`}>
            {product.image && (<img src={product.image} alt="Product image" className="W-full rounded-t-lg" />)}
            <div className="p-4">
                <h1 className='text-lg font-bold'>{product.name}</h1>
                <p>{product.description}</p>
                <h2 className='text-2xl text-slate-600'>{product.price}</h2>
            </div>
        </Link>
    )
}

export default ProductCard