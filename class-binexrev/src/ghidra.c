#include <stdio.h>

int check(char *str) {
    int i = 0;

    while (1) {
        if (str[i] == '\0') break;
        if (str[i] == '\n') break;
        if (str[i] != 'a') return 0;
        ++i;
    }

    if (i == 17)
        return 1;
    return 0;
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
