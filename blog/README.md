# Tigersaut Blog

Sistema de blog integrado ao site da Tigersaut General Contractors.

## 📁 Estrutura

```
blog/
├── index.html          # Página principal - lista de posts
├── postin.html         # Interface de criação de posts
├── _config.yml         # Configuração Jekyll (URLs limpos)
├── assets/
│   ├── css/           # Estilos adaptados com cores Tigersaut
│   ├── js/            # Scripts funcionais do blog
│   └── images/        # Imagens do blog
├── posts/             # Posts publicados (.html)
└── scripts/           # Scripts auxiliares (GitHub API)
```

## 🎨 Cores do Blog

- **Primary**: #A61602 (Vermelho Tigersaut)
- **Accent**: #ffcd35 (Amarelo Tigersaut)
- **Background**: #000000 (Preto)
- **Text**: #FFFFFF (Branco)

## 📝 Como Criar um Post

1. Acesse: `/blog/postin.html`
2. Preencha o formulário com:
   - Título, categoria, autor
   - Imagem de capa
   - Até 3 imagens internas (distribuídas automaticamente)
   - Conteúdo do post
   - Configurações de SEO
3. Clique em "👁️ Visualizar Preview" para revisar
4. Clique em "🚀 Publicar Post" para enviar ao GitHub

## 🔧 Configuração GitHub

Para publicar posts, você precisa:

1. **GitHub Token** (Personal Access Token)
   - Acesse: https://github.com/settings/tokens
   - Gere um token com permissões `repo`
   
2. **Repositório**
   - Nome: `[usuario]/[repositorio]`
   - Branch: `main`

3. Configure em `postin.html` → "⚙️ Configurar GitHub"

## 🌐 URLs

- **Blog Index**: `https://tigersaut.com/blog`
- **Criar Post**: `https://tigersaut.com/blog/postin.html`
- **Posts**: `https://tigersaut.com/blog/posts/[slug-do-post]`

## 📚 Documentação Completa

Para guia completo de replicação e funcionalidades, consulte:
`/BLOG/🟧REPLICAR PARA_OUTRO_CLIENTE/DOCUMENTACAO-COMPLETA.md`

## ✨ Features

- ✅ Interface visual intuitiva
- ✅ Preview em tempo real
- ✅ Publicação automatizada no GitHub
- ✅ Sistema de imagens inteligente (3 layouts)
- ✅ Formulário de captura de leads
- ✅ Posts relacionados dinâmicos
- ✅ SEO completo (Meta tags, Schema.org)
- ✅ Design responsivo
- ✅ Header & Footer integrados com site Tigersaut

## 🚀 Deploy

O blog funciona através do GitHub Pages. Após publicar um post:
1. Aguarde 1-3 minutos para propagação
2. Acesse a URL do post
3. O post aparece automaticamente na página principal

---

**Desenvolvido com base no sistema MediaGrowth**  
**Adaptado para Tigersaut General Contractors**
