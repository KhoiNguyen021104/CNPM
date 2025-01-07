/* eslint-disable react/prop-types */
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


function MultipleSelect({ options, title, field }) {
  const handleCheck = (value) => {
    console.log("🚀 ~ handleCheck ~ value:", value);
    field.onChange(value);
  };
  return (
    <ScrollArea
      className={
        options.length > 6
          ? "h-72 w-48 rounded-md border"
          : "h-[fit-content] max-h-72 w-48 rounded-md border"
      }
    >
      <div className='p-4'>
        {options ? (
          options?.map((option, indexOption) => (
            <div className={indexOption !== 0 && "mt-4"} key={indexOption}>
              <h4 className='mb-4 text-sm font-medium leading-none'>
                {title[indexOption]}
              </h4>
              {option?.map((item, indexItem) => (
                <div key={indexItem} className='flex, items-center'>
                  <Checkbox
                    {...field}
                    id={item?.label}
                    className='mr-2'
                    value={option?.value}
                    onCheckedChange={() => handleCheck(option?.value)}
                  />
                  <RadioGroup defaultValue='option-one'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='option-one' id='option-one' />
                      <Label htmlFor='option-one'>Option One</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='option-two' id='option-two' />
                      <Label htmlFor='option-two'>Option Two</Label>
                    </div>
                  </RadioGroup>

                  <label
                    htmlFor={item?.label}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {item?.label}
                  </label>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center h-full'>
            <img
              className='w-full h-[50px]'
              src='\src\assets\svg\empty.svg'
              alt=''
            />
            <div className='text-slate-400'>No data</div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

export default MultipleSelect;
