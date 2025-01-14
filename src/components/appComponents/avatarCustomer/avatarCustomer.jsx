/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AvatarCustomer({ customer }) {
  return (
    <div className='flex justify-between items-center'>
      <div className='!mt-1 flex gap-3 items-center'>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3 className='font-semibold'>{customer?.customerName}</h3>
          <h4 className='text-gray-400'>{customer?.customerPhone}</h4>
        </div>
      </div>
      {/* <div className='font-medium '>+1 trip</div> */}
    </div>
  );
}

export default AvatarCustomer;
