import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import React, { useState } from "react";
import datos from "../db/data.json";

const { images } = datos;
console.log(images, "holi");

function cn(...classes: string[]) {
  return classes.filter(Boolean).join("");
}

type Image = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export default function Gallery() {
  const { images } = datos;
  return (
    <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
      <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
        {images.map((image) => (
          <BlurImage
            key={image.id}
            image={image}
          />
        ))}
      </div>
    </div>
  );
}

function BlurImage({ image }: { image: Image }) {
  const [isLoading, setLoading] = useState(true);
  return (
    <a
      href='#'
      className='group'
    >
      <div className='aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200'>
        <Image
          alt=''
          layout='fill'
          objectFit='cover'
          src={image.image}
          className={cn(
            "group-hover:opacity-75 duration-700 ease-in-out",
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100",
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <p className='mt-1 font-small text-xs text-gray-900'>{image.category}</p>
      <p className='mt-1 font-bold text-sm text-green-600'>${image.price}</p>
      <h3 className='mt-4 text-md font-semibold text-gray-700'>
        {image.title}
      </h3>
      <p className='mt-1 font-small text-xs text-gray-900'>
        {image.description}
      </p>
    </a>
  );
}
