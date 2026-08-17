import type { EvidenceContent } from "./types";

export function EvidenceCard({
  context,
  label,
  period,
  source,
  value,
}: EvidenceContent) {
  return (
    <article>
      <p>{label}</p>
      <p>{value}</p>
      <p>{context}</p>
      {period ? <p>Período: {period}</p> : null}
      {source ? <p>Fonte: {source}</p> : null}
    </article>
  );
}
