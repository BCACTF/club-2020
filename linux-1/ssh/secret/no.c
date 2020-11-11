#include <stdio.h>

int main()
{
    setbuf(stdout, NULL);
    setbuf(stdin, NULL);
    setbuf(stderr, NULL);

    puts("You ran the `ctf` program!");
    puts("This program does not have the flag...");
    puts("But the `ctf` program does!");
}
