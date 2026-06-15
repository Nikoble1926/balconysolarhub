"""Generate /og-image.png for balconysolarhub.co.uk (1200x630)."""
import math
import os
from PIL import Image, ImageDraw, ImageFont

OUT = "/root/balconysolarhub/og-image.png"
W, H = 1200, 630
BG = (11, 61, 46)
SUN = (246, 201, 69)
TITLE = (255, 255, 255)
SUB = (159, 227, 197)
URL_COL = (180, 215, 200)

FB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

def font(sz, bold=True):
    return ImageFont.truetype(FB if bold else FR, sz)

def sun(draw, cx, cy, r, col, ray_inner=16, ray_outer=48, ray_width=10):
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)
    for i in range(12):
        a = i * math.pi / 6
        x0 = cx + math.cos(a) * (r + ray_inner)
        y0 = cy + math.sin(a) * (r + ray_inner)
        x1 = cx + math.cos(a) * (r + ray_outer)
        y1 = cy + math.sin(a) * (r + ray_outer)
        draw.line([x0, y0, x1, y1], fill=col, width=ray_width)
        cap = ray_width / 2
        for px, py in [(x0, y0), (x1, y1)]:
            draw.ellipse([px - cap, py - cap, px + cap, py + cap], fill=col)

def wrap(draw, text, fnt, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=fnt) <= max_w:
            cur = t
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

def main():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    sun(d, 300, 315, 90, SUN)

    title = "BalconySolarHub"
    subtitle = "UK balcony & plug-in solar — BS 7671 status, G98 notification, savings & honest kit picks"
    url = "balconysolarhub.co.uk"

    text_x = 470
    text_max_w = W - text_x - 60

    tf = font(64, bold=True)
    sf = font(28, bold=False)
    uf = font(24, bold=True)

    title_lines = wrap(d, title, tf, text_max_w)
    sub_lines = wrap(d, subtitle, sf, text_max_w)

    title_lh = 78
    sub_lh = 40
    block_h = title_lh * len(title_lines) + 22 + sub_lh * len(sub_lines)
    y = (H - block_h) // 2

    for ln in title_lines:
        d.text((text_x, y), ln, font=tf, fill=TITLE)
        y += title_lh
    d.rectangle([text_x, y + 4, text_x + 120, y + 12], fill=SUN)
    y += 22
    for ln in sub_lines:
        d.text((text_x, y), ln, font=sf, fill=SUB)
        y += sub_lh

    uw = d.textlength(url, font=uf)
    d.text((W - uw - 40, H - 50), url, font=uf, fill=URL_COL)

    img.save(OUT, optimize=True)
    print(f"wrote {OUT}  size={os.path.getsize(OUT)} bytes  dims={W}x{H}")

if __name__ == "__main__":
    main()
