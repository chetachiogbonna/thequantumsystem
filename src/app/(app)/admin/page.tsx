import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllUsersWithWalletStatus } from "@/lib/actions/user";
import Link from "next/link";
import {  } from "react-icons/fa"
import { AlertOctagon } from "lucide-react"

export default async function AdminPanelHome() {
  try {
    const users = await getAllUsersWithWalletStatus();
  
    return (
      <div className="max-w-5xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>KYC Submitted</TableHead>
              <TableHead>KYC Status</TableHead>
              <TableHead>View KYC</TableHead>
              <TableHead>Connected Wallet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uid}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>
                  {user.kyc ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  {user.kyc ? user.kyc.status.toLocaleUpperCase() : "N/A"}
                </TableCell>
                <TableCell>
                  {user.kyc ? (
                    <Link
                      href={`/admin/kyc/${user.uid}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  ) : (
                    <span className="text-gray-400">Unviewable</span>
                  )}
                </TableCell>
                <TableCell>
                  {user.wallet ? (
                    <Link href={`/admin/user/${user.uid}`} className="text-green-600 hover:underline cursor-pointer">View</Link>
                  ) : (
                    <span className="text-gray-400">Not Connected</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } catch {
    return (
      <div className="max-w-5xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>KYC Submitted</TableHead>
              <TableHead>KYC Status</TableHead>
              <TableHead>View KYC</TableHead>
              <TableHead>Connected Wallet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center text-red-700 py-6">
                <div className="flex justify-center items-center gap-1">
                  <AlertOctagon color="red" size={15} /> An error occured while loading data. Please check your internet connection and refresh the page.
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
}