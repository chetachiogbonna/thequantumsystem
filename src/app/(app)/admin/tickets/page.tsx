import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatTimeAgo } from "@/lib/utils"
import { getAllTickets } from "@/lib/actions/ticket"
import { AlertOctagon } from "lucide-react"

async function AdminTicketPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "Low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  try {
    const tickets = await getAllTickets()

    return (
      <div className="md:px-4">
        <div className="w-full max-w-6xl mx-auto pt-4">
          <div className="bg-white rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium text-gray-900">Subject</TableHead>
                  <TableHead className="font-medium text-gray-900">Status</TableHead>
                  <TableHead className="font-medium text-gray-900">Priority</TableHead>
                  <TableHead className="font-medium text-gray-900">Last Reply</TableHead>
                  <TableHead className="font-medium text-gray-900">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.length > 0 
                  ? tickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Link href={`/user/ticket/view/${ticket.ticketId}`} className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">
                          [Ticket#{ticket.ticketId}] {ticket.subject}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{formatTimeAgo(ticket.updatedAt)}</TableCell>
                      <TableCell>
                        <Link href={`/user/ticket/view/${ticket.ticketId}`} className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">View</Link>
                      </TableCell>
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
      </div>
    )
  } catch {
    return (
      <div className="md:px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#3d2067] font-semibold">Subject</TableHead>
                <TableHead className="text-[#3d2067] font-semibold">Status</TableHead>
                <TableHead className="text-[#3d2067] font-semibold">Priority</TableHead>
                <TableHead className="text-[#3d2067] font-semibold">Last Reply</TableHead>
                <TableHead className="text-[#3d2067] font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center text-red-700 py-6">
                  <div className="flex justify-center items-center gap-1">
                    <AlertOctagon color="red" size={15} /> There was an error while displaying data. Please check your internet connection and refresh the page.
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}

export default AdminTicketPage