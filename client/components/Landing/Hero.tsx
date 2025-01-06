"use client"
import React from 'react'
import IconCloud from '../ui/icon-cloud'
import { AnimatedBeamMultipleOutputDemo } from './CodeToSanduk';



const slugs = [
    "typescript",
    "javascript",
    "react",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "postgresql",
    "nginx",
    "vercel",
    "docker",
    "git",
    "github",
    "visualstudiocode",
    "figma",
  ];

const Hero = () => {
  return (
    <div className='flex flex-col '>
        <div className="heroContainer">
            <h1>This is the landing page for Sajha Sanduk</h1>
        </div>
    <h1 className='text-center font-bold text-xl '>Technologies Used</h1>
    <AnimatedBeamMultipleOutputDemo ></AnimatedBeamMultipleOutputDemo>
    </div>
  )
}

export default Hero