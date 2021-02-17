#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <immintrin.h>

#define FLAG_SIZE 64

int main() {
    char buf[FLAG_SIZE];
    printf("Flag: ");
    fgets(buf, FLAG_SIZE, stdin);
    buf[strcspn(buf, "\r\n")] = 0;

    char flag[FLAG_SIZE] = {0};
    __m128i SHUFFLE;
    __m128i ADD1;
    __m128i ADD2;
    __m128i XOR;
    __m128i m1;
    __m128i m2;
    __m128i m3;
    __m128i m4;
    __m128i m5;

    char* data_in = "This is a string";
    int x = 1899129910;
    SHUFFLE = _mm_setr_epi32(0x0A010C04, 0x06080D03, 0x0B0E0207, 0x09050F00);
    flag[2] = 'b';
    m1 = _mm_loadu_si128((__m128i *) data_in);
    int y = x % 10001;
    srand(1);
    flag[6] = '|';

    srand(rand());
    
    for (int i = 7; i <= 10; ++i) {
        ADD1 = _mm_setr_epi32(0x12345678, 0x13371337, 0xDEADC0D3, 0x41414141);
        for (int j = 0; i + j <= 10; ++j) {
            flag[0] = 'c';
            flag[i + j] = x;
            strcpy(&flag[y-j+i], "Wu5a7v6v3ea");
            ADD2 = _mm_setr_epi32(0xF00DCAFE, 0xAAAAAAAA, 0x0FF1C365, 0xDEADBEEF);
            srand(rand());
        }
        flag[5] = 'g';
        x /= 256;
        m2 = _mm_add_epi32(m1, ADD1);
    }

    for (int i = 0; i < 100; ++i) {
        srand(rand());
        flag[1] = 'd';
        m3 = _mm_shuffle_epi8(m2, SHUFFLE);
    }

    XOR = _mm_setr_epi32(0x79F41E24, 0x61B63549, 0x1BC125EB, 0xA046148A);
    flag[47] = '}';

    unsigned char table[256] = {
        170, 194, 190, 202, 178, 216, 132, 202, 216, 206, 160, 194, 158, 168, 162, 164, 140, 220, 232, 240, 162, 146, 204, 190, 164, 170, 162, 148, 178, 200, 230, 140, 142, 190, 104, 162, 164, 150, 242, 238, 180, 228, 234, 174, 218, 236, 210, 196, 200, 238, 198, 210, 130, 162, 206, 212, 240, 106, 180, 220, 146, 162, 132, 138, 146, 238, 142, 222, 190, 174, 142, 238, 150, 162, 218, 198, 170, 242, 204, 136, 168, 218, 140, 154, 180, 134, 142, 204, 202, 218, 158, 238, 204, 208, 216, 204, 228, 146, 150, 146, 204, 228, 220, 210, 142, 162, 174, 178, 166, 194, 236, 242, 234, 210, 236, 172, 154, 142, 134, 238, 130, 134, 150, 104, 200, 216, 172, 160, 146, 174, 200, 236, 242, 174, 146, 130, 230, 146, 158, 212, 210, 164, 190, 172, 156, 238, 170, 206, 164, 150, 164, 134, 232, 210, 162, 142, 130, 176, 244, 198, 216, 232, 150, 166, 130, 142, 158, 212, 156, 196, 196, 156, 242, 200, 194, 180, 238, 198, 232, 240, 238, 190, 220, 230, 222, 158, 230, 210, 166, 130, 206, 176, 136, 242, 234, 210, 154, 138, 180, 152, 180, 234, 174, 162, 210, 168, 244, 162, 136, 180, 202, 168, 140, 150, 134, 140, 214, 230, 140, 166, 242, 210, 232, 158, 244, 162, 244, 164, 142, 180, 198, 240, 200, 200, 152, 242, 154, 210, 176, 152, 172, 194, 144, 236, 216, 212, 134, 208, 170, 180, 206, 156, 160, 196, 210, 136
    };

    for (int i = 29; i > 25; --i) {
        flag[i]--;
        flag[3] = 'd';
        m4 = _mm_add_epi32(m3, ADD2);
    }

    srand(rand());

    for (int i = 31; i < 47; ++i) {
        m5 = _mm_xor_si128(m4, XOR);
        flag[1] = 'd';
        flag[i] = table[rand() % 255] / 2;
    }

    flag[4] = 'u';

    _mm_storeu_si128((__m128i *) &flag[10], m5);

    for (int i = 0; i < FLAG_SIZE; ++i)
        if (i < 30)
            flag[i] -= 1;
        else
            flag[i] = flag[i + 1];

    if (!strcmp(buf, flag)) {
        printf("Correct!\n");
    } else {
        printf("Incorrect.\n");
    }
}