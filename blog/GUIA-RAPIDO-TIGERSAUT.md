# 🚀 GUIA RÁPIDO - BLOG TIGERSAUT

## ✅ O QUE FOI IMPLEMENTADO

Sistema de blog completo integrado ao site da Tigersaut, baseado no sistema MediaGrowth com as seguintes adaptações:

### 🎨 Identidade Visual
- ✅ Cores Tigersaut: **#A61602** (vermelho) e **#ffcd35** (amarelo)
- ✅ Logo Tigersaut em todas as páginas do blog
- ✅ Header e Footer integrados com o site principal
- ✅ Link "Blog" adicionado ao menu de navegação em todas as páginas

### 📁 Estrutura Criada
```
NOVO WEBSITE/NOVO SITE/
├── blog/
│   ├── index.html              # Página principal do blog
│   ├── postin.html             # Interface de criação de posts
│   ├── _config.yml             # Configuração Jekyll
│   ├── README.md               # Documentação
│   ├── assets/
│   │   ├── css/
│   │   │   ├── blog-index.css  # Estilos da página principal (cores Tigersaut)
│   │   │   ├── blog-post.css   # Estilos dos posts (cores Tigersaut)
│   │   │   └── form-style.css  # Estilos do formulário (cores Tigersaut)
│   │   └── js/
│   │       ├── blog-index.js   # Lógica da página principal
│   │       └── blog-post.js    # Lógica dos posts
│   ├── posts/
│   │   ├── index.html          # Redirecionamento
│   │   └── 5-signs-you-need-window-replacement.html  # Post de exemplo
│   └── scripts/
│       └── github-api.js       # API GitHub para publicação
```

---

## 🎯 COMO USAR O BLOG

### 1️⃣ ACESSAR O BLOG

**URL Local:** `file:///[caminho]/NOVO WEBSITE/NOVO SITE/blog/index.html`  
**URL Produção:** `https://tigersaut.com/blog`

O link "Blog" foi adicionado no menu de navegação de todas as páginas do site.

### 2️⃣ CRIAR UM NOVO POST

