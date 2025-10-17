"use client";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-10 mt-16">
      <svg
        width="170"
        height="170"
        viewBox="0 0 170 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-8"
      >
        <ellipse
          cx="85"
          cy="145"
          rx="48"
          ry="12"
          fill="#38bdf8"
          fillOpacity=".10"
        />
        <circle cx="85" cy="85" r="60" fill="url(#paint0_radial)" />
        <path
          d="M57 67c5-10 17.5-14 28-9s15 14 8 25c-4 7-12 18-20 28.5a2.5 2.5 0 0 0 3.8 3c8-10 15-19.5 20-28.5 9-14 2-29-11.5-34-13-5-28 0-33 13z"
          fill="#06b6d4"
          fillOpacity=".9"
        />
        <path
          d="M84.5 103a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm-16-18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm36 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
          fill="#fff"
        />
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(0 60 -60 0 85 85)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor="#1e40af" />
          </radialGradient>
        </defs>
      </svg>
      <h1 className="text-4xl font-bold mb-3 drop-shadow">Page Not Found</h1>
      <p className="text-4xl font-bold text-blue-600 mb-8 text-center max-w-md">
        404
      </p>
      <Button onClick={() => window.history.back()}>
        Go Back <Undo2 />
      </Button>
    </div>
  );
};

export default NotFoundPage;
