import Image from "next/image";
import {
  approvedTrajectory,
  approvedDemonstrations,
  safeImage,
  safeLink,
} from "@/lib/public-content";
export function TrajectoryEvents({ entries }) {
  const approved = approvedTrajectory(entries);
  if (!approved.length) return null;
  return (
    <section id="trajetoria-atuacao" className="content-section">
      <h2>Trajetória e Atuação</h2>
      <div className="detail-grid">
        {approved.map((entry) => (
          <article
            className="detail-panel"
            key={`${entry.date}-${entry.title}`}
          >
            <h3>{entry.title}</h3>
            <p>
              {entry.date} · {entry.institution}
            </p>
            <p>
              {entry.theme} · {entry.role}
            </p>
            <p>{entry.description}</p>
            {safeImage(entry.image) && (
              <Image
                src={entry.image}
                alt={entry.alt || entry.title}
                width={640}
                height={400}
                className="h-auto w-full rounded-2xl"
              />
            )}
            {safeLink(entry.link) && (
              <a href={entry.link} target="_blank" rel="noopener noreferrer">
                Conhecer o evento
              </a>
            )}
            <p className="text-sm">
              Fonte: {entry.source}. {entry.usage}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function ImageDemonstrations({ entries }) {
  const approved = approvedDemonstrations(entries);
  if (!approved.length) return null;
  return (
    <section className="content-section" id="demonstracoes">
      <h2>Demonstrações visuais</h2>
      {approved.map((entry) => (
        <figure className="detail-panel" key={entry.title}>
          <Image
            src={entry.image}
            alt={entry.alt}
            width={800}
            height={500}
            className="h-auto w-full rounded-2xl"
          />
          <figcaption>
            <h3>{entry.title}</h3>
            <p>
              Origem e uso: {entry.source}. {entry.usage}
            </p>
            <p>Técnica/ferramenta: {entry.technique}</p>
            <p>O que observar: {entry.observation}</p>
            <p>O que pode indicar: {entry.indication}</p>
            <p>O que não permite concluir sozinho: {entry.limitation}</p>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
