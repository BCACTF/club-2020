#include <stdio.h>

int math(int x, int y) {
    int sum = x + y;
    int diff = x - y;
    printf("Sum: %d, diff: %d\n", sum, diff);
    return sum;
}

int main() {
    int a = 3;
    int b = 5;
    int c = math(a, b);
    printf("The value of c is: %d\n", c);
}
