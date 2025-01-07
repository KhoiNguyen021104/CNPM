/* eslint-disable react/prop-types */
import { ScrollArea } from "@/components/ui/scroll-area";

function AutoScrollArea({ children, title, quantityItem }) {
  return (
    <ScrollArea
      className={
        quantityItem.length > 6
          ? "h-72 w-[fit-content] rounded-md border"
          : "h-[fit-content] max-h-72 w-[fit-content] rounded-md border"
      }
    >
      <div className='p-4 flex flex-col gap-2'>
        <h4 className='mb-2 text-sm font-medium leading-none'>{title}</h4>
        {children}
      </div>
    </ScrollArea>
  );
}

export default AutoScrollArea;
