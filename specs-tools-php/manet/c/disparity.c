#include "disparity.h"
#include "sdvbs_common.h"
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int main(int argc, char* argv[])
{
    int rows = 32;
    int cols = 32;
    I2D *imleft, *imright, *retDisparity;

    
    int i, j;
    char im1[100], im2[100], timFile[100];
    int WIN_SZ=8, SHIFT=64;
    FILE* fp;
    
    if(argc < 2)
    {
        printf("We need input image path and output path\n");
        return -1;
    }

    sprintf(im1, "%s/1.bmp", argv[1]);
    sprintf(im2, "%s/2.bmp", argv[1]);
    
    imleft = readImage(im1);
    imright = readImage(im2);

    rows = imleft->height;
    cols = imleft->width;

#ifdef test
    WIN_SZ = 2;
    SHIFT = 1;
#endif
#ifdef sim_fast
    WIN_SZ = 4;
    SHIFT = 4;
#endif
#ifdef sim
    WIN_SZ = 4;
    SHIFT = 8;
#endif


    retDisparity = getDisparity(imleft, imright, WIN_SZ, SHIFT);


    printf("Input size\t\t- (%dx%d)\n", rows, cols);
#ifdef CHECK   
    /** Self checking - use expected.txt from data directory  **/
    {
        int tol, ret=0;
        tol = 2;
#ifdef GENERATE_OUTPUT
        writeMatrix(retDisparity, argv[1]);
#endif
        ret = selfCheck(retDisparity, argv[1], tol);
        if (ret == -1)
            printf("Error in Disparity Map\n");
    }
    /** Self checking done **/
#endif


    
    iFreeHandle(imleft);
    iFreeHandle(imright);
    iFreeHandle(retDisparity);

    return 0;
}

I2D* readImage(const char* pathName)
{
    // Reading BMP image
    char signature[2];   
    int file_size;
    short int reserved1;
    short int reserved2;
    int loc_of_bitmap;

    int size_of_infoheader;
    int width;
    int height;
    short int number_of_planes;
    short int bits_per_pixel;

    int compression_method;
    int bytes_of_bitmap;
    int hori_reso;
    int vert_reso;
    int no_of_colors;
    int no_of_imp_colors;

    int nI,nJ;
    int pixSize;

    unsigned char tempb,tempg,tempr,tempjunk[12];
    int ta;
    I2D* srcImage;

    FILE *input;
    input = fopen(pathName,"rb");
    if(input == NULL)
    {
        perror("File pointer error");
        return NULL;
    }
    else
    {
        //start of header information
        fread(&signature,sizeof(signature),1,input);
        fread(&file_size,sizeof(file_size),1,input);
        fread(&reserved1,sizeof(reserved1),1,input);
        fread(&reserved2,sizeof(reserved2),1,input);
        fread(&loc_of_bitmap,sizeof(loc_of_bitmap),1,input);

        fread(&size_of_infoheader,sizeof(size_of_infoheader),1,input);
        fread(&width,sizeof(width),1,input); // Reads the width of the image
        fread(&height,sizeof(height),1,input); // Reads the height of the image
        fread(&number_of_planes,sizeof(number_of_planes),1,input);
        fread(&bits_per_pixel,sizeof(bits_per_pixel),1,input);
        fread(&compression_method,sizeof(compression_method),1,input);
        fread(&bytes_of_bitmap,sizeof(bytes_of_bitmap),1,input);

        fread(&hori_reso,sizeof(hori_reso),1,input);
        fread(&vert_reso,sizeof(vert_reso),1,input);
        fread(&no_of_colors,sizeof(no_of_colors),1,input);
        fread(&no_of_imp_colors,sizeof(no_of_imp_colors),1,input);
        //end of header information

        srcImage = iMallocHandle(height, width);
        
        // Conditions to check whether the BMP is interleaved and handling few exceptions
        if(srcImage->height <= 0 || srcImage->width <= 0 || signature[0] != 'B' || signature[1] != 'M'  || ( bits_per_pixel !=24 && bits_per_pixel !=8 ) )
        {
            printf("ERROR in BMP read: The input file is not in standard BMP format");
            return NULL;
        }
        fseek(input,loc_of_bitmap,SEEK_SET);

        if (bits_per_pixel == 8)
        {
            for(nI = (height - 1); nI >= 0 ; nI--)
            {
                for(nJ = 0;nJ < width; nJ++)
                {
                    fread(&tempg,sizeof(unsigned char),1,input);
                    subsref(srcImage,nI,nJ) = (int)tempg;
                }
            }
        }
        else if (bits_per_pixel == 24)
        {
            for(nI = (height - 1); nI >= 0 ; nI--)
            {
                for(nJ = 0;nJ < width; nJ++)
                {
                    fread(&tempb,sizeof(unsigned char),1,input);
                    fread(&tempg,sizeof(unsigned char),1,input);
                    fread(&tempr,sizeof(unsigned char),1,input);
                    ta = (3*tempr + 6*tempg + tempb)/10;
                    ta = tempg;
                    subsref(srcImage,nI,nJ) = (int)ta;
                }
            }
        }
        else
        {
            return NULL;
        }

        fclose(input);
        return srcImage;
    }
}

