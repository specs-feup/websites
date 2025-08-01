#include <stdio.h>

int square(int c) {
    
    
    return c * c;
}

int sum_squares(int a, int b) {
    
    int a2;
    int b2;
    
    a2 = square(a);
    b2 = square(b);
    
    return a2 + b2;
}


int main() {
    
    int a = 10;
    int b = 25;
    int c;
    
    c = sum_squares(a, b);
    
    printf("Result: %d\n", c);
    
    return 0;
}
