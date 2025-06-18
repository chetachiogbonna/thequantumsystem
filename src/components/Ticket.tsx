"use client";

import React, { useState } from "react";
import TicketConfirmationModal from "./TicketConfirmationModal";
import { Card, CardContent } from "./ui/card";
import MainTicketCard from "./MainTicketCard";
import { formatFirestoreTimestamp, isAdmin } from "@/lib/utils";
import { Badge } from "./ui/badge";

function Ticket({
  ticketId,
  ticket,
}: {
  ticketId: string;
  ticket: Ticket;
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const getColour = (email: string) => {
    if (isAdmin(email)) {
      return "bg-orange-100 text-orange-800"
    } else {
      return "bg-red-100 text-green-800"
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <MainTicketCard
            ticketId={ticketId}
            setShowConfirmation={setShowConfirmation}
            ticketStatus={ticket.status}
          />

          <div className="space-y-4">
            {ticket.messages && ticket.messages.length > 0 ? (
              ticket.messages.map((message, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="border border-blue-200 rounded-lg p-4 bg-blue-50/30">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="md:col-span-1 text-center md:text-right md:pr-4 border-r border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            {message.userName}
                          </h5>

                          <Badge variant="secondary" className={getColour(message.userEmail)}>
                            {isAdmin(message.userEmail) ? "Admin" : "You"}
                          </Badge>
                        </div>

                        <div className="md:col-span-3">
                          <p className="text-sm text-gray-600 font-medium mb-3">
                            {formatFirestoreTimestamp(
                              message.updatedAt as unknown as Timestamp
                            )}
                          </p>
                          <p className="text-gray-800">{message.message}</p>

                          {message.files.length > 0 && (
                            <div className="mt-3 space-y-1 space-x-1">
                              {message.files.map(({ url }, idx) => (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline text-sm"
                                >
                                  View Attachment {idx + 1}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="min-h-10 flex justify-center items-center text-gray-500 text-sm">
                No messages found for this ticket.
              </div>
            )}
          </div>
        </div>
      </div>

      <TicketConfirmationModal
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        ticketId={ticketId}
      />
    </div>
  );
}

export default Ticket;