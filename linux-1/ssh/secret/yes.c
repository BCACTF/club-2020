#include <stdio.h>

int main()
{
    setbuf(stdout, NULL);
    setbuf(stdin, NULL);
    setbuf(stderr, NULL);

    puts("You got it!");
    puts("bcactf{3-ch005inG_7h3_c0rr3c7_b1n4ry}");
    puts("I wonder what would happen if you snuck a malicious program into the PATH?");
    puts("Hmm... it's something to think about.");
}
