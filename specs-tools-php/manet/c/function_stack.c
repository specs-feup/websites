#include <stdio.h>

void f1();
void f2();
void f3();
void f4();
void f5();

void f1() {
	
	f2();
	f3();
}

void f2() {
	
	f3();
}

void f3() {
	printf("Inside f3!\n");
	f4(5);
}

void f4(int i) {
	
	
	while(i--) {
		f4(i);
	}
	f5();
}

void f5() {
	
	;
}

int main() {

	f1();
	f3();
	
	return 0;
}
