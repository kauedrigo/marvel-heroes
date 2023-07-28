import { NextResponse } from 'next/server'

import { getMarvelAuthenticationParams } from '@/utils'

export async function GET() {
	const authenticationParams = getMarvelAuthenticationParams()

	return NextResponse.json({ ...authenticationParams })
}
