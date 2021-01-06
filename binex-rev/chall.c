#include <stdio.h>

int check(char *str) {
    char *a = "\x38\x04\x6b\x2f\x02\x30\x2a\x42\x38\x25\x1c\x13\x25\x13\x3d\x02\x75\x65\x70\x19\x57\x31\x64\x15\x7e\x4c\x18\x64\x19\x77\x19";
    char *b = "\x5a\x67\x0a\x4c\x76\x56\x51\x30\x0b\x53\x43\x22\x56\x4c\x51\x32\x03\x56\x2f\x6b\x64\x47\x3b\x7c\x4b\x13\x74\x55\x7f\x44\x64";

    for (int i = 0; a[i] != '\0'; ++i) {
        if ((a[i] ^ str[i]) != b[i])
            return 0;
    }

    return 1;
}

int main() {
    char input[50];
    printf("Password: ");
    fgets(input, 50, stdin);

    if (check(input))
        printf("Correct!\n");
    else
        printf("Incorrect!\n");
}