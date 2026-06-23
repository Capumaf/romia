"use client";

import { motion } from "framer-motion";

type Step = {
  title: string;
  subtitle: string;
};

type RomiaFlowProps = {
  steps: Step[];
};

export default function RomiaFlow({ steps }: RomiaFlowProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {steps.map((step, index) => (
        <div
          key={step.title}
          className="flex flex-col items-center gap-2"
        >
          <Card
            title={step.title}
            subtitle={step.subtitle}
            large={index === 1}
            delay={index * 0.4}
          />

          {index < steps.length - 1 && (
            <Connector delay={index * 0.4 + 0.2} />
          )}
        </div>
      ))}
    </div>
  );
}

function Card({
  title,
  subtitle,
  large = false,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  large?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
      }}
      className={`w-full max-w-[200px] rounded-2xl border ${
        large ? "p-4" : "p-3"
      }`}
      style={{
        borderColor: "var(--pink-line)",
        background: "var(--bg-card)",
      }}
    >
      <p
        className="font-mono text-xs uppercase tracking-[0.25em]"
        style={{ color: "var(--pink)" }}
      >
        {title}
      </p>

      <p
        className="mt-3 text-sm"
        style={{ color: "var(--ink-dim)" }}
      >
        {subtitle}
      </p>
    </motion.div>
  );
}

function Connector({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{
        duration: 0.25,
        delay,
      }}
      className="h-4 w-px origin-top"
      style={{
        background: "var(--pink-line)",
      }}
    />
  );
}