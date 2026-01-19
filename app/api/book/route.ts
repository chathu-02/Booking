import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  
  const booking = await prisma.booking.create({
    data: {
      customerName: formData.get("customerName") as string,
      customerEmail: "customer@example.com", 
      startTime: new Date(formData.get("startTime") as string),
      serviceId: formData.get("serviceId") as string,
      businessId: "test-biz-123",
    },
  });

  return NextResponse.json({ message: "Booking Successful!", booking });
}