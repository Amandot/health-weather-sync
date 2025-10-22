import { useState } from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
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
import { cn } from "@/lib/utils";

export interface IndianCity {
  name: string;
  state: string;
  code: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

const INDIAN_CITIES: IndianCity[] = [
  { name: "Mumbai", state: "Maharashtra", code: "MUM", coordinates: { lat: 19.0760, lon: 72.8777 } },
  { name: "Delhi", state: "Delhi", code: "DEL", coordinates: { lat: 28.7041, lon: 77.1025 } },
  { name: "Bengaluru", state: "Karnataka", code: "BLR", coordinates: { lat: 12.9716, lon: 77.5946 } },
  { name: "Chennai", state: "Tamil Nadu", code: "CHE", coordinates: { lat: 13.0827, lon: 80.2707 } },
  { name: "Kolkata", state: "West Bengal", code: "KOL", coordinates: { lat: 22.5726, lon: 88.3639 } },
  { name: "Hyderabad", state: "Telangana", code: "HYD", coordinates: { lat: 17.3850, lon: 78.4867 } },
  { name: "Pune", state: "Maharashtra", code: "PUN", coordinates: { lat: 18.5204, lon: 73.8567 } },
  { name: "Ahmedabad", state: "Gujarat", code: "AMD", coordinates: { lat: 23.0225, lon: 72.5714 } },
];

interface CitySelectorProps {
  selectedCity: IndianCity;
  onCityChange: (city: IndianCity) => void;
}

export const CitySelector = ({ selectedCity, onCityChange }: CitySelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{selectedCity.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-background z-50">
        <Command>
          <CommandInput placeholder="Search cities..." />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {INDIAN_CITIES.map((city) => (
                <CommandItem
                  key={city.code}
                  value={city.name}
                  onSelect={() => {
                    onCityChange(city);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCity.code === city.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{city.name}</span>
                    <span className="text-xs text-muted-foreground">{city.state}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};