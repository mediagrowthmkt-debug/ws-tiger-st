// ========================================
// BLOG INDEX - MediaGrowth
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer (se existir)
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize blog
    initBlog();
});

// ========================================
// BLOG INITIALIZATION
// ========================================

let allPosts = [];
let currentCategory = 'all';
let currentSearchTerm = '';

async function initBlog() {
    try {
        console.log('🚀 Iniciando blog...');
        
        // Verificar elementos
        const postsGrid = document.getElementById('postsGrid');
        const emptyState = document.getElementById('emptyState');
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        
        if (!postsGrid) console.error('❌ postsGrid não encontrado!');
        if (!emptyState) console.error('❌ emptyState não encontrado!');
        if (!searchInput) console.error('❌ searchInput não encontrado!');
        if (!categoryFilter) console.error('❌ categoryFilter não encontrado!');
        
        // Load posts from posts folder
        await loadPosts();
        console.log('✅ Posts carregados:', allPosts.length);
        
        // Setup search
        setupSearch();
        console.log('✅ Busca configurada');
        
        // Setup category filter
        setupCategoryFilter();
        console.log('✅ Filtros configurados');
        
        // Render posts
        renderPosts();
        console.log('✅ Posts renderizados');
        
    } catch (error) {
        console.error('❌ Erro ao inicializar blog:', error);
        showEmptyState();
    }
}

// ========================================
// LOAD POSTS
// ========================================

async function loadPosts() {
    try {
        console.log('🚀 Carregando posts...');
        
        let htmlFiles = [];
        let githubPosts = [];
        
        // 1. PRIORIDADE: Tentar carregar posts do GitHub
        try {
            console.log('🌐 Carregando posts do GitHub...');
            const response = await fetch('https://api.github.com/repos/mediagrowthmkt-debug/ws-tiger-st/contents/blog/posts');
            
            if (response.ok) {
                const files = await response.json();
                console.log('📁 Arquivos encontrados no GitHub:', files.length);
                
                // Filtrar apenas arquivos HTML (excluir README.md e index.html)
                htmlFiles = files.filter(file => 
                    file.name.endsWith('.html') && 
                    file.name !== 'index.html' &&
                    file.type === 'file'
                );
                
                console.log('✅ Posts HTML do GitHub:', htmlFiles.length);
                console.log('📝 Lista de posts:', htmlFiles.map(f => f.name));
                
                // Carregar metadados de cada post do GitHub Raw
                const postPromises = htmlFiles.map(file => 
                    loadPostMetadata(file.download_url, file.name)
                );
                
                githubPosts = await Promise.all(postPromises);
                githubPosts = githubPosts.filter(post => post !== null);
                console.log('✅ Posts GitHub carregados:', githubPosts.length);
            } else {
                console.warn('⚠️ GitHub API retornou:', response.status);
                throw new Error('GitHub API error');
            }
        } catch (error) {
            console.warn('⚠️ Erro ao carregar do GitHub:', error.message);
            console.log('📂 Tentando carregar posts locais como fallback...');
            
            // 2. FALLBACK: Carregar posts locais se GitHub falhar
            const localPosts = await loadLocalPosts();
            githubPosts = localPosts;
        }
        
        allPosts = githubPosts;
        
        // Sort by date (newest first)
        allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        console.log('📚 Total de posts carregados:', allPosts.length);
        
        // Se não encontrou nenhum post, usa exemplos
        if (allPosts.length === 0) {
            console.warn('⚠️ Nenhum post encontrado, usando exemplos');
            allPosts = getExamplePosts();
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar posts:', error);
        allPosts = getExamplePosts();
    }
}

// Função para carregar posts locais (FALLBACK quando GitHub não está disponível)
async function loadLocalPosts() {
    console.log('📂 Carregando posts locais como fallback...');
    
    // Lista de posts conhecidos localmente
    const localFiles = [
        '5-signs-you-need-window-replacement.html',
        'marble-or-granite-guide-for-your-home-in-worcester.html',
        'kitchen-island-ideas-555-countertops-guide.html',
        'kitchen-island-ideas-granite-countertops-guide.html'
    ];
    
    const posts = [];
    
    for (const fileName of localFiles) {
        try {
            const url = `posts/${fileName}`;
            const response = await fetch(url);
            
            if (response.ok) {
                const html = await response.text();
                const post = await loadPostMetadata(url, fileName);
                if (post) {
                    posts.push(post);
                    console.log(`  ✅ Carregado localmente: ${fileName}`);
                }
            }
        } catch (error) {
            // Silencioso - arquivo não existe localmente
        }
    }
    
    console.log(`📦 Total de posts locais encontrados: ${posts.length}`);
    return posts;
}

async function loadPostMetadata(downloadUrl, fileName) {
    try {
        console.log('📥 Carregando post:', fileName);
        
        const response = await fetch(downloadUrl);
        if (!response.ok) {
            throw new Error(`Erro ao carregar: ${response.status}`);
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract metadata from post
        const title = doc.querySelector('h1')?.textContent || 
                     doc.querySelector('meta[property="og:title"]')?.content ||
                     doc.querySelector('title')?.textContent || 
                     'Post sem título';
                     
        const description = doc.querySelector('meta[name="description"]')?.content || 
                          doc.querySelector('meta[property="og:description"]')?.content ||
                          doc.querySelector('p')?.textContent?.substring(0, 150) || '';
                          
        const image = doc.querySelector('meta[property="og:image"]')?.content || 
                     doc.querySelector('.hero-image img')?.src ||
                     doc.querySelector('img')?.src || 
                     '../arquivos/serviços fotos/Window Installation/window.webp';
                     
        const category = doc.querySelector('meta[name="category"]')?.content || 
                        doc.querySelector('meta[property="article:section"]')?.content ||
                        'Home Improvement';
                        
        const author = doc.querySelector('meta[name="author"]')?.content || 
                      doc.querySelector('.author')?.textContent ||
                      'Tigersaut Team';
                      
        const dateStr = doc.querySelector('meta[name="publish-date"]')?.content || 
                       doc.querySelector('meta[property="article:published_time"]')?.content ||
                       doc.querySelector('time')?.getAttribute('datetime') || 
                       new Date().toISOString();
        
        console.log('✅ Post carregado:', title);
        
        return {
            title: title.trim(),
            excerpt: description.trim(),
            image: image,
            category: category.trim(),
            author: author.trim(),
            date: dateStr,
            url: `posts/${fileName}`
        };
    } catch (error) {
        console.error('❌ Erro ao carregar post:', fileName, error);
        return null;
    }
}

function getExamplePosts() {
    // Fallback posts para Tigersaut
    return [
        {
            title: '5 Signs You Need Window Replacement',
            excerpt: 'Learn the top 5 signs that indicate it\'s time to replace your home\'s windows and improve energy efficiency.',
            image: '../arquivos/serviços fotos/Window Installation/window.webp',
            category: 'Home Improvement',
            author: 'Tigersaut Team',
            date: '2025-02-25',
            url: 'posts/5-signs-you-need-window-replacement.html'
        }
    ];
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearchTerm = e.target.value.toLowerCase();
            renderPosts();
        }, 300);
    });
}

