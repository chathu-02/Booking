import { prisma } from "@/lib/prisma";
export const dynamic = 'force-dynamic'
export default async function BookingPage() {
  // Database  (Services) fetching
  const services = await prisma.service.findMany();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Book a Service</h1>
      
      <form action="/api/book" method="POST" className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Your Name</label>
          <input name="customerName" type="text" required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Select Service</label>
          <select name="serviceId" className="w-full p-2 border rounded">
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - ${service.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Date & Time</label>
          <input name="startTime" type="datetime-local" required className="w-full p-2 border rounded" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}