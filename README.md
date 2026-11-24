# Rams Select · Site cinematográfico

Site estático da Rams Select: a rolagem "toca" um vídeo da fachada até o balcão, seções com imagens fundidas ao fundo, montador de kit de churrasco / tábua de frios, botão de WhatsApp e Instagram, formulário de contato por e-mail.

## Estrutura

```
site/                 ← o site pronto para publicar (estático, sem build)
  index.html          ← conteúdo e seções
  estilo.css          ← cores, fontes e layout (tokens no topo)
  app.js              ← rolagem do vídeo, revelar, WhatsApp, formulário
  montar.js           ← seção "Monte aqui" (catálogo, porções e ícones)
  config.js           ← nome, WhatsApp, e-mail e frames
  assets/
    logo.png          ← logo com fundo transparente
    insta-avatar.png  ← avatar do botão do Instagram
    img/              ← imagens das seções (WebP)
    frames/           ← vídeo fatiado em 160 quadros (desktop e mobile)
fonte/                ← material de origem: vídeo MP4, quadro-chave, logo original
brief.json            ← briefing do projeto (identidade, lojas, contatos)
```

## Rodar localmente

Dois cliques em **`RODAR-LOCAL.bat`**: ele sobe um servidor em http://localhost:4173 (usa só o PowerShell do Windows, nada para instalar) e abre o navegador. Deixe a janela preta aberta enquanto testa; a cada mudança nos arquivos, aperte F5. Para parar, feche a janela.

Alternativa sem servidor: abrir `site/index.html` direto no navegador (`ABRIR-SITE.bat`).

## Editar

- **Textos e seções**: `site/index.html`.
- **Cores e fontes**: tokens `--fundo`, `--acento`, `--fonte-titulo` no topo de `site/estilo.css`.
- **Itens do "Monte aqui"**, porções por pessoa e dicas: objeto `CATALOGO` em `site/montar.js`.
- **WhatsApp, e-mail e Instagram**: `site/config.js` e o link `.insta` em `index.html`.
- **Cardápio do restaurante**: lista `.cardapio` em `index.html`.

## Formulário de contato

Usa o FormSubmit: no primeiro envio, chega um e-mail de ativação em `ramsselect1501@gmail.com`; é preciso clicar em "Activate" uma vez. Alternativa: criar uma chave em web3forms.com e colar em `web3formsChave` no `config.js`.

## Publicar

É um site estático: a pasta `site` pode ir para Vercel, Netlify ou qualquer hospedagem. Na Vercel, importe o repositório e defina **Root Directory = `site`** (framework: Other).
