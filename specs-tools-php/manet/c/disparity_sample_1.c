#include "disparity.h"
#include "sdvbs_common.h"
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

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
