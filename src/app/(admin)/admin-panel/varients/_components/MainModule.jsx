"use client"

import React from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from '@/components/ui/table'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toggleProductStatus from '@/app/actions/toggleProductStatus'
import deleteAProduct from '@/app/actions/deleteAProduct'

const MainModule = ({ varients ,productId}) => {
    const rtr = useRouter()

    const onStatusFlip = async (id) => {
        try {
            const res = await toggleProductStatus(id)
            if (res.success) {
                toast.success(res.message)
                rtr.refresh()
            }
        } catch (error) {
            console.log(error);

        }
    }
    const onDelete = async (id) => {
     
        try {
          const res = await deleteAProduct(id)
          if (res.success) {
            toast.success(res.message)
            rtr.refresh()

           
          }
        } catch (error) {
          console.log(error, "error")
          toast.warning(error.message)
        }
      }
    return (
        <div>
            <Table style={{ marginTop: "110px" }}>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Db Id</TableHead>
                        <TableHead>Package Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Validity</TableHead>
                        <TableHead>MRP</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>IsDefault</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {varients.map((cat, index) => (
                        <TableRow key={cat.id || index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{cat.id}</TableCell>
                            <TableCell>{cat.name}</TableCell>
                            <TableCell>{cat.slug}</TableCell>
                            <TableCell>{cat.validity}</TableCell>
                            <TableCell>{cat.mrp}</TableCell>
                            <TableCell>{cat.discount}</TableCell>
                            <TableCell>{cat.isDefault?<small style={{ color: "green" }}>True</small>:<small style={{ color: "red" }}> False</small>}</TableCell>
                            <TableCell>{cat.status ? <small style={{ color: "green" }}>Active</small> : <small style={{ color: "red" }}> Inactive</small>}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Varients</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => rtr.push(`/admin-panel/edit-packages/${cat.id}`)}>Edit</DropdownMenuItem>
                                        <DropdownMenuSeparator style={{ display: "flex", justifyContent: "center" }} />
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                {cat.status ? <Button  style={{ display: "block" }} className={"bg-amber-400"}>Deactivate</Button> : <Button  style={{ display: "block" }} className={"bg-green-500"}>Activate</Button>}
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                      {cat.status?  " This will  deactivate this service and packages on the server.":" This will activate this service"}
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    {cat.status? <AlertDialogAction onClick={() => onStatusFlip(cat.id)} className={"bg-amber-400"} >Continue</AlertDialogAction>:<AlertDialogAction onClick={() => onStatusFlip(cat.id)} className={"bg-green-500"} >Continue</AlertDialogAction>}
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button style={{ display: "block", marginTop: "3px" }} className={"bg-red-500"}>Delete</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete this
                                                        service and packages from the servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction className={"bg-red-500"} onClick={()=>onDelete(cat.id)}>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                        <DropdownMenuSeparator />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default MainModule
