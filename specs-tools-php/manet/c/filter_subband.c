void filter_subband_kernel(float z[512], float s[32], float m[32*64])
{
	float y[64];
	int i,j;

	for (i=0;i<64;i++) {
	
		y[i] = 0.0f;
		for (j=0;j<8;j++) {
		
			y[i] += z[i+64*j];
		}
	}
	
	for (i=0;i<32;i++) {
	
		s[i] = 0.0f;
		for (j=0;j<64;j++) {
		
			s[i] += m[i*32 +j] * y[j];
		}
	}
}
