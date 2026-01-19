import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Make test business
  const business = await prisma.business.upsert({
    where: { email: 'test@salon.com' },
    update: {},
    create: {
      name: 'My Awesome Salon',
      email: 'test@salon.com',
    },
  })

  // 2. Make some services under that business
  await prisma.service.createMany({
    data: [
      { name: 'Hair Cut', duration: 30, price: 1500, businessId: business.id },
      { name: 'Facial', duration: 60, price: 3500, businessId: business.id },
      { name: 'Bridal Makeup', duration: 180, price: 25000, businessId: business.id },
    ],
  })

  console.log('✅ Sample data added successfully!')
  console.log('Business ID:', business.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })