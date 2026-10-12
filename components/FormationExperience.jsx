import Link from "next/link";
import ExpandableDetails from "@/components/ExpandableDetails";
import {
  academicFormation,
  credentials,
  emphasisPoints,
  featuredTraining,
  knowledgeAreas,
  profile,
} from "@/data/profile";

export default function FormationExperience() {
  return (
    <div className="detail-grid credentials-layout">
      <ExpandableDetails
        id="formacao-card"
        title="Formação e credenciais"
        summary="Administração, Inteligência Artificial, análise de dados e formação técnica complementar."
      >
        <h3>Formação acadêmica</h3>
        <ul className="expanded-list" aria-label="Formação acadêmica">
          {academicFormation.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <h3>Cursos e formação complementar</h3>
        <ul className="expanded-list">
          {credentials.slice(2, -1).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p><Link className="text-link" href={featuredTraining.href}>Aprofundar: {featuredTraining.title} →</Link></p>
        <h3>Vínculo associativo e currículo</h3>
        <p>{profile.association.statement}</p>
        <p><a className="text-link" href={profile.lattes} target="_blank" rel="noopener noreferrer">Consultar Currículo Lattes ↗</a></p>
      </ExpandableDetails>
      <ExpandableDetails
        id="experiencia-card"
        title="Forma de trabalho / experiência e conhecimentos"
        summary="Mais de 12 anos em investigação e análise técnica, com método, documentação e limites explícitos."
      >
        <h3>Trajetória profissional</h3>
        <p>{profile.name} atua como Investigador da Polícia Civil do Mato Grosso do Sul. Esse vínculo é uma informação curricular; o site apresenta sua atuação pessoal, educacional e tecnológica.</p>
        <p>A experiência com documentação e leitura crítica de informações se relaciona a capacitações, conteúdos e projetos digitais. Não são divulgados casos, operações ou informações restritas.</p>
        <h3 id="conhecimentos">Áreas de conhecimento complementar</h3>
        <ul className="expanded-list">
          {knowledgeAreas.map(({ title, text }) => <li key={title}><strong>{title}.</strong> {text}</li>)}
        </ul>
        <h3>Método de trabalho</h3>
        <p>{emphasisPoints.join(" · ")}.</p>
        <p>Perícia digital examina vestígios eletrônicos por procedimentos documentados. Computação forense aplica métodos computacionais a esse exame. OSINT usa fontes abertas, cuja origem, confiabilidade e contexto também precisam ser avaliados.</p>
        <p>Como exemplo didático, organizar uma sequência de documentos e registrar suas fontes ajuda a comparar informações; isso não determina, por si só, autoria ou responsabilidade.</p>
        <h3>Limites do exame</h3>
        <p>Nem todo vestígio pode ser encontrado. O significado de artefatos pode mudar conforme a versão dos programas, e a recuperação de dados não é garantida.</p>
        <p><a className="text-link" href="https://www.nist.gov/publications/digital-investigation-techniques-nist-scientific-foundation-review" target="_blank" rel="noopener noreferrer">Fonte: NISTIR 8354 — resumo da publicação ↗</a></p>
      </ExpandableDetails>
    </div>
  );
}
