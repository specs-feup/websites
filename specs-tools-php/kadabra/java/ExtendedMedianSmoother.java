package org.smooth;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.imageio.ImageIO;


/**
 * The extended version of median smoother contains two new methods:
 *   - counting sort
 *   - sorting network.
 * The sorting network is specialized to get the median of a 3x3 window. 
 */
public class MedianSmoother {

	/**
	 * Takes an image and a kernel size to smooth the image
	 */
	public static int[][] smooth(int[][] input, int kernelSize, int width, int height) {

		int limit = kernelSize / 2;
		int[][] outputArrays = new int[height][width];
		for (int i = limit; i < height - limit; ++i) {
			for (int j = limit; j < width - limit; ++j) {
				outputArrays[i][j] = medianNeighbor(input, kernelSize, width, height, i, j);
			}
		}
		return outputArrays;
	}

	/**
	 * Takes a 2D input image array, a kernel and a pixel location 
	 * to calculate the median of its neighbors.
	 */
	public static int medianNeighbor(int[][] input, int kernelSize, int width, int height, int y, int x) {
		List<Integer> values = new ArrayList<>();

		int corner = kernelSize / 2;

		for (int i = 0; i < kernelSize; ++i) {
			for (int j = 0; j < kernelSize; ++j) {

				int value = input[y - corner + i][x - corner + j];
				values.add(new Integer(value));
			}
		}

		int median;
		int valuesSize = values.size();
		if (valuesSize / 2 == (valuesSize + 1) / 2) {// if even number of
			// elements
			for (int i = 0; i < (valuesSize - 1) / 2; ++i) {
				removeMax(values);
			}
			median = getMax(values);// median is mean of two central values
			removeMax(values);
			median += getMax(values);
			median = median / 2;// mean of x,y is (x+y)/2
		} else {// if odd number of elements
			for (int i = 0; i < valuesSize / 2; ++i) {
				removeMax(values);
			}
			median = getMax(values);// median is central value
		}
		return median;
	}

	/**
	 * Calculates the the median using counting sort algorithm
	 */
	public static int countingSort(int[][] input, int kernelSize, int width, int height, int y, int x) {

		int[] values = getNeighbors(input, kernelSize, y, x);
		int[] sortingTable = new int[256];

		for (int i = 0; i < values.length; i++) {

			sortingTable[values[i]]++;
		}

		int sum = 0;
		int median = 0;
		if (values.length % 2 == 0) {

			int first = 0;
			int second = 0;
			int divS = values.length / 2;
			int divB = divS + 1;

			while (sum < divS) {

				sum += sortingTable[first];
				first++;
			}

			second = first;
			while (sum < divB) {

				sum += sortingTable[second];
				second++;
			}

			first--;
			second--;

			median = (first + second) / 2;
		} else {
			int div = values.length / 2 + 1;

			while (sum < div) {
				sum += sortingTable[median];
				median++;
			}
			median--;
		}

		return median;
	}

