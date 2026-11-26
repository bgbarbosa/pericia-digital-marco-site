import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ForensicsIcon from "@/components/forensics/ForensicsIcon";
import GuideFieldNavigation from "@/components/forensics/GuideFieldNavigation";
import styles from "@/components/forensics/Forensics.module.css";
import { cardMenu } from "@/data/profile";
import { areaPath, fieldAnchor, guide, guidePath, lawAreas, lawChoices, technicalFields } from "@/lib/forensics";
import { pageMetadata } from "@/lib/page-metadata";

const homeAreas = "/#pericia-aplicada";
const branchOptions = lawChoices.map(({ id, title }) => ({ title, href: areaPath(id) }));
const areaTitle = (area) => `${area.title} — possibilidades de análise digital`;

export async function generateMetadata({ searchParams }) {
  const query = await searchParams;
  const area = lawAreas.find(({ id }) => id === query.area);
  return {
    ...pageMetadata(area ? areaTitle(area) : guide.title, area?.summary ?? guide.description, guidePath),
    ...(query.area !== undefined ? { robots: { index: false, follow: true } } : {}),
  };
}

function QuestionList({ questions }) {
  return (
    <ul className={styles.questions} role="list">
      {questions.map((question) => <li key={question}><ForensicsIcon name="search" /><span>{question}</span></li>)}
    </ul>
  );
}

function EditorialBlocks({ blocks }) {
  return blocks.map((block) => {
    if (block.type === "list") return <QuestionList key={block.items[0]} questions={block.items} />;
    const Tag = block.type;
    return <Tag key={block.text}>{block.emphasis ? <strong>{block.text}</strong> : block.text}</Tag>;
  });
}

function GuideIntro({ area }) {
  if (area) return (
    <section className={styles.readingIntro} aria-labelledby="guide-intro">
      <p className={styles.eyebrow}>Aplicação jurídica · {area.title}</p>
      <h2 id="guide-intro">Como a análise técnica pode ajudar?</h2>
      <p>{area.intro}</p>
      <h3>Exemplos de perguntas técnicas</h3>
      <QuestionList questions={area.questions} />
      <p className={styles.notice}><strong>Recorte de leitura:</strong> abaixo estão os campos técnicos mais diretamente relacionados a esta área. Os demais campos permanecem disponíveis no guia completo. Os exemplos são ilustrativos e não equivalem a uma conclusão sobre um caso concreto.</p>
    </section>
  );

  return (
    <section className={styles.readingIntro} aria-label="Sobre a computação forense">
      <p className={styles.eyebrow}>Sobre a computação forense</p>
      <EditorialBlocks blocks={guide.introduction} />
      <div className={styles.overviewGrid}>
        {lawAreas.map(({ id, title }) => (
          <Link key={id} href={areaPath(id)}>{title}<ForensicsIcon name="chevron" /></Link>
        ))}
      </div>
    </section>
  );
}

function TechnicalField({ field }) {
  const isAi = field.id === "ia";
  return (
    <article className={styles.technical} id={fieldAnchor(field.id)} tabIndex={-1}>
      <div className={styles.techHead}>
        <span className={styles.techIcon}><ForensicsIcon name={field.icon} /></span>
        <div>
          <p className={styles.techNumber}>Campo {field.number}</p>
          <h3>{field.title}</h3>
        </div>
      </div>
      <p>{field.description}</p>
      <h4>Possibilidades de {isAi ? "aplicação" : "análise"}</h4>
      <ul>
        {field.possibilities.map((possibility) => <li key={possibility}>{possibility};</li>)}
      </ul>
      <p className={styles.application}><strong>{isAi ? "Responsabilidade técnica:" : "Aplicação jurídica:"}</strong> {field.application}</p>
    </article>
  );
}

