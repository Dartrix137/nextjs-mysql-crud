import axios from 'axios'
import ProductCard from '@/components/ProductCard'
async function loadProducts(){
    const res=await axios.get('http://localhost:3000/api/products')
    return res.data
}

async function ProductsPage() {
    const products=await loadProducts()
  return (
    <div className='grid gap-4 grid-cols-4 text-gray-800'>
        {products.map(product=>(
            <ProductCard key={product.id} product={product}/>
        ))}
    </div>
  )
}

export default ProductsPage