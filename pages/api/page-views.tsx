import { connectToDatabase } from '@/config/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (request: NextApiRequest, response: NextApiResponse) => {

  const slug = request.query.id

  if (!slug) {
    return response.status(404).json('Página não encontrada')
  }

  const { client, db } = await connectToDatabase()

  if (client.isConnected()) {
    const pageViewBySlug = await db.collection('pageviews').findOne({ slug })
    let total = 0
  
    if (pageViewBySlug) {
      total = pageViewBySlug.total + 1
      await db.collection('pageviews').updateOne({ slug }, { $set: { total } })
    } else {
      total = 1
      await db.collection('pageviews').insertOne({ slug, total })
    }

    return response.status(200).json({ total })
  }

  return response.status(500).json({
    error: 'Client DB is not connected'
  })

}