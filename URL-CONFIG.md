# Configuração de URLs sem .html

## O que foi feito

As URLs do site foram configuradas para **não exibir a extensão .html** na barra de endereços. 

### Exemplos:
- ✅ `https://seusite.com/windows` 
- ✅ `https://seusite.com/contact`
- ✅ `https://seusite.com/gallery`
- ❌ ~~`https://seusite.com/windows.html`~~

## Como funciona

### 1. Arquivo .htaccess
Foi criado um arquivo `.htaccess` na raiz do site com regras de reescrita de URL:

```apache
RewriteEngine On

# Remove .html extension from URLs
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}\.html -f
RewriteRule ^([^/]+)$ $1.html [L]

# Redirect old .html URLs to clean URLs (301 permanent redirect)
RewriteCond %{THE_REQUEST} ^[A-Z]{3,9}\ /([^.]+)\.html\ HTTP
RewriteRule ^([^.]+)\.html$ /$1 [R=301,L]
```

**O que essas regras fazem:**
- Quando alguém acessa `/windows`, o servidor internamente carrega `windows.html`
- Se alguém acessar `/windows.html`, será redirecionado automaticamente para `/windows`
- Os arquivos HTML continuam com a extensão `.html` no servidor

### 2. Links internos atualizados
Todos os links internos foram atualizados para usar as URLs sem extensão:

**Antes:**
```html
<a href="windows.html">Window Installation</a>
<a href="contact.html">Contact</a>
```

**Depois:**
```html
<a href="/windows">Window Installation</a>
<a href="/contact">Contact</a>
```

## Estrutura de arquivos

Os arquivos físicos **continuam com a extensão .html**:
```
/
├── .htaccess          ← Configuração do servidor
├── index.html         ← Acessível via / ou /index
├── windows.html       ← Acessível via /windows
├── roofing.html       ← Acessível via /roofing
├── bathroom.html      ← Acessível via /bathroom
├── painting.html      ← Acessível via /painting
├── siding.html        ← Acessível via /siding
├── decks.html         ← Acessível via /decks
├── gallery.html       ← Acessível via /gallery
├── contact.html       ← Acessível via /contact
├── privacy-policy.html       ← Acessível via /privacy-policy
└── terms-and-conditions.html ← Acessível via /terms-and-conditions
```

## Requisitos

### Servidor Apache
✅ Este método funciona automaticamente em servidores Apache com mod_rewrite ativado.

### Servidor Nginx
❌ Se você usa Nginx, precisará adicionar configurações no arquivo de configuração do site:

```nginx
location / {
    try_files $uri $uri.html $uri/ =404;
}

# Redirect .html to clean URLs
if ($request_uri ~ ^/(.*)\.html$) {
    return 301 /$1;
}
```

### Servidor local (para testes)
Para testar localmente, você pode usar:

**PHP Built-in Server:**
```bash
php -S localhost:8000
```

**Python HTTP Server (com mod_rewrite):**
Instale o módulo: `pip install twisted`
```bash
python -m twisted web --path="." --port=8000
```

**Live Server (VS Code):**
A extensão Live Server do VS Code pode não processar o .htaccess corretamente.
Para testes locais, use um servidor Apache local (XAMPP, MAMP, etc.)

## Verificação

Para verificar se está funcionando:

1. Acesse `https://seusite.com/windows` - deve carregar a página
2. Acesse `https://seusite.com/windows.html` - deve redirecionar para `/windows`
3. Verifique se a URL na barra de endereços não mostra `.html`

## SEO e Benefícios

✅ **URLs mais limpas e profissionais**
✅ **Melhor experiência do usuário**
✅ **Flexibilidade futura** (pode mudar de .html para .php sem quebrar links)
✅ **Redirecionamento 301** preserva SEO se alguém tiver links antigos
✅ **Compatível com Google Analytics e ferramentas de rastreamento**

## Manutenção

### Adicionar nova página
1. Crie o arquivo com extensão: `nova-pagina.html`
2. Use links sem extensão: `<a href="/nova-pagina">Nova Página</a>`
3. O .htaccess funcionará automaticamente

### Não é necessário:
- ❌ Atualizar o .htaccess para cada nova página
- ❌ Criar arquivos sem extensão
- ❌ Configurações adicionais

## Troubleshooting

**Erro 404 ao acessar páginas:**
- Verifique se o mod_rewrite está ativado no Apache
- Verifique se o .htaccess está na raiz do site
- Verifique se o AllowOverride está configurado corretamente no Apache

**Redirecionamento não funciona:**
- Limpe o cache do navegador
- Verifique se o .htaccess não tem erros de sintaxe
- Teste em modo anônimo/privado do navegador

**Erro 500:**
- Revise a sintaxe do .htaccess
- Verifique os logs de erro do servidor
- Confirme que o mod_rewrite está instalado
