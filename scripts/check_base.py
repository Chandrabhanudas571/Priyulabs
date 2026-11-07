for f in ['apparel-boutiques.html', 'cafes-chai-bars.html', 'bookstores-stationery.html', 'pos.html', 'complete-management-system.html']:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        print(f, '<base href="/"' in fp.read())