void padarray4(I2D* inMat, I2D* borderMat, int dir, I2D* paddedArray)
{
    int rows, cols, bRows, bCols, newRows, newCols;
    int i, j;
    int adir;
   
    adir = abs(dir); 
    rows = inMat->height;
    cols = inMat->width;
    
    bRows = borderMat->data[0];
    bCols = borderMat->data[1];
    
    newRows = rows + bRows;
    newCols = cols + bCols;
    
    if(dir ==1)
    {
        for(i=0; i<rows; i++)
            for(j=0; j<cols; j++)
                subsref(paddedArray, i, j) = subsref(inMat,i,j);
    }
    else
    {
        for(i=0; i<rows-bRows; i++)
            for(j=0; j<cols-bCols; j++)
                subsref(paddedArray, (bRows+i), (bCols+j)) = subsref(inMat,i,j);
    }
    
    return;
}

I2D* padarray2(I2D* inMat, I2D* borderMat)
{
    int rows, cols, bRows, bCols, newRows, newCols;
    I2D *paddedArray;
    int i, j;

    rows = inMat->height;
    cols = inMat->width;
    
    bRows = borderMat->data[0];
    bCols = borderMat->data[1];
    
    newRows = rows + bRows*2;
    newCols = cols + bCols*2;
    
    paddedArray = iSetArray(newRows, newCols, 0);
    
    for(i=0; i<rows; i++)
        for(j=0; j<cols; j++)
            subsref(paddedArray, (bRows+i), (bCols+j)) = subsref(inMat, i, j);
    
    return paddedArray;
    
}

I2D* iSetArray(int rows, int cols, int val)
{
    int i, j;
    I2D *out;
    out = iMallocHandle(rows, cols);
    
    for(i=0; i<rows; i++) {
        for(j=0; j<cols; j++) {
            subsref(out,i,j) = val;
		}
   	} 
    return out;
    
}

void integralImage2D2D(F2D* SAD, F2D* integralImg)
{
    int nr, nc, i, j;
    
    nr = SAD->height;
    nc = SAD->width;
    
    for(i=0; i<nc; i++)
        subsref(integralImg,0,i) = subsref(SAD,0,i);
    
    for(i=1; i<nr; i++)
        for(j=0; j<nc; j++)
        {
            subsref(integralImg,i,j) = subsref(integralImg, (i-1), j) + subsref(SAD,i,j);
        }

    for(i=0; i<nr; i++)
        for(j=1; j<nc; j++)
            subsref(integralImg,i,j) = subsref(integralImg, i, (j-1)) + subsref(integralImg,i,j);

    return;
    
}

I2D* iMallocHandle(int rows, int cols)
{
    int i, j;
    I2D* out;
   
    out = (I2D*)malloc(sizeof(I2D) + sizeof(int)*rows*cols);
    out->height = rows;
    out->width = cols;
    
    return out;
}

void iFreeHandle(I2D* out)
{
    if(out != NULL)
        free(out);

    return;
}

