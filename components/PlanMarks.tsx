"use client";

import { useEffect, useState } from "react";
import { loadActive, loadPrefs } from "@/lib/storage";
import styles from "./subpage.module.css";

export function PlanMarks({ id }: { id: string }) {
  const [marks, setMarks] = useState<string[]>([]);

  useEffect(() => {
    const next: string[] = [];
    if (loadPrefs().lastTemplateId === id) next.push("Last used");
    if (loadActive()?.templateId === id) next.push("In progress");
    setMarks(next);
  }, [id]);

  if (!marks.length) return null;
  return (
    <div className={styles.marks}>
      {marks.map((mark) => (
        <span key={mark} className={styles.mark}>
          {mark}
        </span>
      ))}
    </div>
  );
}
