import { cn } from "@/lib/utils"

function AspectRatio({
  ratio,
  className,
  ...props
}: React.ComponentProps<"div"> & { ratio: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={
        {
          "--ratio": ratio,
        } as React.CSSProperties
      }
      className={cn("relative aspect-(--ratio)", className)}
      {...props}
    />
  )
}
import Image from "next/image"

interface ImageProp{
  src:string,
  ratio:number,
  alt:string

}


 function AspectRatioPortrait({src,ratio,alt}:ImageProp) {
  return (
    <AspectRatio
      ratio={ratio}
      className="w-full max-w-40 rounded-lg bg-muted"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-lg object-cover grayscale dark:brightness-20"
      />
    </AspectRatio>
  )
}

export { AspectRatio ,AspectRatioPortrait}
