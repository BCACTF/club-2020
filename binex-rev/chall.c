#include <stdio.h>

int check(char *str) {
    char *a = "\x60\x09\x74\x0c\x6d\x67\x7a\x1e\x20\x23\x70\x29\x29\x67\x0d\x44\x56\x79\x0d\x44\x4e\x4b\x2d\x7e\x72\x5f\x15\x5c\x18";
    char *b = "\x03\x65\x01\x6e\x16\x15\x49\x68\x7f\x12\x03\x76\x45\x57\x7b\x77\x09\x0b\x3e\x32\x11\x22\x18\x21\x1e\x6e\x73\x6f\x65";

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