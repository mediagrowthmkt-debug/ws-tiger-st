# 📤 SISTEMA DE UPLOAD DE IMAGENS PARA GITHUB

## 🎯 FUNCIONALIDADE IMPLEMENTADA

Adicionado sistema de upload direto de imagens para o repositório GitHub, eliminando a necessidade de hospedar imagens externamente.

## ✨ RECURSOS

### 1. **Upload da Imagem de Capa**
- Botão "📤 Upload" ao lado do campo URL
- Faz upload para `arquivos/blog/` no GitHub
- Preenche automaticamente o campo de URL

### 2. **Upload de Imagens Internas**
- Cada imagem interna tem seu próprio botão de upload
- Suporta múltiplas imagens (mínimo 2)
- Adicionar quantas imagens precisar com "+ Adicionar Imagem"

### 3. **Validações Automáticas**
- **Tipos aceitos**: JPG, JPEG, PNG, WEBP, AVIF, GIF
- **Tamanho máximo**: 5MB por imagem
- **Nomeação**: Timestamp + nome original (evita conflitos)

### 4. **Feedback Visual**
- ⏳ Loading durante upload
- ✅ Sucesso com tamanho do arquivo
- ❌ Mensagem de erro detalhada
- Status em tempo real abaixo de cada campo

## 🔧 COMO USAR

### Passo 1: Configurar GitHub Token

1. Clique em **"⚙️ Configurar GitHub"** no topo do formulário
2. Crie um Personal Access Token em:
   - https://github.com/settings/tokens
3. Marque a permissão: **✓ repo** (full control)
4. Cole o token no modal e clique em "💾 Salvar Token"
5. Teste a conexão com "🧪 Testar Conexão"

### Passo 2: Upload de Imagens

**Imagem de Capa:**
1. Localize o campo "URL da Imagem de Capa"
2. Clique no botão **"📤 Upload"**
3. Selecione sua imagem (max 5MB)
4. Aguarde o upload (⏳ Uploading...)
5. URL é preenchida automaticamente ✅

**Imagens Internas:**
1. Role até "Imagens Internas"
2. Clique em **"📤 Upload"** na imagem desejada
3. Selecione o arquivo
4. URL é preenchida automaticamente
5. Preencha o "Alt Text" manualmente
6. Adicione mais imagens com "+ Adicionar Imagem"

## 📂 ESTRUTURA NO GITHUB

As imagens são salvas em:
```
seu-repositorio/
└── arquivos/
    └── blog/
        ├── 1708888800000-minha-imagem.jpg
        ├── 1708888801000-outra-imagem.webp
        └── 1708888802000-terceira-imagem.png
```

**Formato do nome**: `{timestamp}-{nome-original}`
- Exemplo: `1708888800000-instalacao-janelas.jpg`

## 🔗 URL GERADA

As imagens ficam acessíveis via:
```
https://raw.githubusercontent.com/{owner}/{repo}/main/arquivos/blog/{filename}
```

**Exemplo real**:
```
https://raw.githubusercontent.com/mediagrowthmkt-debug/ws-tiger-st/main/arquivos/blog/1708888800000-window.jpg
```

## 🎨 STATUS VISUAIS

### Loading (Azul)
```
⏳ Uploading... 
📤 Uploading minha-imagem.jpg...
```

### Sucesso (Verde)
```
✅ Sucesso
✅ Upload completo! 234.5KB
```

### Erro (Vermelho)
```
❌ Erro: Arquivo muito grande. Tamanho máximo: 5MB
❌ Erro: GitHub token não configurado
❌ Erro: GitHub API error: Bad credentials
```

## ⚠️ VALIDAÇÕES

### Tipos de Arquivo Aceitos
✅ JPEG / JPG  
✅ PNG  
✅ WEBP  
✅ AVIF  
✅ GIF  
❌ BMP, TIFF, SVG (não aceitos)

### Tamanho
- **Máximo**: 5MB (5.242.880 bytes)
- **Recomendado**: 
  - Capa: ~500KB (1200x630px)
  - Internas: ~200-300KB (800x500px)

### Nomeação
- Nome original é sanitizado (remove caracteres especiais)
- Adiciona timestamp para evitar conflitos
- Converte para lowercase

## 🔒 SEGURANÇA

1. **Token no localStorage**: Salvo apenas no navegador do usuário
2. **Validação no cliente**: Antes de enviar para GitHub
3. **HTTPS obrigatório**: Todas as requisições via API GitHub
4. **Permissões mínimas**: Token precisa apenas de `repo`

## 🐛 TROUBLESHOOTING

### "GitHub token não configurado"
**Solução**: Configure o token em "⚙️ Configurar GitHub"

### "GitHub API error: Bad credentials"
**Solução**: Token inválido ou expirado. Gere um novo token

### "Arquivo muito grande"
**Solução**: Comprima a imagem antes (use TinyPNG, Squoosh, etc.)

### "Tipo de arquivo inválido"
**Solução**: Converta para JPG, PNG ou WEBP

### Upload trava em "⏳ Uploading..."
**Solução**: 
1. Verifique conexão internet
2. Teste conexão GitHub no modal de configuração
3. Verifique permissões do token

## 📊 ARQUIVOS MODIFICADOS

```
blog/
├── postin.html (adicionado botões e scripts de upload)
└── scripts/
    └── github-api.js (adicionada função uploadImageToGitHub)
```

## 🚀 PRÓXIMOS PASSOS

Após fazer upload das imagens:
1. URLs são preenchidas automaticamente
2. Continue preenchendo o resto do formulário
3. Clique em "👁️ Pré-visualizar" para ver o resultado
4. Clique em "✨ Gerar Post" para publicar

As imagens já estarão no GitHub e serão carregadas diretamente do repositório!

---

**Status**: ✅ Implementado e Funcional  
**Data**: 25/02/2026  
**Compatível**: Chrome, Firefox, Safari, Edge
