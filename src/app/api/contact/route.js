import { NextResponse } from 'next/server'
import Contact from '@/modals/contactModel'
import { connect } from '@/db/dbConfig'

await connect()

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, uid, subject , message } = body

        const sevedConect = await Contact.create({ name, uid, subject, message})
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