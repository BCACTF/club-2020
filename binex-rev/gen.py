from random import randrange

flag = "bcactf{r3v_1s_l0v3_r3v_i5_l1f3}"
chk = [randrange(1, 127) for i in range(len(flag))]

chk_str = ""
out = ""

def pad(a):
    if len(a) == 2:
        return a
    return "0" + a

def format_int(x):
    return pad(hex(x)[2:])

for i in range(len(flag)):
    inp_char = ord(flag[i])
    chk_char = chk[i]
    chk_str += "\\x" + format_int(chk_char)
    out_char = inp_char ^ chk_char
    out += "\\x" + format_int(out_char)

print(chk_str)
print(out)
