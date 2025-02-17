"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/userHook";

type Transaction = {
  id: number;
  transcation_id: string | null;
  product: {
    id: number;
    name: string;
    amount: number;
    photos: string[];
    is_rentable: boolean;
    max_allowable_days: number;
  };
  rental_days: number;
  total_price: number;
  created_at: string;
};

export default function TransactionsPage() {
  const {user} = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`/api/users/myproducts?user_id=${user.id}`);
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>My Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-20 w-full" />
          ) : transactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Rental Days</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Transaction Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="flex items-center gap-4">
                      <img
                        src={txn.product.photos[0]}
                        alt={txn.product.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <span>{txn.product.name}</span>
                    </TableCell>
                    <TableCell>{txn.rental_days}</TableCell>
                    <TableCell>Rs.{txn.total_price}</TableCell>
                    <TableCell>{new Date(txn.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No transactions found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
