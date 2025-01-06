"use client";

import React, { forwardRef, useRef } from "react";


import { cn } from "@/lib/utils";
import { AnimatedBeam } from "../ui/animated-beam";
import Image from "next/image";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-[500px]  items-center justify-center overflow-hidden rounded-lg  bg-background ",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex size-full flex-row items-stretch justify-between gap-10 max-w-lg">
        
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Icons.nextjs />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.nodejs />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.postgresql />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.typescript />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.figma />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <Icons.sajhaSanduk />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <Icons.user />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
      />
    </div>
  );
}

const Icons = {
    nextjs: () => (
      <img
        src="https://cdn.worldvectorlogo.com/logos/next-js.svg"
        alt="Next.js Logo"
        width="32"
        height="32"
      />
    ),
    typescript: () => (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
        alt="TypeScript Logo"
        width="32"
        height="32"
      />
    ),
    nodejs: () => (
      <img
      src="https://cdn.iconscout.com/icon/free/png-256/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp"
        alt="Node.js Logo"
        width="32"
        height="32"
      />
    ),
    postgresql: () => (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
        alt="PostgreSQL Logo"
        width="32"
        height="32"
      />
    ),
    figma: () => (
      <img
      src="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/3000/figma-logo-512.png"
        alt="Figma Logo"
        width="32"
        height="32"
      />
    ),
    sajhaSanduk: () => (
      <img
        src="./sajha_sanduk_logo_noBG.png" // Replace with your logo URL
        alt="Sajha Sanduk Logo"
        width="48"
        height="48"
      />
    ),
    user: () => (
      <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
        alt="User Icon"
        width="32"
        height="32"
      />
    ),
  };
  