I2D* getDisparity(I2D* Ileft, I2D* Iright, int win_sz, int max_shift)
{
    I2D* retDisp;
    int nr, nc, k;
    I2D *halfWin;
    int half_win_sz, rows, cols;
    F2D *retSAD, *minSAD, *SAD, *integralImg;
    I2D* IrightPadded, *IleftPadded, *Iright_moved;
    
    nr = Ileft->height;
    nc = Ileft->width;
    half_win_sz=win_sz/2;
    
    
    minSAD = fSetArray(nr, nc, 255.0*255.0);
    retDisp = iSetArray(nr, nc,max_shift);
    halfWin = iSetArray(1,2,half_win_sz);

        if(win_sz > 1)
        {
            IleftPadded = padarray2(Ileft, halfWin);
            IrightPadded = padarray2(Iright, halfWin);
        }
        else
        {
            IleftPadded = Ileft;
            IrightPadded = Iright;
        }
    
    rows = IleftPadded->height;
    cols = IleftPadded->width;
    SAD = fSetArray(rows, cols,255);
    integralImg = fSetArray(rows, cols,0);
    retSAD = fMallocHandle(rows-win_sz, cols-win_sz);
    Iright_moved = iSetArray(rows, cols, 0);
    
    for( k=0; k<max_shift; k++)
    {    
        correlateSAD_2D(IleftPadded, IrightPadded, Iright_moved, win_sz, k, SAD, integralImg, retSAD);
        findDisparity(retSAD, minSAD, retDisp, k, nr, nc);
    }
    
    fFreeHandle(retSAD);
    fFreeHandle(minSAD);
    fFreeHandle(SAD);
    fFreeHandle(integralImg);
    iFreeHandle(halfWin);
    iFreeHandle(IrightPadded);
    iFreeHandle(IleftPadded);
    iFreeHandle(Iright_moved);
     
    return retDisp;
}

F2D* fSetArray(int rows, int cols, float val)
{
    int i, j;
    F2D *out;
    out = fMallocHandle(rows, cols);
    
    for(i=0; i<rows; i++) {
        for(j=0; j<cols; j++) {
            subsref(out,i,j) = val;
		}
   	} 
    return out;
    
}

F2D* fMallocHandle(int rows, int cols)
{
    int i, j;
    F2D* out;
   
    out = (F2D*)malloc(sizeof(F2D) + sizeof(float)*rows*cols);
    out->height = rows;
    out->width = cols;
    
    return out;
}

void findDisparity(F2D* retSAD, F2D* minSAD, I2D* retDisp, int level, int nr, int nc)
{
    int i, j, a, b;
    
    for(i=0; i<nr; i++)
    {
        for(j=0; j<nc; j++)
        {
            a = subsref(retSAD,i,j);
            b = subsref(minSAD,i,j);
            if(a<b)
            {
                subsref(minSAD,i,j) = a;
                subsref(retDisp,i,j) = level;
            }
        }
    }
    return;
}

void finalSAD(F2D* integralImg, int win_sz, F2D* retSAD)
{
    int endR, endC;
    int i, j, k;
    
    endR = integralImg->height;
    endC = integralImg->width;
    
    k = 0;
    for(j=0; j<(endC-win_sz); j++)
    {
        for(i=0; i<(endR-win_sz); i++)
        {
            subsref(retSAD,i,j) = subsref(integralImg,(win_sz+i),(j+win_sz)) + subsref(integralImg,(i+1) ,(j+1)) - subsref(integralImg,(i+1),(j+win_sz)) - subsref(integralImg,(win_sz+i),(j+1));
        }
    }

    return;
}

void fFreeHandle(F2D* out)
{
    if(out != NULL)
        free(out);

    return;
}

void correlateSAD_2D(I2D* Ileft, I2D* Iright, I2D* Iright_moved, int win_sz, int disparity, F2D* SAD, F2D* integralImg, F2D* retSAD)
{
    int rows, cols;
    int i, j, endRM;
    I2D *range;
    
    range = iMallocHandle(1,2);
    subsref(range,0,0) = 0;
    subsref(range,0,1) = disparity;

    rows = Iright_moved->height;
    cols = Iright_moved->width;

    for(i=0; i<rows*cols; i++)
        asubsref(Iright_moved,i) = 0;
    
    padarray4(Iright, range, -1, Iright_moved);
   
    computeSAD(Ileft, Iright_moved, SAD);
    integralImage2D2D(SAD, integralImg);
    finalSAD(integralImg, win_sz, retSAD);

    iFreeHandle(range);    
    return;
}

void computeSAD(I2D *Ileft, I2D* Iright_moved, F2D* SAD)
{
    int rows, cols, i, j, diff;
    
    rows = Ileft->height;
    cols = Ileft->width;

    for(i=0; i<rows; i++)
    {
        for(j=0; j<cols; j++)
        {
            diff = subsref(Ileft,i,j) - subsref(Iright_moved,i,j);
            subsref(SAD,i,j) = diff * diff;
        }
    }

    return;
}
