#include <stdio.h>

int main() {
    char buf[15];
    
    setbuf(stdout, NULL);

    printf("Welcome!\n");
    printf("Think you can leak the flag?\n");
    printf("input> ");
    gets(buf);

    printf("Really?\n");
    printf("You said ");
    printf(buf);
    printf("\nYou think that will be enough??\n");
    printf("HA HA\n");
}
