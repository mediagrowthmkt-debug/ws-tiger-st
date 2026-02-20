// Smart URL Handler - Funciona tanto local quanto em produção
(function() {
    'use strict';
    
    // Detectar se está em ambiente de produção (servidor web) ou local (file://)
    const isProduction = window.location.protocol !== 'file:';
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname === '';
    
    // Se não estiver em produção real, ajustar links
    if (!isProduction || isLocalhost) {
        console.log('🔧 Ajustando links para ambiente local/desenvolvimento');
        
        // Encontrar todos os links internos
        document.addEventListener('DOMContentLoaded', function() {
            const links = document.querySelectorAll('a[href^="/"]');
            
            links.forEach(link => {
                const href = link.getAttribute('href');
                
                // Ignorar links externos, âncoras, tel, mailto
                if (href.startsWith('http') || 
                    href.startsWith('tel:') || 
                    href.startsWith('mailto:') ||
                    href.startsWith('#')) {
                    return;
                }
                
                // Converter URLs limpas para .html em ambiente local
                let newHref = href;
                
                if (href === '/') {
                    newHref = 'index.html';
                } else if (href.startsWith('/')) {
                    newHref = href.substring(1) + '.html';
                }
                
                // Atualizar o link
                if (newHref !== href) {
                    link.setAttribute('href', newHref);
                    console.log(`📝 Link ajustado: ${href} → ${newHref}`);
                }
            });
            
            console.log(`✅ ${links.length} links processados`);
        });
    } else {
        console.log('✓ Ambiente de produção detectado - URLs limpas ativas');
    }
})();
