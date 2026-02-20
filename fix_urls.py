#!/usr/bin/env python3
"""
Script para atualizar links para funcionar tanto localmente quanto em produção
Cria versões com links relativos (.html) para teste local
"""
import os
import re
from pathlib import Path

base_dir = Path(__file__).parent

html_files = [
    'index.html',
    'windows.html',
    'roofing.html',
    'bathroom.html',
    'painting.html',
    'siding.html',
    'decks.html',
    'gallery.html',
    'contact.html',
    'privacy-policy.html',
    'terms-and-conditions.html',
    'test-menu.html'
]

# Padrões para converter BACK para .html (para teste local)
patterns_to_html = [
    (r'href="/"(?!>)', r'href="index.html"'),
    (r'href="/windows"', r'href="windows.html"'),
    (r'href="/roofing"', r'href="roofing.html"'),
    (r'href="/bathroom"', r'href="bathroom.html"'),
    (r'href="/painting"', r'href="painting.html"'),
    (r'href="/siding"', r'href="siding.html"'),
    (r'href="/decks"', r'href="decks.html"'),
    (r'href="/gallery"', r'href="gallery.html"'),
    (r'href="/contact"', r'href="contact.html"'),
    (r'href="/privacy-policy"', r'href="privacy-policy.html"'),
    (r'href="/terms-and-conditions"', r'href="terms-and-conditions.html"'),
]

# Padrões para converter para URLs limpas (para produção)
patterns_clean = [
    (r'href="index\.html"', r'href="/"'),
    (r'href="windows\.html"', r'href="/windows"'),
    (r'href="roofing\.html"', r'href="/roofing"'),
    (r'href="bathroom\.html"', r'href="/bathroom"'),
    (r'href="painting\.html"', r'href="/painting"'),
    (r'href="siding\.html"', r'href="/siding"'),
    (r'href="decks\.html"', r'href="/decks"'),
    (r'href="gallery\.html"', r'href="/gallery"'),
    (r'href="contact\.html"', r'href="/contact"'),
    (r'href="privacy-policy\.html"', r'href="/privacy-policy"'),
    (r'href="terms-and-conditions\.html"', r'href="/terms-and-conditions"'),
]

def convert_to_html(content):
    """Converter para links com .html"""
    for pattern, replacement in patterns_to_html:
        content = re.sub(pattern, replacement, content)
    return content

def convert_to_clean(content):
    """Converter para URLs limpas"""
    for pattern, replacement in patterns_clean:
        content = re.sub(pattern, replacement, content)
    return content

def main():
    import sys
    
    if len(sys.argv) < 2:
        print("Uso: python fix_urls.py [local|production]")
        print("  local      - Usa links com .html para teste local")
        print("  production - Usa URLs limpas para produção")
        sys.exit(1)
    
    mode = sys.argv[1].lower()
    
    if mode not in ['local', 'production']:
        print("Modo inválido. Use 'local' ou 'production'")
        sys.exit(1)
    
    patterns = patterns_to_html if mode == 'local' else patterns_clean
    convert_func = convert_to_html if mode == 'local' else convert_to_clean
    
    print(f"Convertendo para modo: {mode.upper()}")
    print("=" * 60)
    
    for filename in html_files:
        filepath = base_dir / filename
        if not filepath.exists():
            print(f"⚠️  {filename} não encontrado")
            continue
            
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = convert_func(content)
            
            if content != new_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✓ {filename} atualizado")
            else:
                print(f"- {filename} já está correto")
        
        except Exception as e:
            print(f"✗ Erro em {filename}: {e}")
    
    print("=" * 60)
    print(f"Conversão para {mode} concluída!")
    
    if mode == 'local':
        print("\n📝 Nota: Arquivos agora usam .html para teste local")
        print("   Execute 'python fix_urls.py production' antes de fazer commit!")

if __name__ == '__main__':
    main()