// ========================================
// CATEGORY FILTER
// ========================================

function setupCategoryFilter() {
    // Get unique categories
    const categories = ['all', ...new Set(allPosts.map(post => post.category))];
    
    // Create category buttons
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = categories.map(cat => `
        <button class="category-btn ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
            ${cat === 'all' ? 'Todos' : cat}
        </button>
    `).join('');
    
    // Add click listeners
    categoryFilter.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryFilter.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update current category and render
            currentCategory = this.dataset.category;
            renderPosts();
        });
    });
}

// ========================================
// RENDER POSTS
// ========================================

function renderPosts() {
    const postsGrid = document.getElementById('postsGrid');
    const emptyState = document.getElementById('emptyState');
    
    // Filter posts
    let filteredPosts = allPosts;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === currentCategory);
    }
    
    // Filter by search term
    if (currentSearchTerm) {
        filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(currentSearchTerm) ||
            post.excerpt.toLowerCase().includes(currentSearchTerm) ||
            post.category.toLowerCase().includes(currentSearchTerm)
        );
    }
    
    // Show empty state if no posts
    if (filteredPosts.length === 0) {
        postsGrid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    // Hide empty state
    emptyState.style.display = 'none';
    
    // Render posts
    postsGrid.innerHTML = filteredPosts.map(post => createPostCard(post)).join('');
}

function createPostCard(post) {
    const date = formatDate(post.date);
    
    return `
        <a href="${post.url}" class="post-card">
            <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy" onerror="this.src='../assets/images/logo-mediagrowth.webp'">
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-author">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        ${post.author}
                    </span>
                    <span class="post-date">${date}</span>
                </div>
            </div>
        </a>
    `;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

function showEmptyState() {
    const postsGrid = document.getElementById('postsGrid');
    const emptyState = document.getElementById('emptyState');
    
    postsGrid.innerHTML = '';
    emptyState.style.display = 'block';
}

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
