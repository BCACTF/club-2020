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

convert_to_srgb(Image.open("input.png")).save("input.png")