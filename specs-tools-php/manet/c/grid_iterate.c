#define X_DIM 32
#define Y_DIM 64
#define Z_DIM 16
#define ITER_STEPS_NUM 3*(Y_DIM/Z_DIM)

void grid_iterate_kernel(float potential[X_DIM][Y_DIM][Z_DIM], int obstacles[X_DIM][Y_DIM][Z_DIM])
{
	unsigned int i, j, k, steps;
	int val;
	float acc;
	float c = 1.0f/6.0f;
	
	for (steps = 0; steps < ITER_STEPS_NUM; steps++)
	{ 
		for (i = 1; i < (X_DIM - 1); i+=1)
		{
			for (j = 1; j < (Y_DIM - 1); j++)
			{
				for (k = 1; k < (Z_DIM - 1); k++)
				{
					val = obstacles[i][j][k];
					
					if (val == 1)
					{
						potential[i][j][k] = 0.0f;
					}
					else
					{
						if (val == -1)
						{
							potential[i][j][k] = 1.0f;
						}
						else
						{
							acc  = 	potential[i-1][j][k] +
									potential[i+1][j][k] +
									potential[i][j-1][k] +
									potential[i][j+1][k] +
									potential[i][j][k-1] +
									potential[i][j][k+1];
							
							potential[i][j][k] = acc * c;
						}
					}
				}
			}
		}
	}
}
