public class WeightedSmoother {
    static short WX = 3;
    static short WY = 3;
    static short[][] K = { { 1, 2, 1 }, { 2, 4, 2 }, { 1, 2, 1 } };

    /**
     * Smooth an image based on a WX by WY window
     * 
     * @param input image
     * @param height of the image
     * @param width of the image
	 * @return smoothed image 
     */
    public static short[][] smooth(short[][] input, int height, int width) {
		short[][] smoothed = new short[height][width];
		for (int row = 0; row < height - WX + 1; row++) {
			for (int col = 0; col < width - WY + 1; col++) {
				
				int sumval = 0;
				for (int wrow = 0; wrow < WX; wrow++) {
					for (int wcol = 0; wcol < WY; wcol++) {
						
						sumval += input[row + wrow][col + wcol] * K[wrow][wcol];
					}
				}
				
				sumval = sumval / 16;
				smoothed[row][col] = (short) sumval;
			}
		}
		return smoothed;
    }
}