	/**
	 * A specialized sorting network for kernelSize == 3
	 * It contains all loops unrolled and the  array accesses are replaced 
	 * with scalar variables accesses.
	 */
	public static int sortingNetwork(int[][] input, int kernelSize, int width, int height, int y, int x) {

		int[] values = getNeighbors(input, kernelSize, y, x);

		int temp;
		int value_0 = values[0];
		int value_1 = values[1];
		int value_2 = values[2];
		int value_3 = values[3];
		int value_4 = values[4];
		int value_5 = values[5];
		int value_6 = values[6];
		int value_7 = values[7];
		int value_8 = values[8];
		if (value_0 > value_1) {
			temp = value_0;
			value_0 = value_1;
			value_1 = temp;
		}

		if (value_2 > value_3) {
			temp = value_2;
			value_2 = value_3;
			value_3 = temp;
		}

		if (value_4 > value_5) {
			temp = value_4;
			value_4 = value_5;
			value_5 = temp;
		}

		if (value_6 > value_7) {
			temp = value_6;
			value_6 = value_7;
			value_7 = temp;
		}

		if (value_1 > value_2) {
			temp = value_1;
			value_1 = value_2;
			value_2 = temp;
		}

		if (value_3 > value_4) {
			temp = value_3;
			value_3 = value_4;
			value_4 = temp;
		}

		if (value_5 > value_6) {
			temp = value_5;
			value_5 = value_6;
			value_6 = temp;
		}

		if (value_7 > value_8) {
			temp = value_7;
			value_7 = value_8;
			value_8 = temp;
		}

		if (value_0 > value_1) {
			temp = value_0;
			value_0 = value_1;
			value_1 = temp;
		}

		if (value_2 > value_3) {
			temp = value_2;
			value_2 = value_3;
			value_3 = temp;
		}

		if (value_4 > value_5) {
			temp = value_4;
			value_4 = value_5;
			value_5 = temp;
		}

		if (value_6 > value_7) {
			temp = value_6;
			value_6 = value_7;
			value_7 = temp;
		}

		if (value_1 > value_2) {
			temp = value_1;
			value_1 = value_2;
			value_2 = temp;
		}

		if (value_3 > value_4) {
			temp = value_3;
			value_3 = value_4;
			value_4 = temp;
		}

		if (value_5 > value_6) {
			temp = value_5;
			value_5 = value_6;
			value_6 = temp;
		}

		if (value_7 > value_8) {
			temp = value_7;
			value_7 = value_8;
			value_8 = temp;
		}

		if (value_0 > value_1) {
			temp = value_0;
			value_0 = value_1;
			value_1 = temp;
		}

		if (value_2 > value_3) {
			temp = value_2;
			value_2 = value_3;
			value_3 = temp;
		}

		if (value_4 > value_5) {
			temp = value_4;
			value_4 = value_5;
			value_5 = temp;
		}

		if (value_6 > value_7) {
			temp = value_6;
			value_6 = value_7;
			value_7 = temp;
		}

		if (value_1 > value_2) {
			temp = value_1;
			value_1 = value_2;
			value_2 = temp;
		}

		if (value_3 > value_4) {
			temp = value_3;
			value_3 = value_4;
			value_4 = temp;
		}

		if (value_5 > value_6) {
			temp = value_5;
			value_5 = value_6;
			value_6 = temp;
		}

		if (value_7 > value_8) {
			temp = value_7;
			value_7 = value_8;
			value_8 = temp;
		}

		if (value_2 > value_3) {
			temp = value_2;
			value_2 = value_3;
			value_3 = temp;
		}

		if (value_4 > value_5) {
			temp = value_4;
			value_4 = value_5;
			value_5 = temp;
		}

		if (value_6 > value_7) {
			temp = value_6;
			value_6 = value_7;
			value_7 = temp;
		}

		if (value_3 > value_4) {
			temp = value_3;
			value_3 = value_4;
			value_4 = temp;
		}

		if (value_5 > value_6) {
			temp = value_5;
			value_5 = value_6;
			value_6 = temp;
		}

		if (value_4 > value_5) {
			temp = value_4;
			value_4 = value_5;
			value_5 = temp;
		}

		return value_4;
	}
	
	
	/**
	 * A simple main that takes two arguments, image and window size, 
	 * smooths the input image and does nothing with the smoothed output
	 */
	public static void main(String[] args) {

		if (args.length != 2) {
			System.out.println("Usage: <input_image> <kernelSize>");
			System.exit(1);
		}

		File imageFile = new File(args[0]);
		int kernelSize = Integer.parseInt(args[1]);

		try {
			BufferedImage bi = ImageIO.read(imageFile);
			int[][] inputImageArray = buf2Array(bi);
			int height = inputImageArray.length;
			int width = inputImageArray[0].length;

			/* Convert image to gray scale */
			int[][] grayImage = toGrayScale(inputImageArray, height, width);

			int[][] smoothed = smooth(grayImage, kernelSize, width, height);

			//Process smoothed image here

		} catch (IOException e) {
			e.printStackTrace();
		}

	}


	/******************* Utilitary code ************************/
	/**
	 * Gets the maximum value from a list.
	 */
	private static int getMax(List<Integer> values) {

		Iterator<Integer> it = values.iterator();
		int max = 0;
		while (it.hasNext()) {
			int current = it.next();
			if (current > max) {
				max = current;
			}
		}
		return max;
	}

	/**
	 * Removes a single occurrence of the maximum value from a list.
	 */
	private static List<Integer> removeMax(List<Integer> values) {

		int max = getMax(values);
		Iterator<Integer> it = values.iterator();
		while (it.hasNext()) {
			if (it.next() == max) {
				it.remove();
				return values;
			}
		}
		return values;// never reaches this point as values contains a max
	}

	/**
	 * Convert a BufferedImage to array of integers
	 */
	public static int[][] buf2Array(BufferedImage bi) {
		int[][] out = new int[bi.getHeight()][bi.getWidth()];
		for (int y = 0; y < bi.getHeight(); y++) {
			for (int x = 0; x < bi.getWidth(); x++) {
				out[y][x] = bi.getRGB(x, y);
			}
		}
		return out;
	}

	/**
 	 * Convert Image to grayscale
	 */
	public static int[][] toGrayScale(int[][] image, int height, int width) {

		int[][] out = new int[height][width];
		for (int i = 0; i < image.length; i++) {
			for (int j = 0; j < image[i].length; j++) {
				int pixel = image[i][j];
				int r = 0xff & (pixel >> 16);
				int g = 0xff & (pixel >> 8);
				int b = 0xff & pixel;
				int sum = r + g + b;
				int grayScale = sum / 3;
				out[i][j] = grayScale;
			}
		}
		return out;
	}

	/**
	 * Get kernelSize x kernelSize pixels surrounding the target position
	 */
	private static int[] getNeighbors(int[][] input, int kernelSize, int y, int x) {
		int[] values = new int[kernelSize * kernelSize];

		int corner = kernelSize / 2;
		int pos = 0;
		for (int i = 0; i < kernelSize; ++i) {
			for (int j = 0; j < kernelSize; ++j) {

				int value = input[y - corner + i][x - corner + j];
				values[pos++] = value;
			}
		}
		return values;
	}
}
