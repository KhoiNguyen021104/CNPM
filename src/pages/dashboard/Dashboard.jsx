import {
  getAllBookingsAPI,
  getAllDriversAPI,
  getAllRoutesAPI,
  getAllVehiclesAPI,
} from "@/apis/apis";
import SidebarLayout from "@/layouts/SidebarLayout";
import { formatDateTime } from "@/utils/formatters";
import { isEmpty } from "lodash";
import { Car, PersonStanding, TrendingUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import AvatarCustomer from "@/components/appComponents/avatarCustomer/avatarCustomer";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [revenues, setRevenues] = useState({
    bookings: 0,
    date: "",
    revenue: 0,
  });
  const [revenuesToday, setRevenuesToday] = useState([]);
  const [data, setData] = useState({
    routes: [],
    drivers: [],
    vehicles: [],
  });

  const fetchAllData = useCallback(async () => {
    try {
      const [routes, drivers, vehicles] = await Promise.all([
        getAllRoutesAPI(),
        getAllDriversAPI(),
        getAllVehiclesAPI(),
      ]);
      setData({
        routes,
        drivers: drivers?.filter((driver) => driver.status === 0),
        vehicles: vehicles?.filter((vehicle) => vehicle.status === 0),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);
  const fetchAllBookings = useCallback(async () => {
    const res = await getAllBookingsAPI();
    return res;
  }, []);
  const getBookings = useCallback(async () => {
    const res = await fetchAllBookings();
    setBookings(res);
  }, [fetchAllBookings]);
  useEffect(() => {
    getBookings();
  }, [getBookings]);

  // const handleRefresh = () => {
  //   getBookings();
  // };

  useEffect(() => {
    if (!isEmpty(bookings)) {
      const totalRevenue = bookings.reduce((acc, cur) => {
        if (cur.status === "complete") {
          return acc + cur.price;
        }
        return acc;
      }, 0);

      const newRevenue = {
        totalRevenue: totalRevenue,
        revenueByDay: [],
        revenueByMonth: [],
        revenueByYear: [],
      };

      const bookingCompleted = bookings.filter(
        (booking) => booking.status === "complete"
      );

      if (!isEmpty(bookingCompleted)) {
        bookingCompleted.forEach((booking) => {
          const date = formatDateTime(booking.bookingDate);
          const dateSplitArray = date.split("/");
          const month = dateSplitArray[1] + "/" + dateSplitArray[2];
          const year = dateSplitArray[2];

          const existingDay = newRevenue.revenueByDay.find(
            (item) => item.date === date
          );
          if (existingDay) {
            existingDay.revenue += booking.price;
            existingDay.bookings++;
          } else {
            newRevenue.revenueByDay.push({
              date,
              revenue: booking.price,
              bookings: 1,
            });
          }

          const existingMonth = newRevenue.revenueByMonth.find(
            (item) => item.month === month
          );
          if (existingMonth) {
            existingMonth.revenue += booking.price;
            existingMonth.bookings++;
          } else {
            newRevenue.revenueByMonth.push({
              month,
              revenue: booking.price,
              bookings: 1,
            });
          }

          const existingYear = newRevenue.revenueByYear.find(
            (item) => item.year === year
          );
          if (existingYear) {
            existingYear.revenue += booking.price;
            existingYear.bookings++;
          } else {
            newRevenue.revenueByYear.push({
              year,
              revenue: booking.price,
              bookings: 1,
            });
          }
        });
      }

      console.log("🚀 ~ useEffect ~ newRevenue:", newRevenue);
      const dateObj = new Date();
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      const today = `${day}/${month}/${year}`;

      setRevenuesToday(() => {
        const rev = newRevenue.revenueByDay.filter(
          (revenue) => revenue.date === today
        )[0];
        if (!isEmpty(rev)) return rev;
        return {
          date: today,
          revenue: 0,
          bookings: 0,
        };
      });

      setRevenues(newRevenue);
    }
  }, [bookings]);

  // const handleSearch = (searchInput) => {
  //   console.log("🚀 ~ handleSearch ~ searchInput:", searchInput);
  // };
  // const chartData = [
  //   { month: "January", desktop: 186, mobile: 80 },
  //   { month: "February", desktop: 305, mobile: 200 },
  //   { month: "March", desktop: 237, mobile: 120 },
  //   { month: "April", desktop: 73, mobile: 190 },
  //   { month: "May", desktop: 209, mobile: 130 },
  //   { month: "June", desktop: 214, mobile: 140 },
  // ];

  // const chartConfig = {
  //   desktop: {
  //     label: "Desktop",
  //     color: "hsl(var(--chart-1))",
  //   },
  //   mobile: {
  //     label: "Mobile",
  //     color: "hsl(var(--chart-2))",
  //   },
  // };

  const chartData = [
    { month: "January", revenue: 186 },
    { month: "February", revenue: 305 },
    { month: "March", revenue: 237 },
    { month: "April", revenue: 73 },
    { month: "May", revenue: 209 },
    { month: "June", revenue: 214 },
    { month: "July", revenue: 124 },
    { month: "August", revenue: 45 },
    { month: "September", revenue: 222 },
    { month: "October", revenue: 501 },
    { month: "November", revenue: 342 },
    { month: "December", revenue: 156 },
  ];
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <SidebarLayout>
      <div className='mt-2'>
        <h className='text-lg font-bold'>OVERVIEW</h>
        <div className='mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <div className='rounded-xl border bg-card text-card-foreground shadow'>
            <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
              <div className='tracking-tight text-sm font-medium'>
                Total Revenue
              </div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-4 w-4 text-muted-foreground'
              >
                <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
              </svg>
            </div>
            <div className='p-6 pt-0'>
              <div className='text-2xl font-bold'>
                {revenues.totalRevenue / 25000}
              </div>
              <p className='text-xs text-muted-foreground'>
                +20.1% from last month
              </p>
            </div>
          </div>
          <div className='rounded-xl border bg-card text-card-foreground shadow'>
            <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
              <div className='tracking-tight text-sm font-medium'>
                Revenue today
              </div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-4 w-4 text-muted-foreground'
              >
                <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
              </svg>
            </div>
            <div className='p-6 pt-0'>
              <div className='text-2xl font-bold'>
                {revenuesToday?.revenue / 25000}
              </div>
              <p className='text-xs text-muted-foreground'>
                +20.1% from last month
              </p>
            </div>
          </div>
          <div className='rounded-xl border bg-card text-card-foreground shadow'>
            <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
              <div className='tracking-tight text-sm font-medium'>
                Customers
              </div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-4 w-4 text-muted-foreground'
              >
                <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'></path>
                <circle cx='9' cy='7' r='4'></circle>
                <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'></path>
              </svg>
            </div>
            <div className='p-6 pt-0'>
              <div className='text-2xl font-bold'>
                {revenues?.revenueByDay?.length}
              </div>
              <p className='text-xs text-muted-foreground'>
                +180.1% from last month
              </p>
            </div>
          </div>
          <div className='rounded-xl border bg-card text-card-foreground shadow'>
            <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
              <div className='tracking-tight text-sm font-medium'>Drivers</div>
              <PersonStanding />
            </div>
            <div className='p-6 pt-0'>
              <div className='text-2xl font-bold'>{data.drivers.length}</div>
              <p className='text-xs text-muted-foreground'>
                +19% from last month
              </p>
            </div>
          </div>
          <div className='rounded-xl border bg-card text-card-foreground shadow'>
            <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
              <div className='tracking-tight text-sm font-medium'>Vehicles</div>
              <Car />
            </div>
            <div className='p-6 pt-0'>
              <div className='text-2xl font-bold'>{data.vehicles.length}</div>
              <p className='text-xs text-muted-foreground'>
                +201 since last hour
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-6 flex gap-8'>
        <Card className='w-1/2'>
          <CardHeader>
            <CardTitle className='text-2xl'>Revenue</CardTitle>
            <CardDescription>2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFor
                  matter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFor
                  matter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator='dashed' />}
                />
                <Bar dataKey='revenue' fill='var(--color-desktop)' radius={4} />
                {/* <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} /> */}
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className='flex-col items-start gap-2 text-sm'>
            <div className='flex gap-2 font-medium leading-none'>
              Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
            </div>
            <div className='leading-none text-muted-foreground'>
              Showing revenue for this year
            </div>
          </CardFooter>
        </Card>

        <Card className='w-1/2'>
          <CardHeader className='!pb-1'>
            <CardTitle className='text-2xl'>Recent customer</CardTitle>
            <CardDescription>2025</CardDescription>
          </CardHeader>
          <CardContent>
            {bookings?.map((booking, index) => (
              <AvatarCustomer key={index} customer={booking} />
            ))}
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}

export default Dashboard;
