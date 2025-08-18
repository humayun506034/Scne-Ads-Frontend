/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface Option {
  value: string;
  label: string;
}
interface CommonSelectProps {
  setValue: (value: string) => void;
  options: Option[];
  Icon: any;
  Value: string;
  bgColor?: string;
}

const CommonSelect = ({
  Value,
  bgColor = "",
  Icon,
  setValue,
  options,
}: CommonSelectProps) => {
  return (
    <Select onValueChange={(value) => setValue(value)}>
      <SelectTrigger
        className={`w-full md:w-fit cursor-pointer  text-white border-none rounded-xl px-4 flex- justify-center focus:ring-0 focus:border-none focus:outline-none items-center gap-2 py-3 ${
          bgColor ? bgColor : "bg-[#89AAD5]"
        }`}
      >
        {Icon && <Icon className="w-4 h-4 text-white" />}
        <SelectValue placeholder={Value} />
      </SelectTrigger>
      <SelectContent className="  bg-[#0B1739]  text-white border-none">
        {options.map((option) => (
          <SelectItem
            key={option.label}
            value={option.value}
            className="cursor-pointer   hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] hover:text-white"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default CommonSelect;
