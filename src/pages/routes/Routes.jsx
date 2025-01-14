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
import { Edit, Plus, RefreshCcw, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { convertTime, slugify } from "@/utils/formatters";
import SearchComponent from "@/components/appComponents/search/SearchComponent";
import DeleteVehicle from "./DeleteRoute";
import { getAllRoutesAPI } from "@/apis/apis";

function Routes() {
  const [routes, setRoutes] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteRouteId, setDeleteRouteId] = useState(null);
  const navigation = useNavigate();
  const fetchAllRoutes = useCallback(async () => {
    const res = await getAllRoutesAPI();
    return res;
  }, []);

  const getRoutes = useCallback(async () => {
    const routes = await fetchAllRoutes();
    setRoutes(routes);
  }, [fetchAllRoutes]);

  useEffect(() => {
    getRoutes();
  }, [getRoutes]);

  const handleRefresh = () => {
    getRoutes();
  };

  const handleSearch = (searchInput) => {
    console.log("🚀 ~ handleSearch ~ searchInput:", searchInput);
  };

  return (
    <>
      <SidebarLayout>
        <h1 className='font-bold text-2xl text-center'>Routes</h1>
        <div className='flex gap-4'>
          <Button onClick={handleRefresh}>
            <RefreshCcw width={20} height={20} />
            Refresh
          </Button>
          <Button onClick={() => navigation("add")}>
            <Plus width={20} height={20} />
            Add route
          </Button>
        </div>
        <SearchComponent handleSearch={handleSearch} />
        <div className='w-full'>
          <Table>
            <TableCaption>List of routes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>No.</TableHead>
                <TableHead>Start point</TableHead>
                <TableHead>End point</TableHead>
                <TableHead>Distance (km)</TableHead>
                <TableHead>Estimate time (h)</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Updated at</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes?.map((route, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className='font-medium'>{index + 1}</TableCell>
                    <TableCell>{route?.startPoint}</TableCell>
                    <TableCell>{route?.endPoint}</TableCell>
                    <TableCell>{route?.distance}</TableCell>
                    <TableCell>{route?.estimateTime}</TableCell>
                    <TableCell>{convertTime(route?.createdAt)}</TableCell>
                    <TableCell>
                      {route?.updatedAt && convertTime(route?.updatedAt)}
                    </TableCell>
                    <TableCell className='flex gap-3'>
                      <Button
                        onClick={() =>
                          navigation(
                            slugify(route?.startPoint + " - " + route.endPoint),
                            {
                              state: { route },
                            }
                          )
                        }
                      >
                        <Edit width={20} height={20} />
                      </Button>
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setDeleteRouteId(route._id);
                        }}
                      >
                        <Trash width={20} height={20} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </SidebarLayout>
      {open && (
        <DeleteVehicle
          open={open}
          setOpen={setOpen}
          deleteRouteId={deleteRouteId}
        />
      )}
    </>
  );
}

export default Routes;
