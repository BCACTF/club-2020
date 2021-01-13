import io
from PIL import Image
from PIL import ImageCms

# https://stackoverflow.com/questions/50622180/does-pil-image-convertrgb-convert-images-to-srgb-or-adobergb
# Don't worry about what this function does
def convert_to_srgb(img):
    '''Convert PIL image to sRGB color space (if possible)'''
    icc = img.info.get('icc_profile', '')
    if icc:
        io_handle = io.BytesIO(icc)     # virtual file
        src_profile = ImageCms.ImageCmsProfile(io_handle)
        dst_profile = ImageCms.createProfile('sRGB')
        img = ImageCms.profileToProfile(img, src_profile, dst_profile)
    return img

img = convert_to_srgb(Image.open("input.png"))
pixels = img.load()

msg = "Ooh it's a secret message!\n\nRight here have a flag:\nbcactf{my_cat_15_h1d1ng_s0m3th1ng_1ns1gn1f1can7}\n\nWell anyway there's not much else to say here, aside from the usual stuffs about CTFs, COVID-19, and the holidays. Have a nice day!\n\nAlso if you happen to be printing this on a terminal, enjoy this nice surprise: \x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07"
binary = bin(int.from_bytes(msg.encode(), "big"))[2:]
binary = binary.zfill(8 * ((len(binary) + 7) // 8)) # Apply padding
print("Message in binary: %s" % binary)

for row in range(img.size[1]):
    for col in range(img.size[0]):
        lsb = int(binary[row * img.size[0] + col])
        mask = 0b11111110
        pixel = pixels[col, row]
        pixels[col, row] = (lsb + (pixel[0] & mask), lsb + (pixel[1] & mask), lsb + (pixel[2] & mask))

img.save("output.png")
