import { createHash } from 'crypto'
import { NextResponse } from 'next/server'

export async function GET() {
	const ts = new Date().getTime()
	const apikey = process.env.MARVEL_PUBLIC_KEY
	const privatekey = process.env.MARVEL_PRIVATE_KEY ?? ''

	const banana = ts + privatekey + apikey

	const hash = createHash('md5').update(banana).digest('hex')

	return NextResponse.json({ ts, apikey, hash })
}
