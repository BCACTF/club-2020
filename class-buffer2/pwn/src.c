#include <stdio.h>
#include <stdlib.h>

void win() {
    // secret unreachable function
    system("/bin/sh");
}

int main() {
    char buf[20];

    setbuf(stdout, NULL);

    printf("Input: ");
    gets(buf);
    puts("Ha. unhackable.");
}
