"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/userHook";

type VendorTransaction = {
  id: number;
  transcation_id: string | null;
  product: {
    id: number;
    name: string;
    amount: number;
    photos: string[];
  };
  rental_days: number;
  total_price: number;
  created_at: string;
};

export default function VendorTransactions() {
  const { user, loading } = useUser();
  const [transactions, setTransactions] = useState<VendorTransaction[]>([]);
  const [componentLoading, setComponentLoading] = useState(true);

  useEffect(() => {
    const fetchVendorTransactions = async () => {
      if (!user?.id) return; // Ensure user is authenticated

      try {
        const res = await fetch(`/api/vendor/transcatedProducts?user_id=${user.id}`);
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching vendor transactions:", error);
      } finally {
        setComponentLoading(false);
      }
    };

    if (user && !loading) {
      fetchVendorTransactions();
    }
  }, [user, loading]); // Added loading to ensure user is fully loaded before fetching

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent>
          <p className="text-muted-foreground">Please log in to view your transactions.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Sales & Rentals</CardTitle>
      </CardHeader>
      <CardContent>
        {componentLoading ? (
          <Skeleton className="h-20 w-full" />
        ) : transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
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
                  <TableCell>
                    <Badge variant={txn.rental_days > 0 ? "outline" : "default"}>
                      {txn.rental_days > 0 ? "Rented" : "Sold"}
                    </Badge>
                  </TableCell>
                  <TableCell>{txn.rental_days}</TableCell>
                  <TableCell>${txn.total_price}</TableCell>
                  <TableCell>{new Date(txn.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground">No sales or rentals found.</p>
        )}
      </CardContent>
    </Card>
  );
}
