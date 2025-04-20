import OrderList from "@/app/(main)/account/_components/OrderList"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import db from "@/utils/db"
import { getServerSession } from "next-auth"

export const dynamic = 'force-dynamic';
const page =  async() => {
    const user = await getServerSession(authOptions)
    if (!user || user.user.role ===3) {
        return null
        
    }
    const res = await db.orders.findMany({
        where:{
          AND:[{paymentStatus:1}]
        },
        orderBy: {
          createdAt: 'desc' // or 'asc' if you want oldest first
        }
       
    })
    
  return (
    <div>
        <OrderList orders = {res}/>
      
    </div>
  )
}

export default page
