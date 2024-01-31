import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'
import cloudinary from '@/libs/cloudinary'
import processImage from '@/libs/processImage'
import {unlink} from 'fs/promises'
export async function GET() {
    try {
        const result = await connection.query('SELECT * FROM product')
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        })
    }
}

export async function POST(request) {
    try {
        const data = await request.formData()
        const image=data.get("image")
        if (!data.get('name')) {
            return NextResponse.json({
                message: "Name is required"
            },
                {
                    status: 400
                })
        }
        if (!image) {
            return NextResponse.json({
                message: "Image is required"
            },
                {
                    status: 400
                })
        }

        const filePath=await processImage(image)
        const res=await cloudinary.uploader.upload(filePath)
        if(res){
            await unlink(filePath)
        }
        const result = await connection.query('INSERT INTO product SET ?', {
            name: data.get("name"),
            description: data.get("description"),
            price: data.get("price"),
            image: res.secure_url
        })
        return NextResponse.json({
            name: data.get("name"),
            description: data.get("description"),
            price: data.get("price"),
            id: result.insertId
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: error.message,
        })
    }
}
