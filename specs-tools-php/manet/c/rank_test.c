/* Test code */

void for_test() {
	for(;;) {
		for(;;) {
			for(;;){;}
			for(;;){;}
			for(;;) {
				for(;;){;}
			}
			for(;;){;}
		}
		for(;;){;}
	}
	for(;;) {
		for(;;){
			for(;;){
				for(;;){
					for(;;){;}
				}
			}
			for(;;){;}
		}
		for(;;){;}
	}
}

void if_test() {

	int i = 0;

	if(1) {
		if(i) {
			if(1){;}
			if(i++){;}
			if(1) {
				if(1){;}
			}
			if(1){;}
		}
		if(1){;}
	}
	if(1) {
		if(1){
			if(1){
				if(1){
					if(1){;}
				}
			}
			if(1){;}
		}
		if(1){;}
	}
}

int main()
{
	for_test();
	if_test();
	
	return 0;
}
