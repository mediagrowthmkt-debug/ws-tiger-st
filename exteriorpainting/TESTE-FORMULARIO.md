# 🧪 GUIA DE TESTE - Formulário Exterior Painting

## 📋 Passo a Passo para Testar

### 1️⃣ Abrir o arquivo com um servidor local

O arquivo HTML **PRECISA** ser aberto com um servidor HTTP local, não diretamente pelo navegador (file://).

**Opção A - Python (Recomendado):**
```bash
cd "/Users/bruno/Documents/LPS/CLIENTES/TIGER SAUT/NOVO WEBSITE/NOVO SITE/exteriorpainting"
python3 -m http.server 8000
```

Depois acesse: `http://localhost:8000/index.html`

**Opção B - PHP:**
```bash
cd "/Users/bruno/Documents/LPS/CLIENTES/TIGER SAUT/NOVO WEBSITE/NOVO SITE/exteriorpainting"
php -S localhost:8000
```

Depois acesse: `http://localhost:8000/index.html`

**Opção C - Node.js (http-server):**
```bash
cd "/Users/bruno/Documents/LPS/CLIENTES/TIGER SAUT/NOVO WEBSITE/NOVO SITE/exteriorpainting"
npx http-server -p 8000
```

Depois acesse: `http://localhost:8000/index.html`

---

### 2️⃣ Abrir o Console do Navegador

1. Pressione **F12** (ou **Cmd+Option+I** no Mac)
2. Vá na aba **Console**
3. Mantenha o console aberto durante o teste

---

### 3️⃣ Verificar Inicialização do GHL

Ao carregar a página, você deve ver no console:

```
[LC Tracking] Tracker initialized successfully
[LC Tracking] Tracking ID: tk_9468416754624bdebf72c18a6ff6f9a4
```

✅ **Se ver isso:** GHL está carregado corretamente  
❌ **Se NÃO ver:** Verifique sua conexão com a internet ou AdBlocker

---

### 4️⃣ Preencher o Formulário

Preencha os campos obrigatórios:
- **Name:** João Silva (ou qualquer nome)
- **Phone:** (978) 123-4567
- **Property Address:** 123 Main St, Boston, MA

Campo opcional:
- **Project Details:** Quero pintar a fachada da minha casa

---

### 5️⃣ Clicar em "Get My FREE Estimate →"

Ao clicar, você deve ver no console:

```
[DEBUG] Form submit event triggered
[DEBUG] Form data collected: {name: "João Silva", phone: "(978) 123-4567", ...}
[DEBUG] LCTracker available? true
[DEBUG] LCTracker found, submitting to GHL...
[DEBUG] Calling LCTracker.submitForm()...
[LC Tracking] Form submission detected
[LC Tracking] Form name: exterior_painting_form
[GHL] ✅ Form submitted successfully to GoHighLevel
[DEBUG] Redirecting to thank-you.html...
```

---

### 6️⃣ Verificar Redirecionamento

Após 1-2 segundos, você deve ser redirecionado para `thank-you.html`

---

## 🔍 Problemas Comuns

### ❌ Problema: "LCTracker available? false"

**Causa:** Script do GHL não carregou  
**Soluções:**
1. Verifique sua conexão com a internet
2. Desative AdBlockers (podem bloquear o script)
3. Verifique se o `data-tracking-id` está correto

---

### ❌ Problema: Console mostra erros de CORS

**Causa:** Arquivo aberto diretamente (file://)  
**Solução:** Use um servidor HTTP local (veja passo 1)

---

### ❌ Problema: Formulário não redireciona

**Causa:** JavaScript não está sendo executado  
**Soluções:**
1. Verifique se há erros no console
2. Certifique-se que `js/main.js` está carregando
3. Limpe o cache do navegador (Cmd+Shift+R no Mac / Ctrl+Shift+R no Windows)

---

### ❌ Problema: Dados não chegam no GHL

**Causas possíveis:**
1. Custom fields não criados no GoHighLevel
2. Tracking ID incorreto
3. Domínio não conectado no GHL

**Verificar no GoHighLevel:**
1. Vá em **Contacts**
2. Procure pelo telefone/e-mail que você testou
3. Se o contato não existir, verifique os custom fields

---

## 📊 O Que o GHL Deve Receber

Quando tudo funcionar, no GoHighLevel você verá um novo contato com:

### Campos Padrão:
- ✅ **First Name:** João Silva (do campo Name)
- ✅ **Phone:** (978) 123-4567
- ✅ **Email:** noemail@tigersaut.com (valor padrão oculto)

### Custom Fields:
- ✅ **address1:** 123 Main St, Boston, MA
- ✅ **project_details:** Quero pintar a fachada da minha casa

---

## 🎯 Teste Rápido (1 minuto)

```bash
# 1. Iniciar servidor
cd "/Users/bruno/Documents/LPS/CLIENTES/TIGER SAUT/NOVO WEBSITE/NOVO SITE/exteriorpainting"
python3 -m http.server 8000

# 2. Abrir no navegador
# http://localhost:8000/index.html

# 3. Pressione F12 (Console)

# 4. Preencha o formulário:
# Name: Test User
# Phone: 9781234567
# Address: Test Address

# 5. Clique em Submit

# 6. Deve redirecionar para thank-you.html
```

---

## ✅ Checklist Final

Antes de colocar em produção, verifique:

- [ ] Formulário redireciona para thank-you.html
- [ ] Console mostra logs do GHL
- [ ] Contato criado no GoHighLevel
- [ ] Custom fields `address1` e `project_details` criados no GHL
- [ ] Página funciona em servidor HTTP (não file://)
- [ ] Desativar `data-debug="true"` em produção

---

**Data:** 6 de março de 2026  
**Status Atual:** ✅ Código corrigido e pronto para teste
