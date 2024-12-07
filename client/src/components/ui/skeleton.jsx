import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-t-transparent border-primary", // Small spinner style
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
