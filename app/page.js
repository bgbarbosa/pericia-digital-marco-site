import Image from "next/image";

export default function LandingPagePericiaMobile() {
    const perfil = {
        nome: "Marco Aurélio Pereira Barbosa",
        titulo: "Perícia Digital, Computação Forense e Evidências Digitais",
        subtitulo:
            "Trajetória profissional voltada à investigação, análise técnica, cadeia de custódia e estudo aplicado de vestígios eletrônicos.",
        apoio:
            "Página institucional de apresentação profissional, formação complementar e áreas de conhecimento em tecnologia forense, perícia digital e análise de evidências eletrônicas.",
        whatsapp: "5567999398990",
        whatsappExibicao: "(67) 99939-8990",
        email: "marcobarbo@gmail.com",
        cidade: "Campo Grande/MS",
        lattes: "https://lattes.cnpq.br/1970561249212557",
    };

    const menu = [
        { label: "Início", href: "#inicio" },
        { label: "Perícia Digital", href: "#pericia-digital" },
        { label: "Especialização", href: "#especializacao" },
        { label: "Trajetória", href: "#trajetoria" },
        { label: "Credenciais", href: "#credenciais" },
        { label: "Contato", href: "#contato" },
    ];

    const areasEspecializacao = [
        {
            titulo: "Perícia Digital em Dispositivos Móveis",
            texto:
                "Estudo técnico de procedimentos relacionados à extração, preservação, organização e análise de dados provenientes de smartphones e outros dispositivos móveis, com atenção à integridade dos vestígios e à documentação das etapas executadas.",
        },
        {
            titulo: "Computação Forense",
            texto:
                "Conhecimento aplicado à análise de dados em discos rígidos, SSDs e servidores, com ênfase em organização de vestígios digitais e recuperação de dados, quando tecnicamente viável.",
        },
        {
            titulo: "Estudos sobre atuação pericial e leitura crítica de laudos",
            texto:
                "Estudo de temas relacionados à formulação de quesitos, leitura crítica de laudos, compreensão técnica do material examinado e análise de aspectos relevantes em contexto pericial.",
        },
        {
            titulo: "Investigação Digital",
            texto:
                "Estudo de vestígios digitais relacionados a fraudes, vazamento de dados, concorrência desleal e apuração de indícios técnicos em ambientes digitais.",
        },
        {
            titulo: "Imagem e Vídeo",
            texto:
                "Conhecimento aplicado à verificação de autenticidade, leitura de metadados, análise de edições, exame de CFTV e tratamento técnico voltado à melhor visualização de elementos relevantes.",
        },
        {
            titulo: "Parecer Técnico",
            texto:
                "Atuação voltada à produção de conteúdo técnico e interpretação de evidências digitais, dispositivos eletrônicos e viabilidade de análise de material apresentado.",
        },
    ];

    const pontosEnfase = [
        "Rigor técnico",
        "Cadeia de custódia",
        "Formação contínua",
        "Método e rastreabilidade",
        "Clareza técnica",
        "Documentação e análise de evidências",
    ];

    const credenciais = [
        "Investigador da Polícia Civil do Mato Grosso do Sul",
        "Mais de 12 anos de experiência em investigação e análise técnica",
        "Pós-graduação em Análise de Dados",
        "Especialização em Inteligência Artificial",
        "Formação complementar em perícia digital e computação forense",
        "Cursos em perícia mobile, IPED, ADB Forensics, Ávila Forensics, UFED e Cellebrite",
        "Associado à APECOF",
    ];

    const whatsappLink = `https://wa.me/${perfil.whatsapp}`;

    return (
        <main className="min-h-screen bg-[#020817] text-slate-100 selection:bg-cyan-400/20">
            <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan-400/10 bg-slate-950/88 backdrop-blur-xl">
                <div className="mx-auto flex max-w-[1480px] items-center justify-between px-8 py-4 xl:px-10">
                    <a
                        href="#inicio"
                        className="text-[15px] font-bold tracking-[0.34em] text-cyan-300 xl:text-base"
                    >
                        M.A.P.B
                    </a>

                    <nav className="hidden items-center gap-9 md:flex xl:gap-10">
                        {menu.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-base font-semibold text-slate-300 transition hover:text-cyan-300 xl:text-[1.05rem]"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <a
                        href="#contato"
                        className="hidden rounded-2xl border border-cyan-400/35 bg-cyan-400/10 px-6 py-2.5 text-base font-semibold text-cyan-100 transition hover:bg-cyan-400/20 lg:inline-flex xl:text-[1.02rem]"
                    >
                        Contato profissional
                    </a>
                </div>
            </header>

            <section
                id="inicio"
                className="relative overflow-hidden border-b border-white/10 pt-24"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12),transparent_42%),linear-gradient(90deg,rgba(2,6,23,1),rgba(3,16,37,0.98),rgba(2,6,23,1))]" />
                <div className="absolute left-1/2 top-12 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-[1480px] px-8 py-14 xl:px-10 xl:py-16">
                    <div className="grid gap-10 lg:grid-cols-[1.16fr_0.84fr] lg:items-center xl:gap-12">
                        <div className="max-w-[920px] text-center lg:text-left">
                            <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-base font-medium text-cyan-200 xl:text-[1.05rem]">
                                {perfil.nome}
                            </div>

                            <h1 className="mt-5 text-5xl font-bold leading-[0.96] text-white md:text-6xl xl:text-[4.7rem]">
                                {perfil.titulo}
                            </h1>

                            <p className="mx-auto mt-5 max-w-[860px] text-[1.85rem] font-medium leading-[1.2] text-cyan-300 lg:mx-0 xl:text-[2.15rem]">
                                {perfil.subtitulo}
                            </p>

                            <p className="mx-auto mt-6 max-w-[900px] text-[1.13rem] leading-9 text-slate-300 lg:mx-0 xl:text-[1.2rem] xl:leading-10">
                                {perfil.apoio}
                            </p>

                            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                                <a
                                    href={perfil.lattes}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-2xl bg-cyan-600 px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_30px_rgba(8,145,178,0.25)] transition hover:bg-cyan-500 xl:text-[1.02rem]"
                                >
                                    Currículo Lattes
                                </a>
                                <a
                                    href="#contato"
                                    className="rounded-2xl border border-white/15 px-7 py-3.5 text-base font-semibold text-slate-100 transition hover:bg-white/5 xl:text-[1.02rem]"
                                >
                                    Contato profissional
                                </a>
                            </div>

                            <div className="mt-9 grid gap-4 sm:grid-cols-3 xl:gap-5">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur xl:p-5">
                                    <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-cyan-300 xl:text-[14px]">
                                        Área
                                    </p>
                                    <p className="mt-2 text-base leading-7 text-slate-200 xl:text-[1.05rem]">
                                        Perícia Digital e Computação Forense
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur xl:p-5">
                                    <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-cyan-300 xl:text-[14px]">
                                        Ênfase
                                    </p>
                                    <p className="mt-2 text-base leading-7 text-slate-200 xl:text-[1.05rem]">
                                        Cadeia de custódia e análise técnica
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur xl:p-5">
                                    <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-cyan-300 xl:text-[14px]">
                                        Trajetória
                                    </p>
                                    <p className="mt-2 text-base leading-7 text-slate-200 xl:text-[1.05rem]">
                                        Investigação, documentação e evidências digitais
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center lg:justify-end">
                            <div className="relative h-[520px] w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-gradient-to-b from-white/10 to-white/5 shadow-[0_0_50px_rgba(8,145,178,0.12)] xl:h-[580px] xl:max-w-[470px]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_42%)]" />
                                <Image
                                    src="/marco.jpeg"
                                    alt="Marco Aurélio Pereira Barbosa"
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 768px) 100vw, 470px"
                                    priority
                                />
                                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="pericia-digital" className="relative py-16 md:py-18">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.06),transparent_45%)]" />
                <div className="relative mx-auto max-w-[1480px] px-8 xl:px-10">
                    <h2 className="text-center text-4xl font-bold text-white md:text-[3rem] xl:text-[3.2rem]">
                        O que é Perícia Digital?
                    </h2>

                    <div className="mt-9 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-2xl backdrop-blur md:p-10 xl:p-11">
                        <div className="border-l-4 border-cyan-400 pl-6 text-lg leading-8 text-slate-300 md:text-[1.18rem] md:leading-9 xl:text-[1.24rem] xl:leading-10">
                            <p>
                                A perícia digital é a aplicação de método técnico para
                                identificar, preservar, organizar e analisar vestígios
                                eletrônicos com potencial de relevância em contextos judiciais,
                                administrativos e investigativos.
                            </p>
                            <p className="mt-4">
                                No contexto da computação forense e da análise de dispositivos
                                eletrônicos, o trabalho envolve atenção à integridade dos dados,
                                à cadeia de custódia, à rastreabilidade das etapas executadas e
                                à leitura técnica do material examinado.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="especializacao" className="pb-16 md:pb-18">
                <div className="mx-auto max-w-[1480px] px-8 xl:px-10">
                    <h2 className="text-center text-4xl font-bold text-white md:text-[3rem] xl:text-[3.2rem]">
                        Áreas de Especialização
                    </h2>

                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-7">
                        {areasEspecializacao.map((item) => (
                            <article
                                key={item.titulo}
                                className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-7 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.045] xl:p-8"
                            >
                                <h3 className="text-[1.7rem] font-semibold leading-snug text-cyan-300 xl:text-[1.82rem]">
                                    {item.titulo}
                                </h3>
                                <p className="mt-4 text-[1.05rem] leading-8 text-slate-300 xl:text-[1.1rem] xl:leading-9">
                                    {item.texto}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="trajetoria" className="py-16 md:py-18">
                <div className="mx-auto max-w-[1480px] px-8 xl:px-10">
                    <h2 className="text-center text-4xl font-bold text-white md:text-[3rem] xl:text-[3.2rem]">
                        Trajetória Profissional
                    </h2>

                    <div className="mt-9 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-2xl backdrop-blur md:p-10 xl:p-11">
                        <div className="border-l-4 border-cyan-400 pl-6">
                            <p className="text-[15px] font-semibold uppercase tracking-[0.22em] text-cyan-300 xl:text-base">
                                Apresentação profissional
                            </p>
                            <p className="mt-5 text-[1.08rem] leading-8 text-slate-300 md:text-[1.16rem] md:leading-9 xl:text-[1.2rem] xl:leading-10">
                                <strong className="text-white">
                                    Marco Aurélio Pereira Barbosa
                                </strong>{" "}
                                atua na área de investigação, análise de dados e tecnologia
                                forense, com experiência prática em evidências digitais, cadeia
                                de custódia e documentação técnica.
                            </p>
                            <p className="mt-4 text-[1.08rem] leading-8 text-slate-300 md:text-[1.16rem] md:leading-9 xl:text-[1.2rem] xl:leading-10">
                                Possui mais de 12 anos de experiência em investigação, análise
                                técnica, documentação de vestígios e organização de elementos
                                probatórios em contextos que exigem método, cadeia de custódia e
                                rigor técnico.
                            </p>
                            <p className="mt-4 text-[1.08rem] leading-8 text-slate-300 md:text-[1.16rem] md:leading-9 xl:text-[1.2rem] xl:leading-10">
                                Sua trajetória reúne experiência prática e formação complementar
                                em análise de dados, inteligência artificial, perícia digital e
                                computação forense, com ênfase em método, clareza e rigor
                                técnico.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="credenciais" className="py-16 md:py-18">
                <div className="mx-auto max-w-[1480px] px-8 xl:px-10">
                    <h2 className="text-center text-4xl font-bold text-white md:text-[3rem] xl:text-[3.2rem]">
                        Credenciais
                    </h2>

                    <div className="mt-9 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-2xl backdrop-blur md:p-10 xl:p-11">
                        <div className="flex flex-wrap gap-4 text-base leading-7 text-slate-200 xl:gap-5">
                            {pontosEnfase.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-white/10 bg-slate-900/70 px-5 py-3 text-base leading-7 xl:px-6 xl:py-3.5 xl:text-[1.03rem]"
                                >
                                    ✓ {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:gap-7">
                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-xl md:p-8 xl:p-9">
                            <h3 className="text-[15px] font-semibold uppercase tracking-[0.22em] text-cyan-300 xl:text-base">
                                Formação e experiência
                            </h3>
                            <ul className="mt-5 space-y-4 text-base leading-7 text-slate-300">
                                {credenciais.map((item) => (
                                    <li
                                        key={item}
                                        className="rounded-2xl border border-white/10 bg-slate-900/50 px-5 py-4 text-base leading-7 xl:text-[1.03rem] xl:leading-8"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-xl md:p-8 xl:p-9">
                            <h3 className="text-[15px] font-semibold uppercase tracking-[0.22em] text-cyan-300 xl:text-base">
                                APECOF
                            </h3>
                            <div className="mt-5 flex flex-col items-center rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-6 text-center xl:p-7">
                                <div className="relative h-36 w-36 overflow-hidden rounded-full border border-white/10 bg-slate-950 xl:h-40 xl:w-40">
                                    <Image
                                        src="/apecof.jpeg"
                                        alt="APECOF"
                                        fill
                                        className="object-contain p-3"
                                        sizes="160px"
                                    />
                                </div>
                                <p className="mt-4 text-[1.35rem] font-semibold text-white xl:text-[1.45rem]">
                                    APECOF
                                </p>
                                <p className="mt-2 max-w-md text-[1.05rem] leading-8 text-slate-300 xl:text-[1.1rem] xl:leading-9">
                                    Associação Nacional dos Peritos em Computação Forense,
                                    apresentada no site como referência institucional de vinculação
                                    profissional.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contato" className="pb-18 pt-10 md:pb-20">
                <div className="mx-auto max-w-[1480px] px-8 xl:px-10">
                    <h2 className="text-center text-4xl font-bold text-white md:text-[3rem] xl:text-[3.2rem]">
                        Contato
                    </h2>

                    <div className="mt-9 grid gap-6 md:grid-cols-3 xl:gap-7">
                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-xl md:p-8 xl:p-9">
                            <h3 className="text-[2rem] font-semibold text-cyan-300 xl:text-[2.1rem]">
                                Base profissional
                            </h3>
                            <p className="mt-5 text-[1.06rem] leading-8 text-slate-300 xl:text-[1.12rem] xl:leading-9">
                                {perfil.cidade}
                                <br />
                                Contato profissional para informações institucionais, acadêmicas
                                e técnicas.
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-xl md:p-8 xl:p-9">
                            <h3 className="text-[2rem] font-semibold text-cyan-300 xl:text-[2.1rem]">
                                WhatsApp
                            </h3>
                            <p className="mt-5 text-[1.06rem] leading-8 text-slate-300 xl:text-[1.12rem] xl:leading-9">
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-white transition hover:text-cyan-300"
                                >
                                    {perfil.whatsappExibicao}
                                </a>
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-xl md:p-8 xl:p-9">
                            <h3 className="text-[2rem] font-semibold text-cyan-300 xl:text-[2.1rem]">
                                E-mail
                            </h3>
                            <p className="mt-5 break-all text-[1.06rem] leading-8 text-slate-300 xl:text-[1.12rem] xl:leading-9">
                                <a
                                    href={`mailto:${perfil.email}`}
                                    className="font-semibold text-white transition hover:text-cyan-300"
                                >
                                    {perfil.email}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/10 py-7 text-center text-[15px] text-slate-400 xl:text-base">
                © 2026 Marco Aurélio Pereira Barbosa • Perícia Digital e Tecnologia
                Forense
            </footer>
        </main>
    );
}