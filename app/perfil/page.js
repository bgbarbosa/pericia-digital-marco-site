import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SelectedDamaTools from "@/components/SelectedDamaTools";
import { cardMenu, profile } from "@/data/profile";
import { profileEducation, profilePractice, profileTraining } from "@/data/professional-profile";
import { pageMetadata } from "@/lib/page-metadata";
import styles from "./profile.module.css";

export const metadata = pageMetadata("Perfil e currículo de Marco Barbosa", "Conheça a trajetória, formação, capacitações e projetos autorais de Marco Aurélio Pereira Barbosa, criador do Dama Universe.", "/perfil");

export default function ProfessionalProfilePage() {
  return (
    <main className={styles.page}>
      <Header menu={cardMenu} contactHref="/contato" contactLabel="Contato" />
      <section className={styles.hero} aria-labelledby="profile-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Perfil profissional · {profile.city}</p>
          <h1 id="profile-title">Marco <span>Barbosa</span></h1>
          <p className={styles.fullName}>{profile.name}</p>
          <p className={styles.lead}>Tecnologia com <strong>clareza, método e aplicação prática.</strong></p>
          <p>Inteligência Artificial, capacitação, análise de dados e soluções digitais. Uma trajetória que conecta formação em Administração, experiência em investigação e desenvolvimento de projetos autorais.</p>
          <div className={styles.actions}>
            <a className="action-primary" href="/documentos/curriculo-marco-barbosa-2026-10.pdf" download>Baixar currículo em PDF</a>
            <a className="action-secondary" href={profile.lattes} target="_blank" rel="noopener noreferrer">Consultar Lattes ↗</a>
          </div>
        </div>
        <div className={styles.identity}>
          <Image className={styles.logo} src="/marca/marco-barbosa-logo.webp" alt="Identidade profissional Marco Barbosa, monograma MB em azul e prata" width={1600} height={533} sizes="(max-width: 767px) 100vw, 440px" />
          <div className={styles.portrait}>
            <Image src={profile.image} alt={`Retrato profissional de ${profile.name}`} width={600} height={400} sizes="(max-width: 767px) 90vw, 370px" preload />
          </div>
          <p>Inteligência Artificial <span aria-hidden="true">·</span> Análise de Dados<br />Computação Forense <span aria-hidden="true">·</span> Soluções Digitais</p>
        </div>
      </section>

      <nav className={styles.index} aria-label="Nesta página">
        {[["apresentacao", "Apresentação"], ["atuacao", "Atuação"], ["formacao", "Formação"], ["qualificacoes", "Qualificações"], ["autoria", "Autoria"], ["conexoes", "Contatos"]].map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section className={styles.section} id="apresentacao">
        <p className={styles.eyebrow}>Quem é Marco Barbosa</p>
        <h2>Formação, experiência e <span>iniciativa autoral.</span></h2>
        <div className={styles.columns}>
          <div>
            <p>Marco Aurélio Pereira Barbosa é graduado em Administração, especialista em Análise de Dados e em Inteligência Artificial para Agentes da Lei. Cursa especialização em Inteligência Artificial pela Universidade Tecnológica Federal do Paraná — UTFPR.</p>
            <p>É Investigador da Polícia Civil do Estado de Mato Grosso do Sul desde 2014. A experiência em investigação e a formação em computação forense integram sua base técnica, apresentada neste site ao lado de capacitações, conteúdos e projetos pessoais de tecnologia.</p>
          </div>
          <div className={styles.highlight}>
            <h3>Da compreensão à aplicação</h3>
            <p>O trabalho autoral reúne organização da informação, documentação técnica, automação de tarefas e uso responsável de IA. O objetivo é tornar recursos tecnológicos mais compreensíveis e úteis à rotina profissional.</p>
            <p>É também o criador do <a className="text-link" href={profile.damaUniverse} target="_blank" rel="noopener noreferrer">Dama Universe ↗</a>, ecossistema que reúne seus programas, ferramentas, assistentes e conteúdos.</p>
          </div>
        </div>
      </section>

      <section className={styles.section} id="atuacao">
        <p className={styles.eyebrow}>Áreas que se conectam</p>
        <h2>Conhecimento aplicado a <span>necessidades reais.</span></h2>
        <div className={styles.grid}>
          {profilePractice.map(item => <article className={styles.practice} key={item.number}>
            <span className={styles.number} aria-hidden="true">{item.number}</span>
            <h3>{item.title}</h3><p>{item.text}</p>
            <a className="text-link" href={item.href} target={item.href.startsWith("https:") ? "_blank" : undefined} rel={item.href.startsWith("https:") ? "noopener noreferrer" : undefined}>{item.action} →</a>
          </article>)}
        </div>
      </section>

      <section className={styles.section} id="formacao">
        <p className={styles.eyebrow}>Trajetória acadêmica e profissional</p>
        <h2>Uma base que segue <span>em construção.</span></h2>
        <ol className={styles.timeline}>
          {profileEducation.map(item => <li key={item.title}>
            <span className={styles.period}>{item.period}</span>
            <div><h3>{item.title}</h3><p>{item.institution}</p><p className={styles.status}>{item.workload ? `${item.workload} · ` : ""}{item.status}</p></div>
          </li>)}
        </ol>
        <div className={styles.professional}><h3>Formação policial e experiência</h3><p>Curso de Formação Policial pela Polícia Civil de Mato Grosso do Sul, concluído em 2014. Atuação como Investigador da instituição desde o mesmo ano.</p><p className={styles.note}>O vínculo funcional é uma informação curricular. Os projetos pessoais e conteúdos deste site não representam a Polícia Civil ou qualquer órgão público.</p></div>
      </section>

      <section className={styles.section} id="qualificacoes">
        <p className={styles.eyebrow}>Formação complementar selecionada</p>
        <h2>Atualização técnica e <span>aprendizado contínuo.</span></h2>
        <ul className={styles.training}>
          {profileTraining.map(([title, institution, hours, year]) => <li key={title}><h3>{title}</h3><p>{institution}</p><span>{hours} · {year}</span>{title.startsWith("Detecção") && <Link className="text-link" href="/formacao/deteccao-imagens-ia">Conhecer esta formação →</Link>}</li>)}
        </ul>
        <div className={styles.technology}>
          <h3>Tecnologias e ferramentas</h3>
          <dl><div><dt>Desenvolvimento</dt><dd>Python · CustomTkinter · PyInstaller · pytest · Git</dd></div><div><dt>IA e dados</dt><dd>ChatGPT · Power BI</dd></div><div><dt>Ferramentas com formação</dt><dd>IPED · Avilla Forensics · ADB Forensics Extractor · UFED</dd></div></dl>
        </div>
      </section>

      <section className={styles.section} id="autoria">
        <p className={styles.eyebrow}>Criador do Dama Universe</p>
        <h2>Ideias transformadas em <span>projetos e conteúdo.</span></h2>
        <p>O Dama Universe é o ecossistema autoral de Marco Barbosa. Reúne programas para Windows, ferramentas digitais, GPTs personalizados e conteúdos técnicos. O site profissional apresenta sua trajetória e modalidades de capacitação; o Dama Universe concentra as fichas e o estágio dos projetos.</p>
        <SelectedDamaTools />
        <a className="action-secondary" href={profile.damaUniverse} target="_blank" rel="noopener noreferrer">Visitar o Dama Universe ↗</a>
        <div className={styles.grid}>
          <article className={styles.highlight}><h3>Perícia na Prática</h3><p>Coleção educativa voltada à compreensão de questões técnicas relacionadas a mensagens digitais, evidências eletrônicas e análise de informações.</p><Link className="text-link" href="/pericia-na-pratica">Explorar a coleção →</Link></article>
          <article className={styles.highlight}><h3>Produção bibliográfica</h3><p>BARBOSA, M. A. P. <strong>Explorando Métodos Alternativos de Instalação de Aplicativos em Dispositivos Xiaomi com MIUI.</strong> Dispositivos Móveis e Extração Avançada, 2023.</p><p className={styles.note}>Registrada no Currículo Lattes na categoria “Outras produções bibliográficas”.</p><a className="text-link" href={profile.lattes} target="_blank" rel="noopener noreferrer">Consultar o registro no Lattes ↗</a></article>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.eyebrow}>Redes de conhecimento</p><h2>Participação e <span>troca de experiências.</span></h2>
        <div className={styles.grid}><article className={styles.highlight}><h3>{profile.community.title}</h3><p>{profile.community.statement}</p></article><article className={styles.highlight}><h3>{profile.association.acronym}</h3><p>{profile.association.statement}</p></article></div>
      </section>

      <section className={`${styles.section} ${styles.contact}`} id="conexoes">
        <p className={styles.eyebrow}>Próximas conexões</p><h2>Conheça, consulte e <span>entre em contato.</span></h2>
        <p>Para conversar sobre capacitações, palestras, mentorias ou soluções digitais, utilize os canais profissionais. O currículo em PDF oferece uma versão resumida desta apresentação.</p>
        <div className={styles.actions}><Link className="action-primary" href="/contato">Entrar em contato</Link><Link className="action-secondary" href="/cartao">Abrir cartão digital</Link><a className="action-secondary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
        <p className={styles.note}>Apresentação baseada no currículo fornecido pelo titular, edição outubro de 2026, e nos conteúdos autorais já existentes no site. Formação em andamento identificada expressamente.</p>
      </section>
      <Footer />
    </main>
  );
}
