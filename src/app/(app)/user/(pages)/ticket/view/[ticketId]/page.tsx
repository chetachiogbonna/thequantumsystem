import Ticket from "@/components/Ticket"
import { getCurrentUser } from "@/lib/actions/auth"
import { getTicketByTicketId } from "@/lib/actions/ticket"
import { parseStringify } from "@/lib/utils"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{
    ticketId: string
  }>
}

export default async function ViewTicketPage({ params }: Props) {
  try {
    const { ticketId } = (await params);
    const currentUser = await getCurrentUser();

    if (!currentUser) redirect("/sign-in");

    const ticket = await getTicketByTicketId(ticketId);

    if (!ticket) {
      return (
        <div className="text-center py-10">
          <p className="text-lg text-red-500">Ticket not found.</p>
        </div>
      );
    }

    return <Ticket ticketId={ticketId} ticket={parseStringify(ticket)} />;
  } catch (err) {
    console.error("Error loading ticket page:", err);
    return (
      <div className="text-center py-10">
        <p className="text-lg text-red-500">
          An error occurred. Please check your internet connection and refresh the page.
        </p>
      </div>
    );
  }
}