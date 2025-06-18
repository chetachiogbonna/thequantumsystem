import UpdateCoinBalance from '@/components/admin/UpdateCoinBalance'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAllUsers } from '@/lib/actions/user'
import { AlertOctagon } from 'lucide-react'
import React from 'react'

async function AddBalance() {
  try {
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
                <TableHead className="font-medium text-gray-900">Coin Type</TableHead>
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
                    <TableCell>
                      <select className="w-[100px] border rounded px-3 py-2 focus:outline-none focus:border-[#42a5f5]">
                        <option>Old balance</option>
                        {Object.entries(user.coins).map(([symbol, value]) => {
                          return <option key={symbol}>{`${symbol}: ${value}`}</option>
                        })}
                      </select>
                    </TableCell>
  
                    <UpdateCoinBalance user={user} />
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
  } catch {
    return (
      <div className="w-full flex justify-center items-center mt-2">
        <AlertOctagon color="red" size={15} /> <p className="text-red-700">An error occurred. Please check your internet connection and refresh the page.</p>
      </div>
    )
  }
}

export default AddBalance