public class Sobel {

	private static int K = 3;
	private static int T = 5;

	/**
	 * Edge detection operation that uses three convolution steps:
	 *   1. Gaussian
	 *   2. Vertical
	 *   3. Horizontal
	 * A binary image is outputed based on a threshold.
	 */
	public static int[][] sobel(int[][] inputImage) {

		int M = inputImage.length;
		int N = inputImage[0].length;
		int[][] filter = new int[K][K];

		/* Set the values of the filter matrix to a Gaussian kernel.*/
		filter[0][0] = 1;
		filter[0][1] = 2;
		filter[0][2] = 1;
		filter[1][0] = 2;
		filter[1][1] = 4;
		filter[1][2] = 2;
		filter[2][0] = 1;
		filter[2][1] = 2;
		filter[2][2] = 1;
		/* Perform the Gaussian convolution. */
		int[][] smoothed = convolve2d(inputImage, filter);
		
		/* Set the values of the filter matrix to the vertical Sobel operator. */
		filter[0][0] = 1;
		filter[0][1] = 0;
		filter[0][2] = -1;
		filter[1][0] = 2;
		filter[1][1] = 0;
		filter[1][2] = -2;
		filter[2][0] = 1;
		filter[2][1] = 0;
		filter[2][2] = -1;
		/* Convolve the smoothed matrix with the vertical Sobel kernel. */
		int[][] vertical = convolve2d(smoothed, filter);
		
		/* Set the values of the filter matrix to the horizontal Sobel operator. */
		filter[0][0] = 1;
		filter[0][1] = 2;
		filter[0][2] = 1;
		filter[1][0] = 0;
		filter[1][1] = 0;
		filter[1][2] = 0;
		filter[2][0] = -1;
		filter[2][1] = -2;
		filter[2][2] = -1;
		/* Convolve the smoothed matrix with the horizontal Sobel kernel. */
		int[][] horizontal = convolve2d(smoothed, filter);

		/* Take the larger of the magnitudes of the horizontal and vertical
			matrices. Form a binary image by comparing to a threshold and
			storing one of two values. */
		for (int i = 0; i < M; i++) {
			for (int j = 0; j < N; ++j) {
				int temp1 = Math.abs(vertical[i][j]);
				int temp2 = Math.abs(horizontal[i][j]);
				int temp3 = (temp1 > temp2) ? temp1 : temp2;
				smoothed[i][j] = (temp3 > T) ? 255 : 0;
			}
		}

		return smoothed;
	}

	public static int[][] convolve2d(int input_image[][], int kernel[][])	{
		
		int K = kernel.length;
		int N = input_image.length;
		int M = input_image[0].length;
		int output_image[][] = new int[N][M];
		int dead_rows = K / 2;
		int dead_cols = K / 2;

		/* Calculate the normalization factor of the kernel matrix. */
		int normal_factor = 0;

		for (int r = 0; r < K; r++) {
			for (int c = 0; c < K; c++) {
				normal_factor += Math.abs(kernel[r][c]);
			}
		}

		if (normal_factor == 0) {
			normal_factor = 1;
		}

		/* Convolve the input image with the kernel. */
		for (int r = 0; r < N - K + 1; r++) {
			for (int c = 0; c < M - K + 1; c++) {

				int sum = 0;
				for (int i = 0; i < K; i++) {
					for (int j = 0; j < K; j++) {

						sum += input_image[r + i][c + j] * kernel[i][j];
					}
				}

				output_image[r + dead_rows][c + dead_cols] = (sum / normal_factor);
			}
		}

		return output_image;
	}
}