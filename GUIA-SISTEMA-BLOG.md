# 📝 Guia do Sistema de Blog - Tigersaut

## ✅ Sistema Configurado e Funcional!

O sistema de blog está totalmente configurado e pronto para uso. Aqui está como funciona:

---

## 🔄 Fluxo de Trabalho

### 1. **Acessar o Editor de Posts**
   - Abra: `/blog/postin.html`
   - Este é o único arquivo de criação de posts que você precisa usar

### 2. **Criar um Novo Post**
   1. Preencha o formulário com todas as informações do post
   2. Use o **Bloco 0** para auto-preenchimento com IA (opcional)
   3. Adicione imagens, links internos e externos
   4. Clique em **"✨ Gerar Post"**

### 3. **Publicação Automática**
   
   **🔐 Configurar GitHub Token (primeira vez apenas):**
   - Clique em **"⚙️ Configurar GitHub"**
   - Crie um Personal Access Token em: https://github.com/settings/tokens
   - Permissões necessárias: `repo` (full control)
   - Cole o token e salve
   
   **✅ Após configurar o token:**
   - Os posts serão publicados automaticamente em `blog/posts/`
   - Não é necessário fazer download manual
   - O post aparecerá no blog em ~1 minuto

### 4. **Visualizar os Posts**
   - Site principal: clique em "Blog" no menu
   - Ou acesse diretamente: `/blog/index.html`
   - Todos os posts de `/blog/posts/` serão carregados automaticamente

---

## 📁 Estrutura de Arquivos

```
/blog/
├── postin.html              ← Editor de posts (ÚNICO arquivo de criação)
├── index.html               ← Página principal do blog (lista todos os posts)
├── posts/                   ← Posts publicados
│   ├── slug-do-post.html
│   └── outro-post.html
├── assets/
│   ├── css/
│   │   ├── blog-index.css   ← Estilos da página principal do blog
│   │   ├── blog-post.css    ← Estilos dos posts individuais
│   │   └── form-style.css   ← Estilos do editor
│   └── js/
│       ├── blog-index.js    ← Carrega posts do GitHub
│       ├── blog-post.js     ← Funcionalidades dos posts
│       └── form-script.js   ← Lógica do editor
└── scripts/
    └── github-api.js        ← Integração com GitHub API
```

---

## 🎨 Template dos Posts

Cada post publicado inclui automaticamente:

### ✅ Header do Site
- Logo do Tigersaut
- Menu de navegação completo
- Botão de contato
- Telefone
- Menu mobile funcional

### ✅ Footer do Site
- Logo do Tigersaut
- Links para serviços
- Informações de contato
- Redes sociais
- Copyright

### ✅ SEO Otimizado
- Meta tags (title, description, keywords)
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Schema.org (JSON-LD)
- Canonical URLs

### ✅ Design Responsivo
- Mobile-first
- Imagens otimizadas
- Layout adaptativo
- Cores do site Tigersaut (#A61602, #ffcd35)

---

## 🚀 Como Publicar um Post

### Opção 1: Com Token GitHub (Recomendado)
```
1. Configurar token (uma vez)
2. Preencher formulário em postin.html
3. Clicar em "✨ Gerar Post"
4. Aguardar 1 minuto
5. Post estará online automaticamente!
```

### Opção 2: Sem Token (Manual)
```
1. Preencher formulário em postin.html
2. Clicar em "✨ Gerar Post"
3. Baixar o arquivo HTML
4. Fazer upload para blog/posts/ no GitHub
5. Fazer commit e push
```

---

## 🔧 Configurações Importantes

### GitHub API
- **Repositório:** `mediagrowthmkt-debug/ws-tiger-st`
- **Branch:** `main`
- **Pasta de posts:** `blog/posts/`
- **Token armazenado:** LocalStorage do navegador

### Carregamento de Posts
O `blog-index.js` carrega automaticamente todos os arquivos `.html` de:
```
https://api.github.com/repos/mediagrowthmkt-debug/ws-tiger-st/contents/blog/posts
```

### Auto-Save
- Todos os campos são salvos automaticamente no LocalStorage
- Os dados são restaurados ao reabrir o editor
- Use "🗑️ Limpar Campos" para remover dados salvos

---

## ✨ Recursos Especiais

### 🖼️ Upload de Imagens
- Clique em "📤 Upload" ao lado dos campos de imagem
- Imagens são enviadas automaticamente para `arquivos/blog/`
- URL é preenchida automaticamente
- Limite: 5MB por imagem

### 🎨 Distribuição de Imagens
- 1ª imagem interna: **Full Width** (destaque)
- 2ª imagem: **Left** (texto flui ao lado)
- 3ª imagem: **Left** (texto flui ao lado)

### 📱 Formulário de Leads
- Opcional: ative campos de nome, email, telefone
- Configure webhook para receber leads
- Design minimalista e responsivo

### 🔗 Posts Relacionados
- Carregados automaticamente da mesma categoria
- Máximo de 3 posts
- Exibidos no final de cada post

---

## 📊 Checklist de Publicação

Antes de publicar um post, verifique:

- [ ] Título otimizado para SEO (50-60 caracteres)
- [ ] Meta description atraente (150-160 caracteres)
- [ ] Palavra-chave principal definida
- [ ] Imagem de capa de alta qualidade
- [ ] Alt text em todas as imagens
- [ ] Links internos para outros conteúdos
- [ ] Links externos com fontes confiáveis
- [ ] Conteúdo revisado (ortografia e gramática)
- [ ] CTA claro na conclusão
- [ ] Categoria correta selecionada
- [ ] Tags relevantes adicionadas

---

## 🐛 Solução de Problemas

### Post não aparece no blog
1. Aguarde 1-2 minutos após publicação
2. Limpe o cache do navegador (Cmd/Ctrl + Shift + R)
3. Verifique se o arquivo está em `blog/posts/`
4. Verifique se o nome do arquivo não contém caracteres especiais

### Token GitHub inválido
1. Acesse: https://github.com/settings/tokens
2. Revogue o token antigo
3. Crie um novo token com permissão `repo`
4. Configure novamente em "⚙️ Configurar GitHub"

### Imagens não carregam
1. Verifique se a URL está correta
2. Use URLs diretas (não Google Drive/Dropbox compartilhados)
3. Teste a URL em uma aba separada
4. Use o botão "📤 Upload" para enviar ao GitHub

### Menu não funciona em mobile
- O script `main.js` já está incluído nos posts
- Limpe o cache do navegador
- Verifique se `../../js/main.js` existe

---

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique este guia primeiro
- Revise os arquivos em `/blog/` para documentação adicional
- Teste em `postin.html` antes de publicar

---

## 🎉 Pronto para Usar!

O sistema está 100% funcional. Basta:
1. Configurar o token GitHub (uma vez)
2. Criar posts em `postin.html`
3. Publicar automaticamente
4. Ver os posts em `blog/index.html`

**Tudo funciona perfeitamente! 🚀**
