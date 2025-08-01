double bar() {
    return 1.0;
}

double foo() {
    double a = 0.0;
	int b = 0;
	unsigned int c = 0;
    
    for(int i=0; i<1000; i++) {
        a += bar();
		b += i;
		c += i;
    }
    
    return a;
}

int main() {
    
    foo();

}