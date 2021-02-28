#include <stdio.h>
#include <stdlib.h>

char* cmd = "/bin/false";

int win() {
    // Jumping here won't work lol
    system(cmd);
}

int shells() {
    cmd = "/bin/sh";
}

int main(void) {
    char input[32];

    // Ignore the `setbuf`
    setbuf(stdout, NULL);
    setbuf(stdin, NULL);
    setbuf(stderr, NULL);

    puts("Welcome back to the Overflow Buffet!");
    puts("We've removed our `check`s from the menu but everything else's the same.");
    puts("How can I help you today?");
    gets(input);
    puts("Sorry, but we truly are out of stock of shells");
}
