import { db } from "@/db"
import { issues } from "@/db/schema"
import { getCurrentUser } from "@/lib/dal"
import { NextResponse } from "next/server"

export const GET = async () => {
	try {
		const issues = await db.query.issues.findMany({})
		return NextResponse.json({ data: { issues } })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'lol' }, { status: 500 })
	}
}

export const POST = async (req: NextResponse) => {
	const user = await getCurrentUser();
	const newIssueData = await req.json()
	try {
		const [newIssue] = await db
			.insert(issues)
			.values({ userId: user?.id, ...newIssueData })
			.returning()

		return NextResponse.json({ data: newIssue })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ message: 'lol' }, { status: 500 })
	}
}