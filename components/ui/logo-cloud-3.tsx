import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src?: string;
  alt: string;
  component?: React.ReactNode;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={42} reverse duration={80} durationOnHover={25}>
        {logos.map((logo) => (
          <div key={`logo-${logo.alt}`} className="h-6 md:h-8 select-none transition-all hover:scale-105 flex items-center justify-center">
            {logo.component ? (
              <div className="flex items-center justify-center">
                {logo.component}
              </div>
            ) : (
              <img
                alt={logo.alt}
                className="h-full w-auto object-contain"
                height={logo.height || "auto"}
                loading="lazy"
                src={logo.src}
                width={logo.width || "auto"}
              />
            )}
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
