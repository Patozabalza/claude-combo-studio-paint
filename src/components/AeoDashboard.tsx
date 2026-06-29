"use client";

import { useEffect, useState } from "react";
import { motion, animate, type Variants } from "framer-motion";
import Image from "next/image";
import type { AeoChecklistItem, AeoCategory } from "@/lib/aeo-checklist";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const cardVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE_OUT } },
};

const listVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const CATEGORY_COLOR: Record<AeoCategory, string> = {
  "Indexación IA": "#4A90D9",
  "Datos Estructurados": "#E77B00",
  "Presencia Externa": "#7B68EE",
  Monitoreo: "#4CAF50",
};

function ScoreGauge({ percent }: { percent: number }) {
  const [display, setDisplay] = useState(0);
  const size = 176;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const controls = animate(0, percent, {
      duration: 0.8,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [percent]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#D9CBB8" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E77B00"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (percent / 100) * circumference }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-cormorant text-5xl font-semibold text-brand-espresso">{display}%</span>
        <span className="text-xs uppercase tracking-wide text-brand-espresso/60">AEO Score</span>
      </div>
    </div>
  );
}

export default function AeoDashboard({
  score,
  checklist,
}: {
  score: { done: number; total: number; percent: number };
  checklist: AeoChecklistItem[];
}) {
  return (
    <div className="min-h-screen bg-brand-ivory text-brand-espresso">
      <header className="flex flex-col items-center gap-4 border-b border-brand-sand/60 px-6 py-10 text-center">
        <Image src="/logo.png" alt="Combo Studio Paint" width={64} height={64} className="rounded-full" />
        <div>
          <h1 className="font-cormorant text-3xl font-semibold">AEO Control Panel</h1>
          <p className="text-sm text-brand-espresso/70">
            Combo Studio Paint — visibilidad en motores de respuesta de IA
          </p>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col items-center gap-10 px-6 py-12">
        <ScoreGauge percent={score.percent} />
        <p className="text-sm text-brand-espresso/70">
          {score.done} de {score.total} tareas completadas
        </p>

        <motion.ul
          variants={listVariants}
          initial="initial"
          animate="animate"
          className="grid w-full gap-3 sm:grid-cols-2"
        >
          {checklist.map((item) => (
            <motion.li
              key={item.id}
              variants={cardVariants}
              className="flex items-start gap-3 rounded-xl border border-brand-sand/60 bg-brand-white px-4 py-3 shadow-sm"
            >
              <span
                className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.status === "done" ? "#4CAF50" : "#D9CBB8" }}
                aria-hidden
              />
              <div>
                <p className="text-sm font-medium leading-snug">{item.label}</p>
                <p
                  className="mt-1 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: CATEGORY_COLOR[item.category] }}
                >
                  {item.category} · {item.status === "done" ? "Completado" : "Pendiente"}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </main>
    </div>
  );
}
