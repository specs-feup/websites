#define SIZE 128

int dot_prod_kernel(int *x, int *y)
{
	int i;
	int dot_prod = 0;
	
	for (i = 0; i < SIZE; i++)
	{	
		dot_prod += x[i] * y[i];
	}
	
	return dot_prod;
}
