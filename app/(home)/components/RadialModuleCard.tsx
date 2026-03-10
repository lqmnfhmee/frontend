"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Factory,
  Boxes,
  Package,
  ShieldCheck,
  Wrench,
  Activity,
  AlertTriangle
} from "lucide-react";

type Item = {
  label: string;
  value: number;
};

type Props = {
  title: string;
  centerLabel: string;
  centerValue: number;
  items: Item[];
  buttonLabel: string;
  linkHref: string; // ✅ NEW
};

export default function RadialModuleCard({
  title,
  centerLabel,
  centerValue,
  items,
  buttonLabel,
  linkHref
}: Props) {

  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, []);

  const positions = [
    { x: -90, y: 40 },
    { x: 90, y: 40 },
    { x: 0, y: 120 }
  ];

  const getIcon = (label: string) => {
    if (label.includes("Facilities") || label.includes("Vessel"))
      return <Factory size={18} />;
    if (label.includes("Systems"))
      return <Boxes size={18} />;
    if (label.includes("Packages"))
      return <Package size={18} />;
    if (label.includes("SCE"))
      return <ShieldCheck size={18} />;
    if (label.includes("Active"))
      return <Activity size={18} />;
    if (label.includes("Deferred") || label.includes("High Risk"))
      return <AlertTriangle size={18} />;
    return <Wrench size={18} />;
  };

  return (
    <div
      className="
        rounded-xl px-6 pt-4 pb-6 flex flex-col items-center
        bg-white dark:bg-[var(--color-brand-darkCard)]
        border border-slate-200 dark:border-[var(--color-brand-darkBorder)]
        shadow-md shadow-slate-200/50 dark:shadow-none
        hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200 dark:hover:shadow-none
        transition-all duration-300
      "
    >

      {/* Title */}
      <h3 className="font-semibold mb-4 text-[15px] tracking-tight text-slate-900 dark:text-slate-100 relative">
        {title}
        <span className="absolute -bottom-2 left-0 w-10 h-[2px] bg-[var(--color-brand-primary-soft)]0 rounded-full"></span>
      </h3>

      {/* Radial Area */}
      <div className="relative w-[260px] h-[260px] flex items-start justify-center">

        {/* Ambient Glow */}
        <div
          className="
            absolute top-10
            w-40 h-40
            bg-[var(--color-brand-primary-soft)]0/10
            dark:bg-[var(--color-brand-primary)]/20
            blur-3xl
            rounded-full
            pointer-events-none
          "
        />

        {/* CENTER */}
        <motion.div
          onClick={() => setAnimationKey(prev => prev + 1)}
          className="
            absolute top-2 w-24 h-24 rounded-full
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-[var(--color-brand-darkBorder)]
            shadow-md shadow-slate-200/60 dark:shadow-none
            flex flex-col items-center justify-center text-center
            z-10 cursor-pointer
            transition-all duration-300
          "
        >
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {centerLabel}
          </p>
          <p className="font-semibold text-base text-slate-900 dark:text-slate-100">
            {centerValue}
          </p>
        </motion.div>

        {/* OUTER ITEMS */}
        {items.slice(0, 3).map((item, index) => (
          <motion.div
            key={`${animationKey}-${index}`}
            className="absolute flex flex-col items-center"
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
            animate={{
              x: positions[index].x,
              y: positions[index].y,
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.1
            }}
          >
            <div
              className="
                w-12 h-12 rounded-full
                bg-white dark:bg-slate-800
                border border-slate-200 dark:border-[var(--color-brand-darkBorder)]
                shadow-sm dark:shadow-none
                flex items-center justify-center
                transition-all duration-300
              "
            >
              {getIcon(item.label)}
            </div>

            <p className="text-[13px] mt-1 text-slate-700 dark:text-slate-300">
              {item.label}
            </p>

            <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
              {item.value}
            </p>
          </motion.div>
        ))}

      </div>

      {/* ✅ LINK BUTTON */}
      <Link
        href={linkHref}
        className="
          mt-5 px-4 py-2 text-sm rounded-md
          bg-[var(--color-brand-primary)] text-white
          hover:bg-[var(--color-brand-primary)]
          shadow-sm hover:shadow-md
          transition-all duration-300
        "
      >
        {buttonLabel} →
      </Link>

    </div>
  );
}