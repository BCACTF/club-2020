#include <stdio.h>

int main() {
    char buf[20];

    puts("Hello, world!");
    printf("Type a thing: ");
    gets(buf);
    puts(buf);
}
