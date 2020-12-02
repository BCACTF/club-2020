#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int check = 0;
    char input[32];

    // Don't worry about this
    // It just sets up the problem for nc
    setbuf(stdout, NULL);
    setbuf(stdin, NULL);
    setbuf(stderr, NULL);

    printf("%p %p\n", &input, &check); // Debug statement, should remove later
    
    puts("Welcome to the Overflow Buffet!");
    puts("I just want to let you know that today we're out of our famous shellfish.");
    puts("But anyways, how can I help you?");
    gets(input);

    if (check == 0x42753143) {
        // Secret shell, should not be reachable
        puts("Actally, we do have a reserve of shells back here somewhere...");
        system("/bin/sh");
    } else {
        puts("I am sorry, but we are out of shells.");
    }
}
