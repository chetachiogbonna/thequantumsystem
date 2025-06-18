"use client";

import React, { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Plus, Reply, X } from 'lucide-react'
import { getTicketIdByUidAndId, replyToTicket, uploadTicketFiles } from '@/lib/actions/ticket';
import { useUserStore } from '@/lib/store/userStore';
import { toast } from 'sonner';
import { isAdmin } from '@/lib/utils';

type MainTicketCardProps = {
  ticketId: string,
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
  ticketStatus: "Open" | "Closed",
}

function MainTicketCard({ ticketId, setShowConfirmation, ticketStatus }: MainTicketCardProps) {
  const user = useUserStore((state) => state.user);
  
  const [message, setMessage] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])

  const [isPending, startTransition] = useTransition();

  const handleAddFile = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.accept = ".jpg,.jpeg,.png,.pdf,.doc,.docx"
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      if (attachments.length + files.length <= 5) {
        setAttachments([...attachments, ...files])
      } else {
        alert("Maximum 5 files can be uploaded")
      }
    }
    input.click()
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return toast.error("No user found. Please log in.")
    
    try {
      startTransition(async () => {
        let uploadedFiles: { url: string, fileId: string }[] = []
        if (attachments.length > 0) {
          uploadedFiles = await uploadTicketFiles(attachments)
        }

        const ticketIdToReply = await getTicketIdByUidAndId(user.uid, ticketId)
        const sender = isAdmin(user.email) ? "admin" : "user";
        await replyToTicket({ id: ticketIdToReply, ticketId, message, sender, files: uploadedFiles, userEmail: user.email, userName: user.userName })

        setAttachments([]);
        setMessage("")

        toast.success("Ticket replied successfully.")
      })
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occured. Please try again."
      )
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={
              ticketStatus === "Open"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            }
          >
            {ticketStatus === "Open" ? "Open" : "Closed"}
          </Badge>
          <h5 className="text-lg font-semibold">{`[Ticket#${ticketId}] Phone`}</h5>
        </div>
        {ticketStatus === "Open" && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowConfirmation(true)}
            className="flex items-center gap-1"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {ticketStatus === "Open" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Textarea
                name="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full min-h-36"
                placeholder="Type your reply here..."
              />
            </div>

            <div className="text-right">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddFile}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add New
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Attachments</Label>
              <p className="text-sm text-red-600">Max 5 files can be uploaded. Maximum upload size is 2M</p>

              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-600">
                Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx
              </p>
            </div>

            <Button disabled={isPending} style={{ cursor: isPending ? "not-allowed" : "pointer" }} type="submit" className="w-full flex items-center gap-2">
              <Reply className="h-4 w-4" />
             {isPending ? "Replying..." : "Reply"}
            </Button>
          </form>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg font-medium">This ticket has been closed</p>
            <p className="text-sm">No further replies can be added to this ticket.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MainTicketCard