export default async function ForensicsGuidePage({ searchParams }) {
  const { area: areaId } = await searchParams;
  const area = lawAreas.find(({ id }) => id === areaId);
  const currentPath = areaPath(area?.id ?? "todas");
  const fields = area ? technicalFields.filter(({ id }) => area.technicalIds.includes(id)) : technicalFields;
  const indexFields = fields.map(({ id, title, number }) => ({ anchor: fieldAnchor(id), title, number }));

  return (
    <main className={styles.guide}>
      <Header menu={cardMenu} contactHref="/contato" contactLabel="Contato" />
      <section id="guia-topo" className={styles.detailHero} aria-labelledby="guide-title">
        <div className="site-container">
          <nav aria-label="Caminho da página" className={styles.breadcrumb}>
            <Link href="/">Início</Link><ForensicsIcon name="chevron" />
            {area ? (
              <><Link href={guidePath}>Perícia digital aplicada ao Direito</Link><ForensicsIcon name="chevron" />
                <span aria-current="page">{area.title}</span></>
            ) : <span aria-current="page">Perícia digital aplicada ao Direito</span>}
          </nav>
          <div className={styles.detailHeroGrid}>
            <div>
              <p className={styles.eyebrow}>Guia técnico · {area?.title ?? "Todas as áreas"}</p>
              <h1 id="guide-title">{area ? areaTitle(area) : guide.title}</h1>
              <p className={styles.guideDescription}>{area?.summary ?? guide.description}</p>
              <div className={styles.actions}>
                <Link className="action-secondary" href={homeAreas}><ForensicsIcon name="back" />Voltar às áreas do Direito</Link>
                {area && <Link className="action-primary" href={guidePath}>Ler o guia completo<ForensicsIcon name="book" /></Link>}
              </div>
            </div>
            <div className={styles.detailVisual}>
              <Image src={`/forense/card-${area?.id ?? "todas"}.svg`} alt="" width={320} height={128} />
            </div>
          </div>
        </div>
      </section>
      <div className={`site-container ${styles.readingLayout}`}>
        <aside className={styles.sidebar} aria-label="Navegação do guia">
          <h2 id="guide-branches-label">Áreas do Direito</h2>
          <nav aria-labelledby="guide-branches-label">
            {lawChoices.map(({ id, title, icon }) => (
              <Link key={id} className={styles.sideLink} href={areaPath(id)}
                aria-current={areaPath(id) === currentPath ? "page" : undefined}>
                <ForensicsIcon name={icon} /><span>{title}</span>
              </Link>
            ))}
          </nav>
          <hr />
          <h2 id="guide-index-label">Campos de conhecimento</h2>
          <GuideFieldNavigation key={currentPath} fields={indexFields} />
        </aside>
        <div className={styles.reading}>
          <GuideFieldNavigation key={currentPath} fields={indexFields} branchOptions={branchOptions} currentPath={currentPath} />
          <GuideIntro area={area} />
          <section aria-labelledby="technical-heading">
            <div className={styles.technicalHeading}>
              <p className={styles.eyebrow}>Possibilidades de análise</p>
              <h2 id="technical-heading">{guide.technicalHeading}</h2>
              <p>{area
                ? `${fields.length} campos relacionados a ${area.title}. Selecione um campo no índice ou percorra o conteúdo abaixo.`
                : "15 campos técnicos. Percorra todo o conteúdo ou utilize o índice para ir diretamente ao tema de interesse."}</p>
            </div>
            <div className={styles.technicalGrid}>
              {fields.map((field) => <TechnicalField key={field.id} field={field} />)}
            </div>
          </section>
          <section className={styles.closing} aria-label={area ? "Limites do recorte" : "Aplicação jurídica e responsabilidade técnica"}>
            {area ? (
              <>
                <h2>Limites e responsabilidade técnica</h2>
                <p>Os campos acima são possibilidades de análise relacionadas ao ramo selecionado. A viabilidade de cada exame depende do material, da autorização de acesso, dos recursos e da complexidade técnica. A avaliação técnica não determina, por si só, a admissibilidade ou o valor jurídico da evidência.</p>
              </>
            ) : <EditorialBlocks blocks={guide.closing} />}
            <div className={styles.actions}>
              <Link className="action-secondary" href={homeAreas}><ForensicsIcon name="back" />Escolher outra área</Link>
              {area && <Link className="action-primary" href={guidePath}>Ler todos os 15 campos<ForensicsIcon name="arrow" /></Link>}
              <a className="action-secondary" href="#guia-topo">Voltar ao topo</a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
