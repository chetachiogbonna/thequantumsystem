"use client";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

function StyledInput({ value, onChange, ...rest }: any) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      {...rest}
      className={cn(
        "px-4 py-3 focus-visible:ring-0 text-base ring-0 outline-none border-none placeholder-gray-500 w-full peer"
      )}
      autoComplete="off"
    />
  );
}

export function PhoneNumberInput({ value, onChange }: {
  value: string;
  onChange: (val: string | undefined) => void;
}) {
  return (
    <div className="space-y-2 bg-[#f6f8fa] rounded-md">
      <PhoneInput
        id="phone-input"
        name="phone"
        international
        defaultCountry="NG"
        value={value}
        onChange={onChange}
        flags={flags}
        inputComponent={StyledInput}
        className="pl-4"
      />
    </div>
  );
}
