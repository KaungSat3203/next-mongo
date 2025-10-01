import Product from "@/models/Product";
import dbConnect from '@/lib/db'

export async function GET(request, { params }) {
  console.log(params)
  await dbConnect()
  const id = params.id || params._id
  const product = await Product.findById(id).populate('category')
  console.log({ product });
  return Response.json(product);
}

export async function DELETE(request, { params }) {
  await dbConnect()
  const id = params.id || params._id
  const deleted = await Product.findByIdAndDelete(id)
  if (!deleted) return new Response('Not found', { status: 404 })
  return new Response(JSON.stringify(deleted))
}

export async function PUT(request, { params }) {
  await dbConnect()
  const id = params.id || params._id
  const body = await request.json()
  const replaced = await Product.findOneAndReplace({ _id: id }, body, { new: true })
  if (!replaced) return new Response('Not found', { status: 404 })
  return new Response(JSON.stringify(replaced))
}
