import SidebarLayout from "@/layouts/SidebarLayout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { formatDateTime } from "@/utils/formatters";
import { getAllBookingsAPI } from "@/apis/apis";
import { isEmpty } from "lodash";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

function Static() {
  const [bookings, setBookings] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [filters, setFilters] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [filteredRevenues, setFilteredRevenues] = useState([]);
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

  const handleRefresh = () => {
    getBookings();
  };

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
      setRevenues(newRevenue);
      setFilteredRevenues(newRevenue);
    }
  }, [bookings]);

  // const handleSearch = (searchInput) => {
  //   console.log("🚀 ~ handleSearch ~ searchInput:", searchInput);
  // };

  const filterRevenue = (value, type) => {
    console.log("🚀 ~ filterRevenue ~ value:", value);
    if (type === "day") {
      if (!value) {
        setFilteredRevenues(revenues);
        return;
      } else {
        setFilters((prev) => ({ ...prev, day: value }));
      }
    }
    if (type === "month") {
      if (!value) {
        setFilteredRevenues(revenues);
        return;
      } else {
        setFilters((prev) => ({ ...prev, month: value }));
      }
    }

    if (type === "year") {
      if (!value) {
        setFilteredRevenues(revenues);
        return;
      } else {
        setFilters((prev) => ({ ...prev, year: value }));
      }
    }
  };

  useEffect(() => {
    if (filters.day === "" && filters.month === "" && filters.year === "") {
      setFilteredRevenues(revenues);
    } else {
      setFilteredRevenues(() => {
        const newRev = { ...revenues };
        if (filters.day !== "") {
          const revDay = revenues.revenueByDay.filter(
            (item) => item.date.split("/")[0] == filters.day
          );
          newRev.revenueByDay = revDay;
        }
        if (filters.month !== "") {
          const revDay = revenues.revenueByDay.filter(
            (item) => item.date.split("/")[1] == filters.month
          );
          const revMonth = revenues.revenueByMonth.filter(
            (item) => item.month.split("/")[0] == filters.month
          );
          // const revYear = revenues.revenueByYear.filter(
          //   (item) => item.year == filters.month
          // );
          newRev.revenueByDay = revDay;
          newRev.revenueByMonth = revMonth;
        }
        if (filters.year !== "") {
          const revYear = revenues.revenueByYear.filter(
            (item) => item.year == filters.year
          );
          const revDay = revenues.revenueByDay.filter(
            (item) => item.date.split("/")[2] == filters.year
          );
          const revMonth = revenues.revenueByMonth.filter(
            (item) => item.month.split("/")[1] == filters.year
          );
          newRev.revenueByDay = revDay;
          newRev.revenueByMonth = revMonth;
          newRev.revenueByYear = revYear;
        }
        console.log("🚀 ~ setFilteredRevenues ~ newRev:", newRev);
        return newRev;
      });
    }
  }, [filters, revenues]);

  // const handleFilters = (value) => {
  //   console.log("🚀 ~ handleFilters ~ value:", value);
  //   if (!value) {
  //     setFilteredRevenues(value);
  //     return;
  //   }
  //   setFilteredRevenues(() => {
  //     const day = value?.split("/")[0];
  //     const month = value?.split("/")[1];
  //     const year = value?.split("/")[2];
  //     const revDay = revenues.revenueByDay.filter(
  //       (item) => item.date.split("/")[1] == day
  //     );
  //     const revMonth = revenues.revenueByDay.filter(
  //       (item) => item == month
  //     );
  //   });
  // };
  return (
    <>
      <SidebarLayout>
        <h1 className='font-bold text-2xl text-center'>Static</h1>
        <div className='flex gap-4'>
          <Button onClick={handleRefresh}>
            <RefreshCcw width={20} height={20} />
            Refresh
          </Button>
        </div>
        <div className='mt-3 flex gap-6'>
          <Select onValueChange={(value) => filterRevenue(value, "day")}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue value='' placeholder='Select a day' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 31 }, (_, index) => index + 1).map(
                (value) => (
                  <SelectItem key={value} value={value}>
                    Day {value}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => filterRevenue(value, "month")}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue value='' placeholder='Select a month' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, index) => index + 1).map(
                (value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => filterRevenue(value, "year")}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue value='' placeholder='Select a year' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, index) => index + 2024).map(
                (value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
        {/* <Input
          type='date'
          min='2021-01-01'
          onChange={(event) => handleFilters(event.target.value)}
        /> */}
        <div className='w-full'>
          <div className='mt-8'>
            <Table>
              <TableCaption className='font-bold text-lg !mt-1'>
                Revenue by day
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>No.</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Price (/booking)</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRevenues?.revenueByDay?.map((revenue, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className='font-medium'>{index + 1}</TableCell>
                      <TableCell>{revenue?.date}</TableCell>
                      <TableCell>{revenue?.bookings}</TableCell>
                      <TableCell>100000</TableCell>
                      <TableCell>{revenue?.revenue}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className='mt-8'>
            <Table>
              <TableCaption className='font-bold text-lg !mt-1'>
                Revenue by month
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>No.</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Price (/booking)</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRevenues?.revenueByMonth?.map((revenue, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className='font-medium'>{index + 1}</TableCell>
                      <TableCell>{revenue?.month}</TableCell>
                      <TableCell>{revenue?.bookings}</TableCell>
                      <TableCell>100000</TableCell>
                      <TableCell>{revenue?.revenue}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className='mt-8'>
            <Table>
              <TableCaption className='font-bold text-lg !mt-1'>
                Revenue by year
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>No.</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Price (/booking)</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRevenues?.revenueByYear?.map((revenue, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className='font-medium'>{index + 1}</TableCell>
                      <TableCell>{revenue?.year}</TableCell>
                      <TableCell>{revenue?.bookings}</TableCell>
                      <TableCell>100000</TableCell>
                      <TableCell>{revenue?.revenue}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
}

export default Static;
