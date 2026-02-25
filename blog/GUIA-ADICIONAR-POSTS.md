# 📝 GUIA: COMO ADICIONAR POSTS NO BLOG

## ✅ PROBLEMA RESOLVIDO

O post agora aparece na página principal do blog!

**Causa do problema:** 
- Em ambiente local (file://), o JavaScript não consegue fazer fetch dos arquivos HTML por restrições de CORS
- Solução: Posts são carregados direto no código para ambiente local

---

## 🎯 COMO FUNCIONA AGORA

### **Ambiente LOCAL (file://)**
Posts são **hardcoded** no JavaScript para evitar problemas de CORS:

```javascript
// Em blog/assets/js/blog-index.js
allPosts = [
    {
        title: '5 Signs You Need Window Replacement',
        excerpt: 'Learn the top 5 signs...',
        image: '../arquivos/serviços fotos/Window Installation/window.webp',
        category: 'Home Improvement',
        author: 'Tigersaut Team',
        date: '2025-02-25',
        url: 'posts/5-signs-you-need-window-replacement.html'
    }
];
```

### **Ambiente PRODUÇÃO (https://)**
Posts são carregados automaticamente via GitHub API.

---

## 📝 COMO ADICIONAR UM NOVO POST

### **Método 1: Manual (Para Desenvolvimento Local)**

#### **Passo 1:** Criar o arquivo HTML do post
Copie o template de `posts/5-signs-you-need-window-replacement.html` e adapte.

#### **Passo 2:** Adicionar meta tags importantes
```html
<meta name="description" content="Descrição do post">
<meta name="category" content="Nome da Categoria">
<meta name="author" content="Autor">
<meta name="publish-date" content="2025-02-25">
<meta property="og:image" content="caminho/para/imagem.webp">
```

#### **Passo 3:** Adicionar no JavaScript
Edite: `blog/assets/js/blog-index.js`

Encontre esta seção:
```javascript
if (isLocal) {
    allPosts = [
        {
            title: '5 Signs You Need Window Replacement',
            // ... dados existentes
        }
    ];
```

Adicione o novo post:
```javascript
if (isLocal) {
    allPosts = [
        {
            title: '5 Signs You Need Window Replacement',
            excerpt: 'Learn the top 5 signs...',
            image: '../arquivos/serviços fotos/Window Installation/window.webp',
            category: 'Home Improvement',
            author: 'Tigersaut Team',
            date: '2025-02-25',
            url: 'posts/5-signs-you-need-window-replacement.html'
        },
        {
            title: 'NOVO POST: Título Aqui',
            excerpt: 'Descrição curta do novo post...',
            image: '../images/novo-post.webp',
            category: 'Categoria',
            author: 'Tigersaut Team',
            date: '2025-02-26',
            url: 'posts/nome-do-arquivo.html'
        }
    ];
```

#### **Passo 4:** Atualizar fallback (opcional)
Na mesma função `getExamplePosts()`, adicione o post também.

---

### **Método 2: Usando postin.html (Recomendado)**

#### **Passo 1:** Acesse o criador de posts
Abra: `blog/postin.html`

#### **Passo 2:** Configure GitHub (uma vez)
1. Clique em "⚙️ Configurar GitHub"
2. Insira seu **GitHub Token**
3. Nome do repositório
4. Branch (main)

#### **Passo 3:** Preencha o formulário
- Título, categoria, autor
- Imagem de capa
- Conteúdo
- SEO

#### **Passo 4:** Publique
1. Clique "👁️ Visualizar Preview"
2. Clique "🚀 Publicar Post"
3. Post é enviado automaticamente para GitHub

#### **Passo 5:** Adicione no JavaScript local
Copie os dados do post e adicione manualmente no `blog-index.js` (para testar localmente).

---

## 🎨 ESTRUTURA DE UM POST

```
posts/
└── nome-do-post.html
    ├── Meta tags (description, category, author, date, image)
    ├── Header com navegação Tigersaut
    ├── Conteúdo do post
    │   ├── Título H1
    │   ├── Meta informações (categoria, autor, data)
    │   ├── Introdução
    │   ├── Conteúdo principal (H2, H3, parágrafos)
    │   └── Conclusão
    ├── Footer com links Tigersaut
    └── Scripts
```

---

## 📊 CAMPOS OBRIGATÓRIOS

Para o post aparecer corretamente na listagem:

✅ **title** - Título do post  
✅ **excerpt** - Descrição curta (150 caracteres)  
✅ **image** - Caminho para imagem de capa  
✅ **category** - Categoria do post  
✅ **author** - Nome do autor  
✅ **date** - Data no formato YYYY-MM-DD  
✅ **url** - Caminho relativo do arquivo HTML  

---

## 🔍 CATEGORIAS SUGERIDAS

- **Home Improvement** - Melhorias em casa
- **Windows** - Janelas
- **Roofing** - Telhados
- **Bathroom** - Banheiros
- **Painting** - Pintura
- **Siding** - Revestimento
- **Decks** - Decks
- **Tips & Tricks** - Dicas
- **Before & After** - Antes e Depois

---

## 🖼️ IMAGENS

### **Onde colocar:**
```
NOVO SITE/
├── arquivos/
│   └── serviços fotos/
│       ├── Window Installation/
│       ├── Roofing/
│       ├── Bathroom/
│       └── ... (outras pastas)
└── blog/
    └── assets/
        └── images/
            └── (imagens do blog)
```

### **Formatos recomendados:**
- `.webp` (melhor compressão)
- `.avif` (mais moderno)
- `.jpg` ou `.png` (compatibilidade)

### **Tamanhos recomendados:**
- **Capa do post**: 1200x630px
- **Imagens internas**: 800-1200px largura
- **Thumbnails**: 400x300px

---

## 🧪 TESTAR LOCALMENTE

1. **Adicione o post** no JavaScript (`blog-index.js`)
2. **Abra**: `blog/index.html` no navegador
3. **Verifique**:
   - ✅ Post aparece no grid
   - ✅ Imagem carrega
   - ✅ Título e descrição corretos
   - ✅ Link funciona
   - ✅ Categoria e autor aparecem

---

## 🚀 DEPLOY PARA PRODUÇÃO

### **Opção 1: GitHub Pages**

1. Commit dos arquivos
2. Push para GitHub
3. Posts serão carregados automaticamente via API

### **Opção 2: Servidor Web**

1. Upload dos arquivos via FTP
2. Posts funcionarão com fetch normal

**IMPORTANTE:** Em produção, não precisa adicionar posts manualmente no JavaScript!

---

## ✅ CHECKLIST NOVO POST

- [ ] Arquivo HTML criado em `/posts/`
- [ ] Meta tags adicionadas
- [ ] Conteúdo escrito e formatado
- [ ] Imagens otimizadas
- [ ] Links internos funcionando
- [ ] Adicionado no `blog-index.js` (para local)
- [ ] Testado localmente
- [ ] Pronto para deploy

---

## 🆘 TROUBLESHOOTING

### Post não aparece na listagem?
1. Verifique se foi adicionado no array `allPosts` em `blog-index.js`
2. Confira o caminho do arquivo em `url`
3. Abra Console do navegador (F12) e veja erros

### Imagem não carrega?
1. Verifique o caminho relativo da imagem
2. Use `../arquivos/` para imagens do site
3. Teste a URL da imagem diretamente

### Categoria não aparece no filtro?
- A categoria é adicionada automaticamente ao array de posts

---

**Criado em:** 25 de Fevereiro de 2026  
**Status:** ✅ Posts funcionando localmente e prontos para produção
