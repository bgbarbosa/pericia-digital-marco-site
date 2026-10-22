# Marca Marco Barbosa — padrão oficial

Decisão do titular nesta solicitação, em 21/10/2026: a imagem fornecida com o monograma **MB** e o nome **MARCO BARBOSA** é a marca oficial de sua identidade profissional individual.

## Regra de uso a partir desta versão

- Utilizar esta marca nos novos materiais da identidade profissional Marco Barbosa: cabeçalho do site, apresentação do perfil, cartão digital, rodapé e imagens de compartilhamento quando houver espaço adequado.
- Preservar proporções, monograma, grafia, cores e acabamento metálico com iluminação ciano. O original já tem representação tridimensional; não redesenhar nem acrescentar extrusão às letras.
- Permitir conversão de formato e otimização para a web, sem redesenho, mudança de cores ou deformação. Profundidade, luz e sombras discretas podem ser aplicadas ao contêiner no site, mantendo legibilidade e movimento reduzido.
- A marca identifica **Marco Barbosa**. Não substitui o símbolo ou a identidade do **Dama Universe**, nem constitui logotipo de órgão público, associação profissional ou pessoa jurídica.
- No site, a marca é um link para **/perfil**, com nome acessível “Marco Barbosa — abrir perfil e currículo”. A página reúne a apresentação ampliada e o download do currículo em PDF.
- Não substituir o retrato profissional, QR Code, contatos ou conteúdo do cartão pela marca.
- A versão horizontal completa não deve ser espremida em avatares ou favicons pequenos. Os ícones anteriores permanecem nesta etapa; uma versão compacta específica deverá ser tratada como derivação a conferir com o titular.
- Não declarar registro de marca, exclusividade jurídica, autoria de design ou direitos de terceiros a partir desta aprovação de uso.

## Matriz e derivado

- Matriz preservada: `public/marca/marco-barbosa-logo-oficial.jpg`, 1600 × 533 px, fundo escuro, sem transparência.
- SHA-256 da matriz: `b7f80c1eff5e41c203d32673963d6d3e0abae65d184512b46281b5ec2da8c4a6`.
- Derivado web: `public/marca/marco-barbosa-logo.webp`, mesmas dimensões, conversão WebP qualidade 90, sem recorte, 43.200 bytes.
- No cabeçalho, a moldura CSS reduz apenas margens de fundo; o monograma e o nome permanecem visíveis. Nas demais aplicações, a imagem completa é exibida.
- Fonte recebida: `codex-clipboard-bbfa6eac-5f3a-4246-a664-a0d96590f6ab.jpg`. O arquivo recebido não foi alterado.

### Renderização da marca compartilhada — 21/10/2026

- `BrandLogo` utiliza a matriz JPEG existente com `unoptimized`, preservando seus bytes e evitando a sequência JPEG → WebP → otimização de qualidade 75. O derivado WebP permanece preservado para os usos existentes.
- A configuração anterior declarava `sizes="240px"`, embora a imagem no cabeçalho tivesse 290 px no CSS (260 px abaixo de 375 px de viewport). Em densidade 1x o navegador selecionava um recurso de 256 px, ampliado para 290 px. Em 2x selecionava 640 px; havia pixels suficientes, mas a recompressão ainda afetava bordas finas.
- A entrega direta usa os 1600 × 533 px da matriz, sem `srcset` ou `sizes` artificiais. As dimensões CSS, proporções e moldura existentes permanecem, incluindo apenas o recorte das margens de fundo no cabeçalho. Não são aplicados filtros de nitidez, redesenho ou ampliação da matriz.
- O custo é a transferência da matriz de 90.594 bytes, reutilizada por cabeçalho, cartão e rodapé. A imagem continua raster e conserva o brilho artístico original; a alteração reduz perdas da entrega, sem recuperar detalhes inexistentes na fonte.

## Arquivo de referência no Drive

Conta proprietária conferida: `marcobarbosa@damauniverse.com.br`.

Pasta: [Marca Marco Barbosa — Oficial](https://drive.google.com/drive/folders/1V_6vgZ4ghEZMxkK7ClXEy2h2ncatjVyF).

A pasta foi criada na raiz do Drive profissional, com permissão apenas do proprietário conferida na criação. A pasta antiga “03 - Sites e Presença Digital” permitia edição por qualquer pessoa com o link; suas permissões não foram alteradas. A matriz fica separada para evitar edição compartilhada acidental. Este documento e os arquivos efetivamente carregados devem ser conferidos no relatório de execução.

Esta regra está registrada neste repositório e na pasta de referência do Drive. Não significa alteração automática de outros sites, chats, materiais antigos ou fontes sincronizadas.

## Conteúdo do perfil

- Fonte principal: currículo entregue pelo titular, edição outubro/2026, duas páginas; texto extraído e páginas renderizadas para conferência visual.
- PDF disponibilizado como cópia idêntica em `public/documentos/curriculo-marco-barbosa-2026-10.pdf`.
- SHA-256 do PDF: `4eddea9ad419793b59f7befcaaae3bb6576d6f6b1222007d75a0e39f6a544182`.
- Complementos: posicionamento, modalidades, associação APECOF, comunidade AI Brasil e dois projetos selecionados já presentes nos dados do site. A filiação e os cursos não foram certificados independentemente nesta tarefa; são informações fornecidas pelo titular e existentes em suas fontes.
- Orientação editorial consultada: `DU-EDITORIAL-001`, versão 1.0, fonte sincronizada somente para leitura.
- Não foram acrescentados clientes, resultados, prêmios, cargos, homologação institucional ou grau de proficiência não demonstrados.
- UTFPR permanece identificada como **em andamento**. Curso de Formação Policial está separado de graduação e especializações.
- A produção bibliográfica mantém o enquadramento informado: **Outras produções bibliográficas** no Lattes, sem atribuição de DOI ou revisão por pares.
- Dama Gestor de RH continua **projeto sob consulta**; os únicos destaques de ferramentas continuam sendo ele e Especialista em Escrita e Revisão.

## Escopo operacional

Implementação e revisão locais. Esta solicitação não contém autorização específica de publicação desta nova identidade. Não realizar staging, commit, push ou deploy por causa deste guia.
