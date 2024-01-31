import axios from 'axios'
import Buttons from '@/app/products/[id]/Buttons'
async function loadProduct(productId) {
    const res = await axios.get(`http://localhost:3000/api/products/${productId}`)
    return res.data
}

async function ProductPage({ params }) {
    const product = await loadProduct(params.id)
    return (
        <section className='flex justify-center items-center h-[calc(100vh-10rem)]'>
            <div className='flex w-3/6 h-2/6 justify-center'>
                <div className='p-6 bg-white text-gray-900 w-2/3'>
                    <h3 className='text-2xl font-bold mb-3'>Name: {product.name}</h3>
                    <p className='text-slate-700'>{product.description}</p>
                    <h4 className='text-4xl font-bold'>Price: {product.price}</h4>
                    <Buttons productId={product.id} />
                </div>
                <img className='w-3/3' src={product.image} alt="Product image" />
            </div>
        </section>
    )
}

export default ProductPage