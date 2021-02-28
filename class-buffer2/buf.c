#include <stdio.h>
#include <stdlib.h>

void win() {
    // secret unreachable function
    system("/bin/sh");
}

int main() {
    int check = 0;
    char buf[20];

    setbuf(stdout, NULL);

    printf("Input: ");
    gets(buf);

    if (check != 0) {
        puts("Correct!");
        win();
    } else {
        puts("Nope.");
        puts("Ha. unhackable.");
    }
}
