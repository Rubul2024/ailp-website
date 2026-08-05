"use client";

import { useEffect, useState } from "react";

export default function Counter({ value }) {
  const number = parseInt(value.replace(/\D/g, "")) || 0;

  const suffix = value.replace(/[0-9]/g, "");

  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const duration = 1200;

    const step = Math.ceil(number / 60);

    const timer = setInterval(() => {
      start += step;

      if (start >= number) {
        start = number;

        clearInterval(timer);
      }

      setCount(start);
    }, duration / 60);

    return () => clearInterval(timer);
  }, [number]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}