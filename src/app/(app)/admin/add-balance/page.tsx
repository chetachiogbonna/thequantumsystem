import UpdateCoinBalance from '@/components/admin/UpdateCoinBalance'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAllUsers } from '@/lib/actions/user'
import React from 'react'

async function AddBalance() {
  const users = await getAllUsers()

  return (
    <div className="w-full max-w-6xl mx-auto pt-4">
      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-900">Username</TableHead>
              <TableHead className="font-medium text-gray-900">Email</TableHead>
              <TableHead className="font-medium text-gray-900">Coin Balance</TableHead>
              <TableHead className="font-medium text-gray-900">New Coin Balance</TableHead>
              <TableHead className="font-medium text-gray-900">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 
              ? users.map((user) => (
                <TableRow key={user.uid} className="hover:bg-gray-50">
                  <TableCell>
                    {user.userName}
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell className="pl-10">
                    {user.coinBalance}
                  </TableCell>

                  <UpdateCoinBalance uid={user.uid} />
                </TableRow>
              )): (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-[#a0a0b2] py-6">
                    No data found.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AddBalance