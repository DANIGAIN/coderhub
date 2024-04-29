import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'

await connect()

export async function POST(request) {
    try {   
    
            
       // const formData = await request.json();
        // const image = formData.get('image')
        // const filePath = `./public/file/${file.name}`;
        console.log(request)


        return NextResponse.json({
            success: true,
            sevedConect,
            message: "Contact is send successfuly"
        } , {status:200 })

    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err,
            message: "Contact can not seved"
        }, { status: 500 })

    }
}