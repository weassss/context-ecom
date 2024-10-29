import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const CheckoutSchema = z.object({
  email: z.string().email(),
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    image: z.string(),
  })),
  total: z.number(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, items, total } = CheckoutSchema.parse(body);

    const order = await prisma.order.create({
      data: {
        email,
        total,
        items: {
          create: items.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 400 }
    );
  }
}