public class MatrixMultiplier {
	
	
	/**
     * Matrix multiplication
     * 
     * @param a
     *            input matrix A
     * @param b
     *            input matrix B
     * @return a matrix of the operation: a*b
     */
    public static int[][] mult(int[][] a, int[][] b) {
		
		int rowsInA = a.length;
		int columnsInA = a[0].length; // same as rows in b
		int columnsInB = b[0].length;
		int[][] c = new int[rowsInA][columnsInB];

		for (int i = 0; i < rowsInA; i++) {
			for (int j = 0; j < columnsInB; j++) {

				c[i][j] = 0;
				for (int k = 0; k < columnsInA; k++) {
				
					c[i][j] += a[i][k] * b[k][j];
				}
				
			}
		}
		
		return c;
    }
}