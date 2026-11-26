import React from "react";
import "./SiteSkeleton.css";

const GLYPHS = "░▒▓█▒░";

function SkeletonLine({ className = "" }) {
  return (
    <div className={`ascii-skeleton-line ${className}`} aria-hidden="true">
      {GLYPHS.repeat(12)}
    </div>
  );
}

export default function SiteSkeleton() {
  return (
    <div role="status" aria-label="Loading portfolio" aria-busy="true">
      <span className="sr-only">Loading portfolio...</span>

      <section className="min-h-screen bg-black flex flex-col justify-center items-center px-6">
        <div className="w-full max-w-3xl space-y-4">
          <SkeletonLine className="ascii-skeleton-dark mx-auto w-4/5 text-3xl sm:text-5xl" />
          <SkeletonLine className="ascii-skeleton-dark mx-auto w-3/5 text-3xl sm:text-5xl" />
          <div className="pt-10 space-y-3 max-w-sm mx-auto">
            <SkeletonLine className="ascii-skeleton-dark mx-auto w-full text-sm" />
            <SkeletonLine className="ascii-skeleton-dark mx-auto w-4/5 text-sm" />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 md:px-12 py-24">
        <div className="max-w-5xl mx-auto space-y-10">
          <SkeletonLine className="ascii-skeleton-light w-4/5 text-2xl sm:text-4xl" />
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <SkeletonLine className="ascii-skeleton-light w-full text-sm" />
              <SkeletonLine className="ascii-skeleton-light w-11/12 text-sm" />
              <SkeletonLine className="ascii-skeleton-light w-4/5 text-sm" />
            </div>
            <div className="space-y-4">
              <SkeletonLine className="ascii-skeleton-light w-full text-sm" />
              <SkeletonLine className="ascii-skeleton-light w-10/12 text-sm" />
              <SkeletonLine className="ascii-skeleton-light w-3/4 text-sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="max-w-3xl mx-auto space-y-10">
          <SkeletonLine className="ascii-skeleton-light mx-auto w-2/5 text-xl" />
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="border-t border-black/15 py-8 space-y-3">
              <SkeletonLine className="ascii-skeleton-light w-3/4 text-2xl sm:text-4xl" />
              <SkeletonLine className="ascii-skeleton-light w-1/3 text-xs" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <SkeletonLine className="ascii-skeleton-light mx-auto w-1/4 text-xl" />
          <SkeletonLine className="ascii-skeleton-light w-full text-2xl" />
          <SkeletonLine className="ascii-skeleton-light w-4/5 text-2xl" />
        </div>
      </section>

      <section className="min-h-[50vh] bg-white flex flex-col items-center justify-center px-6">
        <SkeletonLine className="ascii-skeleton-light mx-auto w-2/5 text-3xl sm:text-5xl" />
        <SkeletonLine className="ascii-skeleton-light mx-auto mt-4 w-1/3 text-3xl sm:text-5xl" />
      </section>
    </div>
  );
}
