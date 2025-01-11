import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  
  export function RecentSales() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            Your recent product sales and rentals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Olivia Martin</p>
                <p className="text-sm text-muted-foreground">
                  Purchased Arduino Set
                </p>
              </div>
              <div className="ml-auto font-medium">+Rs. 1,999</div>
            </div>
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                <p className="text-sm text-muted-foreground">
                  Rented Soldering Kit
                </p>
              </div>
              <div className="ml-auto font-medium">+Rs. 39</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  