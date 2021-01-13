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

flag = open("flag.png", "rb")
binary = bin(int.from_bytes(flag.read(), "big"))[2:]
binary = binary.zfill(8 * ((len(binary) + 7) // 8)) # Apply padding
flag.close()

for row in range(img.size[1]):
    for col in range(img.size[0]):
        pixel = list(pixels[col, row])
        for color in range(3): # R, G, B
            lsb = 0 # If we ran out of bits, just use zeroes
            i = row * img.size[0] * 3 + col * 3 + color
            if i < len(binary):
                lsb = int(binary[i])
            mask = 0b11111110
            pixel[color] = lsb + (pixel[color] & mask)
        pixels[col, row] = tuple(pixel)

img.save("output.png")
