import os

def get_dir_size(path):
    total = 0
    file_count = 0
    for root, dirs, files in os.walk(path):
        for f in files:
            fp = os.path.join(root, f)
            try:
                total += os.path.getsize(fp)
                file_count += 1
            except:
                pass
    return total, file_count

# Calculate size of backed up original media
backup_size, backup_count = get_dir_size('backup-media')

# Calculate size of re-encoded videos vs original videos
video_files = [
    'bakery-demo.mp4',
    'card1-pos.mp4',
    'card2-management.mp4',
    'card3-website.mp4',
    'card4-marketing.mp4',
    'hero-video.mp4',
    'landingpage1video.mp4',
    'backgroundvideo1.mp4',
    'priyulabs background.mp4',
    'priyulabsfront.mp4',
    'digital marketing page.mp4'
]

orig_video_bytes = 0
opt_video_bytes = 0

for v in video_files:
    bak_path = os.path.join('backup-media', v)
    cur_path = v
    if not os.path.exists(bak_path):
        bak_path = os.path.join('backup-media', 'assets', v)
    if not os.path.exists(cur_path):
        cur_path = os.path.join('assets', v)

    if os.path.exists(bak_path) and os.path.exists(cur_path):
        s_orig = os.path.getsize(bak_path)
        s_cur = os.path.getsize(cur_path)
        orig_video_bytes += s_orig
        opt_video_bytes += s_cur
        print(f"{v}: {(s_orig/(1024*1024)):.2f} MB -> {(s_cur/(1024*1024)):.2f} MB (saved {((s_orig - s_cur)/(1024*1024)):.2f} MB)")

# Calculate intro webp savings
intro_orig = os.path.getsize('backup-media/assets/priyulabs_intro_transparent.webp')
intro_cur = os.path.getsize('assets/priyulabs_intro_transparent.webp')

# Calculate WhatsApp image savings
wa_orig = os.path.getsize('backup-media/assets/images/priyulabs-whatsapp.png')
wa_cur = os.path.getsize('assets/images/priyulabs-whatsapp.png')

print(f"\nWhatsApp PNG: {(wa_orig/1024):.1f} KB -> {(wa_cur/1024):.1f} KB (saved {((wa_orig - wa_cur)/1024):.1f} KB, -{((wa_orig - wa_cur)/wa_orig*100):.1f}%)")
print(f"Intro Animated WebP: {(intro_orig/(1024*1024)):.2f} MB -> {(intro_cur/(1024*1024)):.2f} MB (saved {((intro_orig - intro_cur)/(1024*1024)):.2f} MB, -{((intro_orig - intro_cur)/intro_orig*100):.1f}%)")
print(f"Key Videos Total: {(orig_video_bytes/(1024*1024)):.2f} MB -> {(opt_video_bytes/(1024*1024)):.2f} MB (saved {((orig_video_bytes - opt_video_bytes)/(1024*1024)):.2f} MB, -{((orig_video_bytes - opt_video_bytes)/orig_video_bytes*100):.1f}%)")
