"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "a",
    label: "a",
  },
  {
    value: "b",
    label: "b",
  },
  {
    value: "c",
    label: "c",
  },
  {
    value: "d",
    label: "d",
  },
  {
    value: "e",
    label: "e",
  },
  {
    value: "f",
    label: "f",
  },
];

export function MultipleSelector() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);

  const handleSetValue = (val: string) => {
    if (value.includes(val)) {
      value.splice(value.indexOf(val), 1);
      setValue(value.filter((item) => item !== val));
    } else {
      setValue((prevValue) => [...prevValue, val]);
    }
  };

  const handleClear = () => {
    setValue([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[480px] justify-between h-full"
        >
          <div className="flex gap-2 justify-start flex-wrap">
            {value?.length
              ? value.map((val, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium flex"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleSetValue(val);
                    }}
                  >
                    {
                      frameworks.find((framework) => framework.value === val)
                        ?.label
                    }
                    <X className="ml-2" />
                  </div>
                ))
              : "Select framework..."}
          </div>
          <div className="flex items-center">
            {value?.length !== 0 && (
              <>
                <div
                  onClick={(event) => {
                    console.log("dd");
                    event.stopPropagation();
                    handleClear();
                  }}
                >
                  <X className="h-4 mx-2 cursor-pointer text-muted-foreground z-40" />
                </div>
                <Separator
                  orientation="vertical"
                  className="flex min-h-6 h-full"
                />
              </>
            )}

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => {
                    handleSetValue(framework.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(framework.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
