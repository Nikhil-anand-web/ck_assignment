"use client"

import getCartCount from '@/app/actions/getCartCount'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const CartCount = () => {
  const { status } = useSession()

  const fetchCartCount = async () => {
    const res = await getCartCount()
    let value = 0
    res.data.forEach(element => {
      value += parseInt(element.qty)
    })
    return value
  }

  const shouldFetch = status === "authenticated"

  const { data } = useSWR(shouldFetch ? '/action/getCartCount' : null, fetchCartCount)

  return <>{data ?? 0}</>
}

export default CartCount
