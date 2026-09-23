import os

target_v1 = '<img src="/image_4.png" alt="Ashoka Stambha MSME Government of India" class="foot-msme-emblem" style="height: 64px; width: auto; max-width: 85px; object-fit: contain; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,0.14);" onerror="if(!this.dataset.retry){this.dataset.retry=\'1\';this.src=\'image_4.png\';}" />'
repl_v1 = target_v1 + '\n          <!-- Secure SSL Encryption Emblem -->\n          <img src="/sequre ssl.jpg" alt="SECURE SSL 256-Bit Bank Encryption" class="foot-secure-ssl-emblem" style="height: 64px; width: auto; max-width: 165px; object-fit: contain; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,0.14);" onerror="if(!this.dataset.retry){this.dataset.retry=\'1\';this.src=\'sequre ssl.jpg\';}" />'

target_v2 = '<img src="image_4.png" alt="Ashoka Stambha MSME Government of India" class="foot-msme-emblem" style="height: 64px; width: auto; max-width: 85px; object-fit: contain; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,0.14);" onerror="if(!this.dataset.retry){this.dataset.retry=\'1\';this.src=\'assets/image_4.png\';}" />'
repl_v2 = target_v2 + '\n          <!-- Secure SSL Encryption Emblem -->\n          <img src="sequre ssl.jpg" alt="SECURE SSL 256-Bit Bank Encryption" class="foot-secure-ssl-emblem" style="height: 64px; width: auto; max-width: 165px; object-fit: contain; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,0.14);" onerror="if(!this.dataset.retry){this.dataset.retry=\'1\';this.src=\'assets/sequre ssl.jpg\';}" />'

updated_count = 0
for root, dirs, files in os.walk('.'):
    if any(x in root for x in ['node_modules', '.git', '.gemini', 'dist']):
        continue
    for f in files:
        if f.endswith('.html'):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8') as fp:
                c = fp.read()
            if 'foot-secure-ssl-emblem' in c:
                continue
            if target_v1 in c:
                new_c = c.replace(target_v1, repl_v1, 1)
                with open(p, 'w', encoding='utf-8') as fp:
                    fp.write(new_c)
                updated_count += 1
                print(f'Updated (v1): {p}')
            elif target_v2 in c:
                new_c = c.replace(target_v2, repl_v2, 1)
                with open(p, 'w', encoding='utf-8') as fp:
                    fp.write(new_c)
                updated_count += 1
                print(f'Updated (v2): {p}')

print(f'Total files updated: {updated_count}')