1. Acesse: `/blog/postin.html`
2. Preencha os campos:
   - **Título H1**: Título principal (máx. 60 caracteres)
   - **Categoria**: Escolha entre Guia, Tutorial, Blog, Vlog, Dicas, Novidades
   - **Autor**: Nome do autor
   - **Imagem de Capa**: URL da imagem
   - **Imagens Internas**: Até 3 imagens (distribuídas automaticamente)
   - **Conteúdo**: Texto do post (use ## para subtítulos)
   - **SEO**: Meta description, keywords, etc.

3. **Preview**: Clique em "👁️ Visualizar Preview" para revisar
4. **Publicar**: Clique em "🚀 Publicar Post"

### 3️⃣ CONFIGURAR GITHUB (Para Publicação)

**Necessário para publicar posts automaticamente:**

1. Clique em "⚙️ Configurar GitHub" no `postin.html`
2. Preencha:
   - **GitHub Token**: Token de acesso pessoal
     - Crie em: https://github.com/settings/tokens
     - Permissões necessárias: `repo`
   - **Repositório**: `[usuario]/[nome-do-repo]`
   - **Branch**: `main`

---

## 🎨 CORES PERSONALIZADAS TIGERSAUT

Todas as cores foram atualizadas nos arquivos CSS:

### Antes (MediaGrowth):
```css
--orange: #EB7A3D;
```

### Depois (Tigersaut):
```css
--primary: #A61602;  /* Vermelho Tigersaut */
--accent: #ffcd35;   /* Amarelo Tigersaut */
```

### Onde foram aplicadas:
- ✅ `blog-index.css`: Badges, botões, hover states, spinners
- ✅ `blog-post.css`: Links, categorias, highlights, CTAs
- ✅ `form-style.css`: Botões, inputs focus, progress bars

---

## 📊 FUNCIONALIDADES MANTIDAS

### Do Sistema MediaGrowth:
- ✅ **Auto-preenchimento Inteligente**: Cole texto formatado da IA
- ✅ **Preview em Tempo Real**: Visualize antes de publicar
- ✅ **Sistema de Imagens**: 3 layouts automáticos (full/left/left)
- ✅ **Formulário de Leads**: Captura de contatos com webhook
- ✅ **Posts Relacionados**: Carregamento dinâmico
- ✅ **SEO Completo**: Meta tags, Schema.org, Open Graph
- ✅ **Busca e Filtros**: Pesquisa por categoria e termo
- ✅ **Design Responsivo**: Mobile-first

---

## 🔧 PRÓXIMOS PASSOS

### Para Usar em Produção:

1. **Criar Repositório GitHub**
   ```bash
   gh repo create tigersaut-blog --public
   ```

2. **Subir Arquivos**
   ```bash
   cd "NOVO WEBSITE/NOVO SITE/blog"
   git init
   git add .
   git commit -m "Initial blog setup"
   git remote add origin https://github.com/[usuario]/tigersaut-blog.git
   git push -u origin main
   ```

3. **Ativar GitHub Pages**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `/ (root)`
   - Save

4. **Aguardar Deploy** (1-3 minutos)
   - URL: `https://[usuario].github.io/tigersaut-blog/`

5. **Domínio Customizado** (Opcional)
   - Crie arquivo `CNAME` com: `blog.tigersaut.com`
   - Configure DNS: CNAME → `[usuario].github.io`

---

## 📝 EXEMPLO DE POST

Um post de exemplo foi criado em:
`/blog/posts/5-signs-you-need-window-replacement.html`

Este post demonstra:
- Header e footer integrados com Tigersaut
- Cores personalizadas
- Estrutura de conteúdo
- CTAs e links para serviços
- Tags e compartilhamento social

---

## 🆘 TROUBLESHOOTING

### Cores não aparecem corretas?
- Verifique cache do navegador (Ctrl+Shift+R)
- Confirme que os arquivos CSS estão em `/blog/assets/css/`

### JavaScript não funciona?
- Abra Console do navegador (F12)
- Verifique se os arquivos .js estão carregando
- Paths: `/blog/assets/js/` e `/blog/scripts/`

### Posts não aparecem na página principal?
- Certifique-se que os posts estão em `/blog/posts/`
- Arquivos devem ter extensão `.html`
- Verifique se `blog-index.js` está carregando

### GitHub Pages não funciona?
- Verifique se está ativado em Settings → Pages
- Branch deve ser `main`
- Aguarde 1-3 minutos para propagação

---

## 📚 DOCUMENTAÇÃO COMPLETA

Para documentação detalhada do sistema original, consulte:
```
/BLOG/🟧REPLICAR PARA_OUTRO_CLIENTE/
├── DOCUMENTACAO-COMPLETA.md       # Documentação completa
├── GUIA-REPLICACAO-CLIENTE.md     # Guia de replicação
├── FAQ-TROUBLESHOOTING.md         # Perguntas frequentes
└── FLUXOGRAMA-SISTEMA.md          # Fluxograma do sistema
```

---

## ✨ RESUMO DO QUE FOI FEITO

1. ✅ Estrutura completa do blog criada em `/blog/`
2. ✅ CSS adaptado com cores Tigersaut (#A61602, #ffcd35)
3. ✅ Header/Footer integrados com site principal
4. ✅ Link "Blog" adicionado ao menu de todas as páginas
5. ✅ JavaScript copiado (funcionalidade mantida 100%)
6. ✅ Post de exemplo criado
7. ✅ Configuração Jekyll (_config.yml)
8. ✅ README.md e documentação

**O blog está pronto para uso!** 🎉

---

**Desenvolvido por:** MediaGrowth System  
**Adaptado para:** Tigersaut General Contractors  
**Data:** 25 de Fevereiro de 2026
