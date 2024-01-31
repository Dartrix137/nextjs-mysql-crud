"use client"
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
function ProductForm() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0
    })
    const [file, setFile] = useState(null)
    const form = useRef(null)
    const router = useRouter()
    const params = useParams()
    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const formData = new FormData()
    formData.append("name", product.name)
    formData.append("description", product.description)
    formData.append("price", product.price)
    if (file) {
        formData.append("image", file)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!params.id) {
            const response = await axios.post(`http://localhost:3000/api/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

        } else {
            const res = await axios.put(`http://localhost:3000/api/products/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

        }
        router.refresh()
        form.current.reset()
        router.push('/products')
    }
    useEffect(() => {
        if (params.id) {
            axios.get(`http://localhost:3000/api/products/${params.id}`).then(res => {
                setProduct({
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price
                })
            })
        }
    }, [])
    return (

        <form className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit} ref={form}>
            <label
                htmlFor="name"
                className='block text-gray-700 text-sm font-bold mb-2'>Product name:</label>
            <input
                type="text"
                name="name" placeholder="Product name"
                onChange={handleChange}
                value={product.name}
                autoFocus
                className='text-gray-900 shadow appearance-none border rounded w-full py-2 px-3' />
            <label
                htmlFor="description"
                className='block text-gray-700 text-sm font-bold mb-2'>Product description:</label>
            <textarea
                rows={3}
                name="description"
                placeholder="Product description"
                onChange={handleChange}
                value={product.description}
                className='text-gray-900 shadow appearance-none border rounded w-full py-2 px-3' />
            <label
                htmlFor="price"
                className='block text-gray-700 text-sm font-bold mb-2'>Product price:</label>
            <input
                type="number"
                name="price"
                placeholder="00.00"
                onChange={handleChange}
                value={product.price}
                className='text-gray-900 shadow appearance-none border rounded w-full py-2 px-3' />
            <label
                htmlFor="price"
                className='block text-gray-700 text-sm font-bold mb-2'>Product mage:</label>
            <input
                type="file"
                name="image"
                className='text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 mb-2' onChange={(e) => {
                    setFile(e.target.files[0])
                }} />
            {file && (<img className='w-96 object-contain mx-auto'
                src={URL.createObjectURL(file)} alt="product image" />)}
            <button type="submit"
                className='bg-blue-500 hover:bg-blue-700 text-white rounded font-bold py-2 px-4 mt-2'>{params.id ? "Edit product" : "Save product"}</button>

        </form>


    )
}
export default ProductForm